const path = require('path');
const http=require('http');
const express = require('express');
const socketio = require('socket.io');
const formatMessage=require('./utils/messages');
const {createUser, getUser ,printUsers} =require('./utils/user'); 
const app = express()
const server = http.createServer(app);
const port = 3000
const BOT="ChatBot";

io=socketio(server);

app.use(express.static(path.join(__dirname,'public')));

io.on('connection',(socket)=>{
    console.log(":~ New connection made ");
    socket.on('joinRoom',({username,room})=>{
            const user=createUser(socket.id,username,room);
            socket.join(user.room);
            // WELCOME msg
            socket.emit('message',formatMessage(BOT,"Welcome to ChatRoom"));
            // Notify new user joined
            socket.broadcast.to(user.room).emit('message',formatMessage(BOT,`${user.username} joined the chat`));
        });

            // new message in room handle
            socket.on("newMessage",(data)=>{
                // printUsers();
                const user=getUser(socket.id);
                // console.log(user);
                io.to(user.room).emit("message",formatMessage(data.username,data.text));
        });
        // disconnection
        socket.on("disconnect",()=>{
            const user=getUser(socket.id);
            // console.log(user);
            socket.to(user.room).emit('message',formatMessage(BOT,`${user.username} has left the chat`)); 
        });
});

server.listen(port, () => console.log(`Example app listening on port ${port}!`))