'use strict';

/**
 * Module dependencies.
 */
var db = require('../../config/sequelize'),
    config = require('../../config/config');

//----------------------------------------Start----------------------------------------
//Product
/**
 * Retrieve a product by ProductID
 */
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

/**
 * Update Product
 */
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
//----------------------------------------End----------------------------------------

//----------------------------------------Start----------------------------------------
//ProductDetail
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
exports.showProductDetail = function(req, res) {
    return res.jsonp(req.productdetail);
};

/**
 * Create product detail
 */
exports.createProductDetail = function (req, res, next) {
    var message = null;
    var productdetail= db.T_Product_Detail.build(req.body);

    productdetail.save().then(function () {
        return res.jsonp({
            "result": "success"
        });
    }).catch(function (err) {
        res.send({status: 'Exception', message: err})
    });
};

/**
 * Update product detail
 */
exports.updateProductDetail = function(req, res) {
    
    // create a new variable to hold the article that was placed on the req object.
    var productdetail = req.productdetail;

    productdetail.updateAttributes({
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
//----------------------------------------End----------------------------------------

//----------------------------------------Start----------------------------------------
//ProductDetail
/**
 * Retrieve a product document by ProductDocumentID
 */
exports.getProductDocumentID = function(req, res, next, ProductDocumentID) {
    console.log('id => ' + ProductDocumentID); 
    db.T_Product_Document.find({where: {ProductDocumentID: ProductDocumentID}}).then(function(productdocument){
        if(!productdocument) {
            return next(new Error('Failed to load ProductDocumentID ' + ProductDocumentID));
        } else {
            req.productdocument = productdocument;
            return next();            
        }
    }).catch(function(err){
        return next(err);
    });
};

/**
 * Show a product document
 */
exports.showProductDocument = function(req, res) {
    return res.jsonp(req.productdocument);
};

/**
 * Create product document
 */
exports.createProductDocument = function (req, res, next) {
    var message = null;
    var productdocument= db.T_Product_Document.build(req.body);

    productdocument.save().then(function () {
        return res.jsonp({
            "result": "success"
        });
    }).catch(function (err) {
        res.send({status: 'Exception', message: err})
    });
};

/**
 * Update product document
 */
exports.updateProductDocument = function(req, res) {
    
    // create a new variable to hold the article that was placed on the req object.
    var productdocument = req.productdocument;

    productdocument.updateAttributes({
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
//----------------------------------------End----------------------------------------