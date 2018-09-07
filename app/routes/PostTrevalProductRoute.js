'use strict';

const postTravelProduct = require('../../app/controllers/PostTravelProductController');
module.exports = function (app) {

    app.route('/postTravelProduct')
        .get(postTravelProduct.all)
        .post(postTravelProduct.createProduct, postTravelProduct.createProductDocument);

    app.route('/postTravelProduct/byProductCategoryId/:productCategoryId')
        .get(postTravelProduct.show);

    app.route('/postTravelProduct/byProfileId/:profileID')
        .get(postTravelProduct.show);

    app.param('productCategoryId', postTravelProduct.byProductCategoryId);
    app.param('profileID', postTravelProduct.byProfileId);
};