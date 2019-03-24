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

io.on('connection',function(socket){
    // Return User Friend list
    socket.on('getUserFriendList', function (data) {
        //console.log('Get user friend list');
        user_controller.getUserFriendList(data, socket);
    });

    // Get inbox_id
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

    // Read notification
    socket.on('read_notification', function(data){
        user_controller.read_msg(data, socket);
    });

    socket.on('msg_read', function(data){
        user_controller.read_msg(data);
    });

    // Get notification
    socket.on('get_notification', function(data){
        user_controller.get_notification(data, socket);
    });

    // checkUserMsgNull before leave the page
    socket.on('checkUserMsgNull', function(data){
        user_controller.checkUserMsgNull(data);
    });

    // Update notification inbox in home page
    socket.on('setHomePageCountToZero', function(data){
        user_controller.setHomePageCountToZero(data, socket);
    });

    socket.on('disconnect', function (data) { 
        console.log('Socket ${socket.id} disconnected.');
    });
});

http.listen(config.PORT, function () {
    console.log('listening on *:3000');
});
