const express = require('express')
const app = express()
const path = require('path')
const server = require('http').createServer(app)
const io = require('socket.io')(server)
const watch = require('node-watch')

app.use(express.static('build'))

app.get('/node_modules/socket.io-client/dist/socket.io.js', (req, res) => {
  const way = path.resolve(__dirname, './node_modules/socket.io-client/dist/socket.io.js')
  res.sendFile(way)
})


io.on('connection', () => {
  console.log("Socket connection is ON!")
})

watch('./build', { recursive: true }, (evt, name) => {
  console.log(`${name} changed.`)
  io.emit('fileChanged', `${name} changed`)
})

server.listen(process.env.PORT, () => console.log(`running on ${process.env.PORT}`))
