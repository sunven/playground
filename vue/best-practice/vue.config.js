const path = require('path')
const port = 7070

console.log(process.env.foo)

const resolve = dir => path.join(__dirname, dir)

module.exports = {
  // 公共路径，前缀
  publicPath: '/best-practice',
  devServer: {
    // 指定端口
    port,
  },
  // configureWebpack: {
  //   // 插值：<%= webpackConfig.name %>
  //   name: 'best-practice!!!',
  //   resolve: {
  //     // 别名
  //     alias: {
  //       comps: path.join(__dirname, 'src/components'),
  //     },
  //   },
  // },
  configureWebpack: config => {
    config.resolve.alias.comps = path.join(__dirname, 'src/components')
    if (process.env.NODE_ENV === 'development') {
      config.name = '1'
    } else {
      config.name = '2'
    }
  },
  //   vue inspect
  //   vue inspect --rules
  //   vue inspect --rule svg
  chainWebpack(config) {
    // 让svg规则排除icons目录
    config.module.rule('svg').exclude.add(resolve('src/assets/icons'))

    // 新增icons规则
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('./src/assets/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]',
      })
  },
}
