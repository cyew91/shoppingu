'use strict';

const postTravelProduct = require('../controllers/PostTravelProductController');
module.exports = function (app) {

    app.route('/posttravelproduct/id')
        .get(postTravelProduct.getPostTravelProductById)
        .put(postTravelProduct.updateProduct);

    app.route('/posttravelproduct')
        .get(postTravelProduct.all)
        // .get(postTravelProduct.getPostTravelProductById)
        // .put(postTravelProduct.updateProduct)
        .post(postTravelProduct.createProduct, postTravelProduct.createProductDocument);

    app.route('/posttravelproduct/productcategory')
        .get(postTravelProduct.getPostTravelProductByProductCategoryId);

    app.route('/posttravelproduct/profile')
        .get(postTravelProduct.getPostTravelByProfileId);
};
