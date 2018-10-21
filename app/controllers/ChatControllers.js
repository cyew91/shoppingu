'use strict';

/**
 * Module dependencies.
 */
var db = require('../../config/sequelize');

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
