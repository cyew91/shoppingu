'use strict';

/**
 * Module dependencies.
 */
var sellerRate = require('../../app/controllers/SellerRateControllers');

module.exports = function (app) {
    // User Profile Routes
    app.route('/sellerrate/:id')
    .get(sellerRate.show)
    .put(sellerRate.updateSellerRate);

    app.route('/sellerrate')
    .post(sellerRate.createSellerRate)
    .get(sellerRate.all);

    app.param('id', sellerRate.getSellerRateById);
};