'use strict';

var productOrder = require('../../app/controllers/ProductOrderControllers');

module.exports = function (app) {
    app.param('productOrderId', productOrder.getProductOrderById);
    
    app.route('/productorder')
        .get(productOrder.get)
        .post(productOrder.create);

    app.route('/productorder/profile')
        .get(productOrder.getProductOrderByProfileId);

    app.route('/productorder/:productOrderId')
        .get(productOrder.show)
        .put(productOrder.update);
};