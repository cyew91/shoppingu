'use strict';

var searchResult = require('../../app/controllers/SearchResultController');

module.exports = function (app) {

    //Get Product By Product Name
    app.route('/productdetail/productdetailname/:productdetailname') //Use in search result page
    .get(searchResult.show);

    //Get Product Details By ProductSubCatID
    app.route('/productdetail/productsubcatid/:productSubCatId') //Use in search result site tree click on sub category
    .get(searchResult.show);

    //Param
    app.param('productdetailname', searchResult.getProductDetailByProdName); //Use in search result page
    //Use in search result site tree click on sub category
    app.param(['productSubCatId'], searchResult.getProductDetailByProdSubCatID);
};