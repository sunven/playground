const express = require('express')

const app = new express()
app.get('/api/info', (req, res) => {
  res.json({
    name: '123',
  })
})
app.listen('9002')
