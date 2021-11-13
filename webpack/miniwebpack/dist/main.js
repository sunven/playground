;(function (graph) {
  //自定义require
  function require(module) {
    function otherRequire(relativePath) {
      return require(graph[module].dependencies[relativePath])
    }
    var exports = {}
    ;(function (require, exports, code) {
      //动态执行代码
      eval(code)
    })(otherRequire, exports, graph[module].code)
    return exports
  }
  //先获取入口文件
  require('./src/index.js')
})({
  './src/index.js': {
    dependencies: { './a': './src/a.js', './b': './src/b.js' },
    code: '"use strict";\n\nvar _a = require("./a");\n\nvar _b = require("./b");\n\nconsole.log(\'index.js\', _a.str, _b.str);',
  },
  './src/a.js': {
    dependencies: {},
    code: '"use strict";\n\nObject.defineProperty(exports, "__esModule", {\n  value: true\n});\nexports.str = void 0;\nvar str = \'a.js\';\nexports.str = str;',
  },
  './src/b.js': {
    dependencies: {},
    code: '"use strict";\n\nObject.defineProperty(exports, "__esModule", {\n  value: true\n});\nexports.str = void 0;\nvar str = \'b.js\';\nexports.str = str;',
  },
})
