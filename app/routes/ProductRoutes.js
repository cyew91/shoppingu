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
    app.route('/product')
    .get(product.getAllProduct);

    app.route('/product/:productId')
    .get(product.show)
    .post(product.create)
    .put(product.update);

    app.param('productId', product.getProductID);
    
    //Country
    app.get('/country', country.all);
};