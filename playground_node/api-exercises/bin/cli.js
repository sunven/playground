#!/usr/bin/env node

//# 将npm 模块链接到对应的运行项目中去 npm link
//# 删除的情况
//ls /usr/local/bin/
//rm /usr/local/bin/kkb

//
// where cli
// rm -rf [package-name]
const program = require('commander')
program.version(require('../package').version)
program
  .command('init <name>')
  .description('init project')
  .action(require('../lib/init'))

program.parse(process.argv)
