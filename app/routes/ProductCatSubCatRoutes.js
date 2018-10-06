'use strict';

var productCatSubCat = require('../../app/controllers/ProductCatSubCatControllers');

module.exports = function (app) {
    app.route('/productcat')
    .get(productCatSubCat.getProductCat);

    app.route('/productcat/:productcatid')
    .get(productCatSubCat.show);

    app.route('/productcat/productsubcat')
    .get(productCatSubCat.getSubProductCat)

    app.route('/productcat/productsubcat/:productsubcatbyid')
    .get(productCatSubCat.show)

    app.param('productcatid', productCatSubCat.getProdCatById);
    app.param('productsubcatbyid', productCatSubCat.getProductSubCatByProdCatId);
};