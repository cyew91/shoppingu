'use strict';

/**
 * Module dependencies.
 */
var passport = require('passport');

module.exports = function (app) {
    //Routes
    var customerorder = require('../../app/controllers/CustomerControllers');
    
//----------------------------------------------------------------------------------------------------
    //Get Product By ProductID and Update Product
    app.route('/customerorder/:customerorderId')
    .get(customerorder.show)
    .put(customerorder.updateCustomerOrder);

    //Get All Customer Order and Create Customer Order
    app.route('/customerorder')
    .get(customerorder.getCustomerOrder)
    .post(customerorder.createCustomerOrder);

    app.route('/custorderwithproduct/:cprofileId')
    .get(customerorder.show);

//----------------------------------------------------------------------------------------------------
    //Param
    app.param('customerorderId', customerorder.getCustomerOrderById);
    app.param('cprofileId', customerorder.getCustomerOrderByProfileId);

};