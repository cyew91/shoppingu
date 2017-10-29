'use strict';

/**
 * Module dependencies.
 */
var db = require('../../config/sequelize'),
    config = require('../../config/config');

exports.getProductId = function(req, res, next, ProductID) {
    console.log('id => ' + ProductID);
    db.T_Product.find({where: {ProductID: ProductID}}).then(function(product){
        if(!product) {
            return next(new Error('Failed to load ProductID ' + ProductID));
        } else {
            req.product = product;
            return next();            
        }
    }).catch(function(err){
        return next(err);
    });
};

/**
 * Show a profile
 */
exports.show = function(req, res) {
    // Sending down the profile that was just preloaded by the profiles.getProfileId function
    // and saves profile on the req object.
    return res.jsonp(req.profile);
};

/**
 * Create profile
 */
exports.create = function (req, res, next) {
    var message = null;
    var profile = db.T_Profile.build(req.body);

    profile.save().then(function () {
        return res.jsonp({
            "result": "success"
        });
    }).catch(function (err) {
        res.send({status: 'Exception', message: err})
    });
};

// Update Profile
exports.update = function(req, res) {
    
    // create a new variable to hold the article that was placed on the req object.
    var profile = req.profile;

    profile.updateAttributes({
        FirstName: req.body.FirstName,
        LastName: req.body.LastName,
        Email: req.body.Email,
        ContactNo: req.body.ContactNo
    }).then(function(a){
        return res.jsonp(a);
    }).catch(function(err){
        return res.send({status: 'Exception', message: err});
    });
};