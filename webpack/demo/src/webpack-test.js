const webpack = require('webpack')
const config = require('../webpack.config')
const compiler = webpack(config)

Object.keys(compiler.hooks).forEach(hookName => {
  compiler.hooks[hookName].tap('p1', () => {
    console.log(`run -> ${hookName}`)
  })
})

compiler.run()
