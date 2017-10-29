'use strict';

/**
 * Module dependencies.
 */
var passport = require('passport');

module.exports = function (app) {
    // roduct Routes
    var product = require('../../app/controllers/ProductControllers');

    app.get('/product/:ProductID', product.show)

    // Setting up the product api
    app.post('/product', product.create);
    app.put('/product/:ProductID', product.update);

    app.param('ProductID', product.getProductID);
};