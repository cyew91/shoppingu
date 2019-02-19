'use strict';

const db = require('../../config/sequelize');
const StandardError = require('standard-error');

/**
 * Get features product in home page
 */
exports.all = function(req, res){
    db.seller_rate.findAll({
    }).then(function(rate){
        return res.jsonp(rate);
    }).catch(function(err){
        return res.jsonp(err);
    });
};

exports.show = function (req, res) {
    return res.jsonp(req.rate);
};

exports.getSellerRateById = function (req, res, next, id) {
    db.seller_rate.find({
        where: {
            id: id
        }
    }).then(function (rate) {
        if (!rate) {
            return res.jsonp(new Error('Failed to load sellerRateId ' + rate.id));
        } else {
            req.rate = rate;
            return next();
        }
    }).catch(function (err) {
        return res.jsonp(err);
    });
};

exports.createSellerRate = function (req, res, next) {
    const msg = '';
    const rate = {
        sellerId: req.body.sellerId,
        subject: req.body.subject,
        rating: req.body.rating,
        comment: req.body.comment,
        profile_id: req.body.profile_id,
        post_travel_product_id: req.body.post_travel_product_id
    };

    const rateSave = db.seller_rate.build(rate);

    req.body.sellerRateId = rateSave.id;

    rateSave.save().then(function(){
        return res.jsonp({
            "result": "success"
        });
    }).catch(function(err){
        return res.jsonp(err);
    });
};

exports.updateSellerRate= function(req, res){
    var rate = req.rate;

    console.log(rate);

    rate.updateAttributes({
        sellerId: req.body.sellerId,
        subject: req.body.subject,
        rating: req.body.rating,
        comment: req.body.comment,
        profile_id: req.body.profile_id,
        post_travel_product_id: req.body.post_travel_product_id
    }).then(function(result){
        return res.jsonp({
            "result": "success"
        });
    }).catch(function(err){
        return res.jsonp(err);
    });
};
