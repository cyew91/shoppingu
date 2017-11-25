'use strict';

/**
 * Module dependencies.
 */
var passport = require('passport');

module.exports = function (app) {
    //Product Routes
    var product = require('../../app/controllers/ProductControllers');
    var country = require('../../app/controllers/CountryControllers');
    
    //Product
    app.route('/productDetail/:productDetailID')
    .get(product.getAllProduct);

    app.route('/product/:productName')
    .get(product.getProductByProdName);

    app.route('/product/:productId')
    .get(product.show)
    .post(product.create)
    .put(product.update);

    app.param('productId', product.getProductID);
    app.param('productName', product.getProductByProdName);
    app.param('productDetailID', product.getAllProduct);
    
    //Country
    app.get('/country', country.all);
};