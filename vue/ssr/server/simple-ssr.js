const express = require('express')
const app = express()

const Vue = require('Vue')
const { createRenderer } = require('vue-server-renderer')
const renderer = createRenderer()

app.get('/', async (req, res) => {
  const vm = new Vue({
    data() {
      return { name: 'sun' }
    },
    template: '<div>{{name}}</div>',
  })
  const html = await renderer.renderToString(vm)
  res.send(html)
})

app.listen(3000, () => {
  console.log('listen at 3000')
})
