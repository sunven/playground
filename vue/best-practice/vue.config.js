const path = require('path')
const bodyParser = require('body-parser')
const port = 7070

console.log(process.env.foo)

const resolve = dir => path.join(__dirname, dir)

module.exports = {
  // 公共路径，前缀
  publicPath: '/best-practice',
  devServer: {
    // 指定端口
    port,
    // 代理
    // proxy: {
    //   // 代理 /dev-api/user/login 到 http://127.0.0.1:3000/user/login
    //   [process.env.VUE_APP_BASE_API]: {
    //     target: `http://127.0.0.1:3000/`,
    //     changeOrigin: true,
    //     pathRewrite: {
    //       ['^' + process.env.VUE_APP_BASE_API]: '',
    //     },
    //   },
    // },
    // 模拟
    before: app => {
      app.use(bodyParser.json())
      app.post('/dev-api/user/login', (req, res) => {
        const { username } = req.body
        if (username === 'admin' || username === 'jerry') {
          res.json({
            code: 1,
            data: username,
          })
        } else {
          res.json({
            code: 10204,
            message: '用户名或密码错误',
          })
        }
      })
      app.get('/dev-api/user/info', (req, res) => {
        const auth = req.headers['authorization']
        const roles = auth.split(' ')[1] === 'admin' ? ['admin'] : ['editor']
        res.json({
          code: 1,
          data: roles,
        })
      })
    },
  },
  // configureWebpack: {
  //   // 插值：<%= webpackConfig.name %>
  //   name: 'best-practice!!!',
  //   resolve: {
  //     // 别名
  //     alias: {
  //       '@comps': path.join(__dirname, 'src/components'),
  //     },
  //   },
  // },
  configureWebpack: config => {
    config.resolve.alias['@comps'] = path.join(__dirname, 'src/components')
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
