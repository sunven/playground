const parser = require('@babel/parser')
const traverse = require('@babel/traverse').default
const { transformFromAst } = require('@babel/core')
const path = require('path')
const fs = require('fs')
class MiniWebpack {
  constructor(options) {
    this.entry = options.entry
    this.output = options.output
    this.modules = []
  }
  run() {
    const info = this.parse(this.entry)
    this.modules.push(info)
    for (let i = 0; i < this.modules.length; i++) {
      const { dependencies } = this.modules[i]
      if (dependencies) {
        for (let j in dependencies) {
          this.modules.push(this.parse(dependencies[j]))
        }
      }
    }
    const obj = {}
    this.modules.forEach(item => {
      obj[item.entryFile] = { dependencies: item.dependencies, code: item.code }
    })
    this.file(obj)
  }
  file(code) {
    const filepath = path.join(this.output.path, this.output.filename)
    const newcode = JSON.stringify(code)
    const bundle = `;(function(graph){
        function require(module){
            function otherRequire(relativePath){
                return require(graph[module].dependencies[relativePath])
            }
            var exports = {}
            ;(function(require,exports,code){
                eval(code)
            })(otherRequire,exports,graph[module].code)
            return exports
        }
        require('${this.entry}')
    })(${newcode})`
    fs.writeFileSync(filepath, bundle)
  }
  parse(entryFile) {
    const content = fs.readFileSync(entryFile).toString()
    const ast = parser.parse(content, {
      sourceType: 'module',
    })

    const dependencies = {}
    traverse(ast, {
      ImportDeclaration: ({ node }) => {
        dependencies[node.source.value] =
          './' + path.join(path.dirname(entryFile), node.source.value) + '.js'
      },
    })

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
