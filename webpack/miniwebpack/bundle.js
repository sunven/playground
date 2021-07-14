const MiniWebpack = require('./lib/miniwebpack')
const config = require('./webpack.config')
new MiniWebpack(config).run()
