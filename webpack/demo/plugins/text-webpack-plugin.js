class TextWebpackPlugin {
  constructor(options) {
    console.log(options)
  }
  apply(compiler) {
    compiler.hooks.emit.tapAsync(
      'TextWebpackPlugin',
      (compilation, callback) => {
        //console.log(compilation.assets)
        compilation.assets['twp.txt'] = {
          source: () => {
            return '....txt....'
          },
          size: function () {
            return 1024
          },
        }
        callback()
      }
    )

    // compiler.hooks.compile.tap('TextWebpackPlugin', compliation => {
    //   console.log(compliation.assets)
    // })
  }
}
module.exports = TextWebpackPlugin
