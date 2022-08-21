const { application } = require('express')
const express = require('express'); 
const app = express() ;
const http = require('http') ; 
const server = http.createServer(app)  ;
const { Server } = require("socket.io");
const io = new Server(server);

const users = {} ; 


app.use(express.static('public'))


io.on('connection' , (socket)=>{
    console.log("connected") ; 
    socket.on('new-user-joined' , name =>{
        users[socket.id] = name ; 
        socket.broadcast.emit('user-joined' , name);
     })

     socket.on('send' , message =>{
        socket.broadcast.emit('receive' , {message: message , name : users[socket.id]}) ; 
     })

     socket.on('disconnect' , () =>{
        socket.broadcast.emit('left' , users[socket.id]) ; 
        delete users[socket.id] ; 
     })
})

server.listen(process.env.PORT || 3000 , ()=>{
    console.log("The server is running on port 3000") ;
})


