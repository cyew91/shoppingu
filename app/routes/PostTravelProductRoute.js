'use strict';

const postTravelProduct = require('../controllers/PostTravelProductController');
module.exports = function (app) {

    app.param('postTravelProductId', postTravelProduct.getPostTravelProductById);

    app.route('/posttravelproduct/:postTravelProductId')
        .get(postTravelProduct.show)
        .put(postTravelProduct.updateProduct);

    app.route('/posttravelproduct')
        .get(postTravelProduct.all)
        .post(postTravelProduct.createProduct, postTravelProduct.createProductDocument);

    app.route('/posttravelproduct/productcategory')
        .get(postTravelProduct.getPostTravelProductByProductCategoryId);

    app.route('/posttravelproduct/profile')
        .get(postTravelProduct.getPostTravelByProfileId);
};
