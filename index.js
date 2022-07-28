const express = require('express')
const app = express()
const cors = require('cors')
const PORT = 3050

const { createServer } = require('http') //equivalent to--> const http=require('http); const httpServer=http.createServer
const { Server } = require('socket.io')// Server is a constructor fn/class

app.use(cors())
const httpServer = createServer(app) //createServer-->Returns a new instance of Server.

const io = new Server(httpServer, {
    cors: {
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST']
    }
})

//io.on listens to the activity from front-end.Starts running whenever the user opens the website
io.on('connection', (socket) => {
    console.log(`User connected,${socket.id}`)//whenever user connects an id is generated

    //listen to the event
    socket.on('send_message', (data) => { //received data is available inside this cb
        console.log('received data', data)

        //broadcast sends the data to all the connected users except you
        socket.broadcast.emit('receive_message', data)
    })
})

//Using app.listen(3000) will not work here, as it creates a new HTTP server.
httpServer.listen(PORT, () => {
    console.log('listening on port', PORT)
})


// const express = require("express");
// const { createServer } = require("http");
// const { Server } = require("socket.io");

// const app = express();
// const httpServer = createServer(app);
// const io = new Server(httpServer, { /* options */ });

// io.on("connection", (socket) => {
//   // ...
// });

// httpServer.listen(3000);