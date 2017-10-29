'use strict';

/**
 * Module dependencies.
 */
var db = require('../../config/sequelize'),
    config = require('../../config/config');

exports.getProductID = function(req, res, next, ProductID) {
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
 * Show a product
 */
exports.show = function(req, res) {
    return res.jsonp(req.product);
};

/**
 * Create product
 */
exports.create = function (req, res, next) {
    var message = null;
    var product = db.T_Product.build(req.body);

    product.save().then(function () {
        return res.jsonp({
            "result": "success"
        });
    }).catch(function (err) {
        res.send({status: 'Exception', message: err})
    });
};

// Update Product
exports.update = function(req, res) {
    
    // create a new variable to hold the article that was placed on the req object.
    var product = req.product;

    product.updateAttributes({
        // FirstName: req.body.FirstName,
        // LastName: req.body.LastName,
        // Email: req.body.Email,
        // ContactNo: req.body.ContactNo
    }).then(function(a){
        return res.jsonp(a);
    }).catch(function(err){
        return res.send({status: 'Exception', message: err});
    });
};