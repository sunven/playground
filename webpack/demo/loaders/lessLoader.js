const less = require('less')
module.exports = function (content) {
  less.render(content, (e, output) => {
    this.callback(e, output.css)
  })
}
