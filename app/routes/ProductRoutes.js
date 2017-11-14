'use strict';

/**
 * Module dependencies.
 */
var passport = require('passport');

module.exports = function (app) {
    //Product Routes
    var product = require('../../app/controllers/ProductControllers');
    var productdetail = require('../../app/controllers/ProductControllers');
    var productdocument = require('../../app/controllers/ProductControllers');
    var country = require('../../app/controllers/CountryControllers');
    
    //Product
    app.get('/product/:ProductID', product.show);
    // Setting up the product api
    app.post('/product', product.create);
    app.put('/product/:ProductID', product.update);
    app.param('ProductID', product.getProductID);

    //ProductDetail
    app.get('/productdetail/:ProductDetailID', productdetail.showProductDetail);
    // // Setting up the product detail api
    app.post('/productdetail', productdetail.createProductDetail);
    app.put('/productdetail/:ProductDetailID', productdetail.updateProductDetail);
    app.param('ProductDetailID', productdetail.getProductDetailID);

    //ProductDocument
    app.get('/productdocument/:ProductDocumentID', productdocument.showProductDocument);
    // // Setting up the product detail api
    app.post('/productdocument', productdocument.createProductDocument);
    app.put('/productdocument/:ProductDocumentID', productdocument.updateProductDocument);
    app.param('ProductDocumentID', productdocument.getProductDocumentID);

    //Country
    app.get('/country', country.all);
};