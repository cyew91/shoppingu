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

exports.createProduct = function (req, res, next) {
    const msg = '';
    const product = {
        productName: req.body.productName,
        description: req.body.description,
        amount: req.body.amount
    };

    const productSave = db.post_travel_product.build(product);

    req.body.postProductId = productSave.id;

    productSave.save().then(function(){
        return next();
    }).catch(function(err){
        return res.jsonp(err);
    });
};

exports.createProductDocument = function (req, res) {
    const msg = '';
    const productDocument = {
        imageName: req.body.imageName,
        imagePath: req.body.imagePath,
        post_travel_product_id: req.body.postProductId
    };

    const productDocumentSave = db.post_travel_product_document.build(productDocument);
    productDocumentSave.save().then(
        function(){
            return res.jsonp(req.body);
        }
    ).catch(function(err){
        return res.jsonp(err);
    });
};

exports.updateProduct = function(req, res){
    var product = req.product;

    console.log(product);

    product.updateAttributes({
        product_name:   req.body.productName,
        description:    req.body.description,
        amount:         req.body.amount

    }).then(function(result){
        return result.post_travel_product_documents[0].updateAttributes({
            imageName: req.body.imageName,
            imagePath: req.body.imagePath
        });

    }).then(function(result){
        return res.jsonp(result);

    }).catch(function(err){
        return res.jsonp(err);
    });
};

/**
 * Upload product image on post travel product page
 */
exports.uploadProductImage = function (req, res) {
    return res.render('201', {
        Success: 'Yeah',
        status: 201
    });
};

/**
 * Get posted product in Account - My Trips
 */
exports.getPostTravelProductByTravelId = function (req, res, next) {
    db.post_travel_product.findAll({
        where: { 
            post_travel_id: req.params.postTravelId 
        },
        include: [{
            model: db.post_travel_product_document
        }]
    }).then(function (product) {
        if (!product) {
            return res.jsonp(new Error('Failed to load postTraveProductlId ' + product.id));
        } else {
            req.product = product;
            return next();
        }
    }).catch(function (err) {
        return res.jsonp(err);
    });
};