'use strict';

/**
 * Module dependencies.
 */
var passport = require('passport');

module.exports = function (app) {
    //Product Routes
    //Product
    var product = require('../../app/controllers/ProductControllers');

    app.get('/product/:ProductID', product.show);
    // Setting up the product api
    app.post('/product', product.create);
    app.put('/product/:ProductID', product.update);
    app.param('ProductID', product.getProductID);


    //ProductDetail Routes
    //ProductDetail
    var productdetail = require('../../app/controllers/ProductControllers');
    
    app.get('/productdetail/:ProductDetailID', productdetail.showProductDetail);
    // // Setting up the product detail api
    app.post('/productdetail', productdetail.createProductDetail);
    app.put('/productdetail/:ProductDetailID', productdetail.updateProductDetail);
    app.param('ProductDetailID', productdetail.getProductDetailID);


    //ProductDocument Routes
    //ProductDocument
    var productdocument = require('../../app/controllers/ProductControllers');
    
    app.get('/productdocument/:ProductDocumentID', productdocument.showProductDocument);
    // // Setting up the product detail api
    app.post('/productdocument', productdocument.createProductDocument);
    app.put('/productdocument/:ProductDocumentID', productdocument.updateProductDocument);
    app.param('ProductDocumentID', productdocument.getProductDocumentID);
};