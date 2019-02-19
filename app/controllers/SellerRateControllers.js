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

exports.getSellerRateById = function (req, res, next) {
    db.seller_rate.find({
        where: { id: req.params.sellerRateId }
    }).then(function (rate) {
        if (!rate) {
            return res.jsonp(new Error('Failed to load sekkerRateId ' + rate.id));
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
        subject: req.body.subject,
        rating: req.body.rating,
        comment: req.body.comment
    };

    const rateSave = db.post_travel_product.build(rate);

    req.body.postProductId = rateSave.id;

    rateSave.save().then(function(){
        return next();
    }).catch(function(err){
        return res.jsonp(err);
    });
};

exports.updateSellerRate= function(req, res){
    var rate = req.rate;

    console.log(rate);

    rate.updateAttributes({
        subject: req.body.subject,
        rating: req.body.rating,
        comment: req.body.comment
    }).then(function(result){
        return res.jsonp(result);
    }).catch(function(err){
        return res.jsonp(err);
    });
};
