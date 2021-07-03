const net = require('net')
const chatServer = net.createServer()
const clientList = []
chatServer.on('connection', client => {
  client.write('hi \n')
  clientList.push(client)
  client.on('data', data => {
    console.log(`recv${data.toString()}`)
    clientList.forEach(c => {
      c.write(data)
    })
  })
})

chatServer.listen(9000)

document.cookie.split(' ').forEach(c => {
  const kv = c.substr(0, c.length - 1)
  const key = kv.substr(0, kv.indexOf('='))
  const value = kv.substring(kv.indexOf('=') + 1)
  document.cookie = key + '=' + value
})
