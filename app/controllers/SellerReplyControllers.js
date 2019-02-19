'use strict';

const db = require('../../config/sequelize');
const StandardError = require('standard-error');

/**
 * Get features product in home page
 */
exports.all = function(req, res){
    db.seller_reply.findAll({
    }).then(function(reply){
        return res.jsonp(reply);
    }).catch(function(err){
        return res.jsonp(err);
    });
};

exports.show = function (req, res) {
    return res.jsonp(req.reply);
};

exports.getSellerReplyById = function (req, res, next, id) {
    db.seller_reply.find({
        where: {
            id: id
        }
    }).then(function (reply) {
        if (!reply) {
            return res.jsonp(new Error('Failed to load sellerReplyId ' + reply.id));
        } else {
            req.reply = reply;
            return next();
        }
    }).catch(function (err) {
        return res.jsonp(err);
    });
};

exports.createSellerReply = function (req, res, next) {
    const msg = '';
    const reply = {
        sellerId: req.body.sellerId,
        reply: req.body.reply,
        seller_rate_id: req.body.seller_rate_id,
        profile_id: req.body.profile_id
    };

    const replySave = db.seller_reply.build(reply);

    req.body.sellerReplyId = replySave.id;

    replySave.save().then(function(){
        return res.jsonp({
            "result": "success"
        });
    }).catch(function(err){
        return res.jsonp(err);
    });
};

exports.updateSellerReply= function(req, res){
    var reply = req.reply;

    console.log(reply);

    reply.updateAttributes({
        sellerId: req.body.sellerId,
        reply: req.body.reply,
        seller_rate_id: req.body.seller_rate_id,
        profile_id: req.body.profile_id
    }).then(function(result){
        return res.jsonp({
            "result": "success"
        });
    }).catch(function(err){
        return res.jsonp(err);
    });
};
