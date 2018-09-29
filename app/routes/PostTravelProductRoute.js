'use strict';

const postTravelProduct = require('../controllers/PostTravelProductController');
module.exports = function (app) {

    app.route('/posttravelproduct/posttravelproduct')
        .get(postTravelProduct.getPostTravelProductById)
        .put(postTravelProduct.updateProduct);

    app.route('/posttravelproduct')
        .get(postTravelProduct.all)
        .post(postTravelProduct.createProduct, postTravelProduct.createProductDocument);

    app.route('/posttravelproduct/productcategory')
        .get(postTravelProduct.getPostTravelProductByProductCategoryId);

    app.route('/posttravelproduct/profile')
        .get(postTravelProduct.getPostTravelByProfileId);

    // app.param('postTravelProductId', postTravelProduct.getPostTravelProductById);
    // app.param('productCategoryId', postTravelProduct.getPostTravelProductByProductCategoryId);
    // app.param('userProfileId', postTravelProduct.getPostTravelByProfileId);
};
