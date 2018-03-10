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
var http = require('http').createServer(app);
var io = require('socket.io')(http);

app.use(express.static(__dirname + '/public'));


app.get('/', function (req, res) {
    res.sendfile('chat.html');
});

var connectedSockets={};
io.on('connection',function(socket){

    socket.on('addUser',function(data){ //有新用户进入聊天室
        if(connectedSockets[data.email]){//昵称已被占用
          socket.emit('userAddingResult',{result:false});
        }else{
            //socket.emit('userAddingResult',{result:true});
            socket.nickname=data.email;
            connectedSockets[socket.nickname]=socket;//保存每个socket实例,发私信需要用
        }

    });

    socket.on('addMessage',function(data){ //有用户发送新消息
        if(data.to){//发给特定用户
            if (typeof connectedSockets[data.to] !== 'undefined' && connectedSockets[data.to] !== null){
                connectedSockets[data.to].emit('messageAdded',data);
            }
            else{
                socket.nickname="111@111";
                connectedSockets[socket.nickname].emit('messageAdded',data);
            }
            //INSERT MESSAGE INTO DATABASE
        }else{//群发
            socket.broadcast.emit('messageAdded',data);//广播消息,除原发送者外都可看到
        }
         });

    // socket.on('disconnect', function () {  //有用户退出聊天室
    //         socket.broadcast.emit('userRemoved', {  //广播有用户退出
    //             nickname: socket.nickname
    //         });
    //         for(var i=0;i<allUsers.length;i++){
    //             if(allUsers[i].nickname==socket.nickname){
    //                 allUsers.splice(i,1);
    //             }
    //         }
    //         delete connectedSockets[socket.nickname]; //删除对应的socket实例

    //     }
    // );
});

http.listen(config.PORT, function () {
    console.log('listening on *:3000');
});
