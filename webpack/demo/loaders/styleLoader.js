module.exports = function (content) {
  const script = `
  const style = document.createElement('style')
  style.innerHTML = ${content}
  document.head.append(style)`
  return script
}
