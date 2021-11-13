//babel使用的JavaScript解析器，得到ast
const parser = require('@babel/parser')
//遍历ast，解析出依赖
const traverse = require('@babel/traverse').default
const { transformFromAst } = require('@babel/core')
const path = require('path')
const fs = require('fs')
class MiniWebpack {
  constructor(options) {
    //入口
    this.entry = options.entry
    //出口
    this.output = options.output
    //模块
    this.modules = []
  }
  run() {
    //解析
    const info = this.parse(this.entry)
    this.modules.push(info)
    for (let i = 0; i < this.modules.length; i++) {
      const { dependencies } = this.modules[i]
      if (dependencies) {
        //遍历依赖，解析依赖
        for (let j in dependencies) {
          this.modules.push(this.parse(dependencies[j]))
        }
      }
    }
    //modules中就保存了所有的模块，并且知道每个模块依赖那些模块
    const obj = {}
    this.modules.forEach(item => {
      obj[item.entryFile] = { dependencies: item.dependencies, code: item.code }
    })
    // 生成出口文件
    this.file(obj)
  }
  file(code) {
    const filepath = path.join(this.output.path, this.output.filename)
    //转为字符串
    const newcode = JSON.stringify(code)
    const bundle = `;(function(graph){
        //自定义require
        function require(module){
            function otherRequire(relativePath){
                return require(graph[module].dependencies[relativePath])
            }
            var exports = {}
            ;(function(require,exports,code){
                //动态执行代码
                eval(code)
            })(otherRequire,exports,graph[module].code)
            return exports
        }
        //先获取入口文件
        require('${this.entry}')
    })(${newcode})`
    //写到指定的出口文件
    fs.writeFileSync(filepath, bundle)
  }
  //解析入口文件
  parse(entryFile) {
    //读取文件
    const content = fs.readFileSync(entryFile).toString()
    //转化为ast
    const ast = parser.parse(content, {
      sourceType: 'module',
    })

    const dependencies = {}
    //遍历ast,解析出依赖那些模块
    traverse(ast, {
      ImportDeclaration: ({ node }) => {
        // 将依赖收集到dependencies
        dependencies[node.source.value] =
          './' + path.join(path.dirname(entryFile), node.source.value) + '.js'
      },
    })
    // 从ast转换出代码,
    // 允许您使用最新的 JavaScript，而无需对目标环境需要哪些语法转换（以及可选的浏览器 polyfill）进行微观管理
    const { code } = transformFromAst(ast, null, {
      presets: ['@babel/preset-env'],
    })
    return {
      entryFile,
      dependencies,
      code,
    }
  }
}

module.exports = MiniWebpack
