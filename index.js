const express = require('express')
const mongoDB = require('./config/MongoDB')
const Routers = require('./router/index')
const cors = require('cors')
const cookie = require('cookie-parser')
const {SocketServer} = require('./SocketServer')

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended:true }))
app.use(cors())
app.use(cookie())

// Socket
const http = require('http').createServer(app)
const io = require('socket.io')(http)

io.on('connection', socket => {
    SocketServer(socket)
})

// Connect database
mongoDB.connect()

// Routers
Routers(app)

const PORT = process.env.PORT || 5000

http.listen(PORT,()=>{
    console.log("Server started at " + PORT)
})