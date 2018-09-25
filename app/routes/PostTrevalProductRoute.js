'use strict';

const postTravelProduct = require('../../app/controllers/PostTravelProductController');
module.exports = function (app) {

    app.route('/postTravelProduct/byId/:postTravelProductId')
        .get(postTravelProduct.show)
        .put(postTravelProduct.updateProduct);

    app.route('/postTravelProduct')
        .get(postTravelProduct.all)
        .post(postTravelProduct.createProduct, postTravelProduct.createProductDocument);

    app.route('/postTravelProduct/byProductCategoryId/:productCategoryId')
        .get(postTravelProduct.show);

    app.route('/postTravelProduct/:userProfileId')
        .get(postTravelProduct.show);

    app.param('postTravelProductId', postTravelProduct.byId);
    app.param('productCategoryId', postTravelProduct.byProductCategoryId);
    app.param('userProfileId', postTravelProduct.byProfileId);
};
