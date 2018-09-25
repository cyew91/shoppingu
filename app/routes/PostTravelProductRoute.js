'use strict';

const postTravelProduct = require('../controllers/PostTravelProductController');
module.exports = function (app) {

    app.route('/posttravelproduct/byid/:postTravelProductId')
        .get(postTravelProduct.show)
        .put(postTravelProduct.updateProduct);

    app.route('/posttravelproduct')
        .get(postTravelProduct.all)
        .post(postTravelProduct.createProduct, postTravelProduct.createProductDocument);

    app.route('/posttravelproduct/byproductcategoryid/:productCategoryId')
        .get(postTravelProduct.show);

    app.route('/posttravelproduct/:userProfileId')
        .get(postTravelProduct.show);

    app.param('postTravelProductId', postTravelProduct.getPostTravelProductById);
    app.param('productCategoryId', postTravelProduct.getPostTravelProductByProductCategoryId);
    app.param('userProfileId', postTravelProduct.getPostTravelByUserProfileId);
};
