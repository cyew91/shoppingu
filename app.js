'use strict';

/**
 * Module dependencies.
 */
var express     = require('express');
var fs          = require('fs');

/**
 * Main application entry file.
 * Please note that the order of loading is important.
 */

// Load Configurations
var config          = require('./config/config');
var winston         = require('./config/winston');

winston.info('Starting '+config.app.name+'...');
winston.info('Config loaded: '+config.NODE_ENV);
winston.debug('Accepted Config:',config);

var db              = require('./config/sequelize');
var passport        = require('./config/passport');

var app = express();

//Initialize Express
require('./config/express')(app, passport);

//Start the app by listening on <port>
//app.listen(config.PORT);
winston.info('Express app started on port ' + config.PORT);

//expose app
module.exports = app;

// var express = require('express');
//var app = require('express')();
var pingTimeout = {pingTimeout: 60000};
var http = require('http').createServer(app);
var io = require('socket.io')(http, pingTimeout);

// app.use(express.static(__dirname + '/public/views'));

var user_controller = require('./app/controllers/ChatControllers');
user_controller.get_io(io);

app.get('/', function (req, res) {
    res.sendfile('index.html');
});

var connectedSocket={};
var allUsers=[];
io.on('connection',function(socket){
    // socket.emit('news', { hello: 'world' });
    // socket.on('my other event', function (data) {
    //     console.log(data);
    // });

    // socket.on('addUser', function (data) {
    //    console.log(data); 
    // });
    socket.on('addUser',function(data){ //有新用户进入聊天室
        console.log(`Socket ${socket.id} connected.`);
        if(connectedSocket[data.username]){//昵称已被占用
            socket.emit('userAddingResult',{result:false});
        }else{
            socket.emit('userAddingResult',{result:true});
            socket.username=data.username;
            connectedSocket[socket.username]=socket;//保存每个socket实例,发私信需要用
            allUsers.push(data);
            //将所有在线用户发给新用户
            //console.log(connectedSocket[socket.username].connected);
            //socket.emit('messages', 'Hello from server');
        }
        socket.emit('allUser',allUsers);
    });

    socket.on('getUserFriendList', function (data) {
        console.log('Get user friend list');
        user_controller.getUserFriendList(data, socket);
    });

    socket.on('inbox_id',function(data){
        user_controller.inbox_id(data,socket);
    });

    socket.on('get_messages', function(data){
        user_controller.get_messages(data.inbox_id,socket);
    });

    // Send messages
    socket.on('message',function(data){
        user_controller.message(data,socket)  
    });  

    socket.on('addMessage', function (data) {
        if (!(data.to in connectedSocket)){
            console.log("Insert into DB");
        }
        else{
            connectedSocket[data.to].emit('messageAdded', data);
        }
        
    });

    // socket.on('addMessage',function(data){ //有用户发送新消息
        // if(data.to){//发给特定用户
            // if (typeof connectedSocket[data.to] !== 'undefined' && connectedSocket[data.to] !== null){
            //     connectedSocket[data.to].emit('messageAdded',data);
            // }
            // else{
                //socket.username="yks";
                // connectedSocket[data.to].emit('messageAdded',data);
                //socket.emit('messageAdded', data);
                // connectedSocket[socket.username].emit('messageAdded',data);
            // }
            //INSERT MESSAGE INTO DATABASE
    //     }else{//群发
    //         socket.broadcast.emit('messageAdded',data);//广播消息,除原发送者外都可看到
    //     }
    // });

    socket.on('disconnect', function (data) {  //有用户退出聊天室
            // socket.broadcast.emit('userRemoved', {  //广播有用户退出
            //     nickname: socket.nickname
            // });
            // for(var i=0;i<allUsers.length;i++){
            //     if(allUsers[i].nickname==socket.nickname){
            //         allUsers.splice(i,1);
            //     }
            // }
            // delete connectedSocket[socket.username]; //删除对应的socket实例
            console.log('Socket ${socket.id} disconnected.');
        }
    );
});

http.listen(config.PORT, function () {
    console.log('listening on *:3000');
});
