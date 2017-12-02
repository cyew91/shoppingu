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
    // app.route('/product/:productId')
    // .get(product.getAllProductByProdId);
    app.route('/product/productname/:productName')
    .get(product.show);

    app.route('/product/:productId')
    .get(product.show)
    .post(product.createTravel, product.createProduct, product.createProductDetail, product.createProductDocument)
    .put(product.update);

    //Product Categories and Sub Categories
    app.route('/product/productcat/:productcat')
    .get(product.show);

    app.get('/product',product.getProductCat);

    // app.param('productId', product.getProductID);
    app.param('productName', product.getProductByProdName);
    app.param('productId', product.getAllProductDetailByProdId);
    app.param('productcat', product.getProductSubCat);

    //Country
    app.get('/country', country.all);
};