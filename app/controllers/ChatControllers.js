'use strict';

/**
 * Module dependencies.
 */
var sequelize = require('../../config/sequelize');
var db = require('../../config/sequelize');
var io='';
var dateFormat = require('dateformat');

// chat start
exports.get_io = function(data) {
    io=data; 
}

exports.getUserFriendList = function(data, socket){
    var name = data.username;
    var user_2 = data.user_2;
    db.inboxes.findAll({
        where: { 
            $or: [
                {
                    user_1: name
                },
                {
                    user_2: name
                }
            ]
        },
        attributes: ['user_1', 'user_2']
    })
    .then(function(data){
        //return res.jsonp(chat);
        if (data.length > 0){
            socket.emit("returnFriendList", data);
        }
        else{
            db.inboxes.create({
                user_1: name,
                user_2: user_2
            })
            .then(function(data){
                socket.emit("inbox_id",{inbox_id:data.id,user_2})
            });
        }
    })
    .catch(function(err){
        // return res.render('error', {
        //     error: err,
        //     status: 500
        // });
    });
};

exports.inbox_id = function(data, socket){
    var user_1=data.user_1;
    var user_2=data.user_2;
    db.inboxes.find({
        where: {
            user_1: {
                $or:[
                    user_1, 
                    user_2
                ]
            },
            user_2: {
                $or:[
                    user_1,
                    user_2
                ]
            },
        },
        attributes: ['id','user_1','user_2']
    })
    .then(function(data){
        //console.log(data.dataValues);
        if (data){
            socket.emit('inbox_id2',{inbox_id:data.id,user_2}); 
        }
        // else{
        //     db.inboxes.create({
        //         user_1: user_1,
        //         user_2: user_2
        //     })
        //     .then(function(data){
        //         socket.emit("inbox_id",{inbox_id:data.id,user_2})
        //     });
        // }
        
    })
    .catch(function(err){
        // return res.render('error', {
        //     error: err,
        //     status: 500
        // });
    });
};

exports.get_messages = function (data, socket) {
    db.replies.findAll({
        where: {
            inbox_id: data
        },
        attributes: ['id','Message','user_name','inbox_id','time','date','seen_time','status','createdAt']
    })
    .then(function(data){
        //console.log(data.dataValues);
        if (data.length > 0)
            socket.emit('all_messages',data);  
    })
    .catch(function(err){
        // return res.render('error', {
        //     error: err,
        //     status: 500
        // });
    });
};

exports.message = function (data, socket) {
    var user_name;
    var message;
    var inbox_id;
    var dateNow = new Date();
    var name = data.frnd_name;
    var time = dateFormat(dateNow,"shortTime").toString();
    var date = dateFormat(dateNow,"fullDate").toString();
    
    var chat = {
        inbox_id: data.inbox_id,
        Message: data.msg,
        user_name: data.name,
        time: time,
        status: 'unread',
        date: date
    };
    var saveProfile = db.replies.build(chat);

    saveProfile.save().then(function (data) {
        user_name = data.dataValues.user_name;
        message=data.dataValues.Message;
        inbox_id=data.dataValues.inbox_id;

        io.emit('new_message',{id:data.dataValues.id,
            user_name:user_name, 
            message:message, 
            inbox_id:inbox_id,
             time:data.dataValues.time,
             date:data.dataValues.date,
             status:data.dataValues.status
             });
        //console.log("Success");
        // return res.jsonp({
        //     "result": "success"
        // });
    })
    // .then(function (data){

    // })
    .catch(function (err) {
        console.log("Error: " + err);
        // res.send({
        //     status: 500,
        //     message: err
        // });
    });
};

// chat end


//----------------------------------------Start----------------------------------------
//Chat
exports.getChat = function(req, res){
    db.t_chat.findAll()
    .then(function(chat){
        return res.jsonp(chat);
    })
    .catch(function(err){
        return res.render('error', {
            error: err,
            status: 500
        });
    });
};

/**
 * Retrieve a chat by ChatID
 */
exports.getChatByChatId = function (req, res, next, ChatID) {
    console.log('id => ' + ChatID);
    db.t_chat.find({ where: { ChatID: ChatID } }).then(function (chat) {
        if (!chat) {
            return next(new Error('Failed to load ChatID ' + ChatID));
        } else {
            req.chat = chat;
            return next();
        }
    }).catch(function (err) {
        return next(err);
    });
};

/**
 * Show a chat
 */
exports.show= function (req, res) {
    return res.jsonp(req.chat);
};

/**
 * Create chat
 */
exports.createChat = function (req, res, next) {
    var message = null;
    var chat = {
        chatProfileID_Sender: req.body.From,
        chatProfileID_Receiver: req.body.To,
        TotalMessage: req.body.TotalMessage,
        Remarks: "",
        CreatedDate: Date.now(),
        CreatedBy: req.user,
        LastUpdatedDate: Date.now(),
        LastUpdatedBy: req.user
    };

    var chatSave = db.t_chat.build(chat);
    req.body.ChatID = chatSave.ChatID;

    chatSave.save().then(function () {
        return res.jsonp({
            "result": "success"
        });
    }).catch(function (err) {
        res.send({ status: 'Exception', message: err });
    });
};

/**
 * Update Chat
 */
exports.updateChat = function (req, res) {

    // create a new variable to hold the article that was placed on the req object.
    var chat = req.chat;

    chat.updateAttributes({
        TotalMessage: "",
        LastUpdatedDate: Date.now(),
        LastUpdatedBy: req.user
    }).then(function (a) {
        return res.jsonp(a);
    }).catch(function (err) {
        return res.send({ status: 'Exception', message: err });
    });
};

//----------------------------------------End----------------------------------------

//----------------------------------------Start----------------------------------------
//ChatDetail
/**
 * Retrieve a chat detail by ChatDetailID
 */
exports.getChatDetail = function(req, res){
    db.t_chat_detail.findAll()
    .then(function(chat){
        return res.jsonp(chat);
    })
    .catch(function(err){
        return res.render('error', {
            error: err,
            status: 500
        });
    });
};

exports.getChatDetailByChatId = function (req, res, next, ChatID) {
    db.t_chat.findAll({ where: {ChatID: ChatID}, include: [
        {model: db.t_chat_detail}
    ]})
    .then(function(result){
        return res.jsonp(result);
    })
    .catch(function(err){
        return res.render('error', {
            error: err,
            status: 500
        });
    });
};

/**
 * Show a chat detail
 */
exports.showChatDetail = function (req, res) {
    return res.jsonp(req.chatdetail);
};

/**
 * Create chat detail
 */
exports.createChatDetail = function (req, res, next) {
    var message = null;
    var chatdetail = {
        ChatID: req.body.ChatID,
        Message: "",
        From: "",
        Remarks: "",
        CreatedDate: Date.now(),
        CreatedBy: req.user,
        LastUpdatedDate: Date.now(),
        LastUpdatedBy: req.user
    };

    var chatDetailSave = db.t_chat_detail.build(chatdetail);
    req.body.ChatDetailID = chatDetailSave.ChatDetailID;

    chatDetailSave.save().then(function () {
        return next();
    }).catch(function (err) {
        res.send({ status: 'Exception', message: err });
    });
};
//----------------------------------------End----------------------------------------
