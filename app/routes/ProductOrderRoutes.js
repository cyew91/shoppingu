'use strict';

var productOrder = require('../../app/controllers/ProductOrderControllers');

module.exports = function (app) {
    app.route('/productorder/:productOrderId')
        .get(productOrder.show)
        .put(productOrder.update);

    app.route('/productorder/:profileId')
        .get(productOrder.show)

    app.route('/productorder')
        .get(productOrder.get)
        .post(productOrder.create);

    app.param('productOrderId', productOrder.getProductOrderById);
    app.param('profileId', productOrder.getProductOrderByProfileId);
};