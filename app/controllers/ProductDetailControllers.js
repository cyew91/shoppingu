'use strict';

/**
 * Module dependencies.
 */
var db = require('../../config/sequelize'),
    config = require('../../config/config');

//ProductDetail
//----------------------------------------Start----------------------------------------
/**
 * Retrieve a product detail by ProductDetailID
 */
exports.getProductDetailID = function(req, res, next, ProductDetailID) {
    console.log('id => ' + ProductDetailID); 
    db.T_Product_Detail.find({where: {ProductDetailID: ProductDetailID}}).then(function(productdetail){
        if(!productdetail) {
            return next(new Error('Failed to load ProductDetailID ' + ProductDetailID));
        } else {
            req.productdetail = productdetail;
            return next();            
        }
    }).catch(function(err){
        return next(err);
    });
};

/**
 * Show a product detail
 */
exports.show = function(req, res) {
    return res.jsonp(req.productdetail);
};

//----------------------------------------End----------------------------------------