module.exports = function (source) {
  const result = source.replace('abcd', this.query.name)
  const callback = this.async()
  setTimeout(() => {
    callback(null, result)
    //this.callback(null, result)
  }, 2000)
}
