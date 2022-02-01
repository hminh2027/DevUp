const express = require('express')
const mongoDB = require('./config/MongoDB')
const Routers = require('./router/index')
const cors = require('cors')
const cookie = require('cookie-parser')
const {SocketServer} = require('./SocketServer')
const  { Server } = require('socket.io')

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended:true }))
app.use(cors())
app.use(cookie())

// Socket
const http = require('http').createServer(app)

const io = new Server(http, {
    cors: {
      origin: true,
      credentials: true
    }
})

io.on('connection', socket => {
    SocketServer(socket)
})

// Connect database
mongoDB.connect()

// Routers
Routers(app)

// Port
if(process.env.NODE_ENV === 'production'){
    app.use(express.static('client/build'))
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'))
    })
}

const PORT = process.env.PORT || 5000

http.listen(PORT,()=>{
    console.log("Server started at " + PORT)
})