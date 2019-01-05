'use strict';

var searchResult = require('../../app/controllers/SearchResultController');

module.exports = function (app) {

    //Get Product By Product Name
    app.route('/productdetail/productdetailname/:productdetailname') //Use in search result page
    .get(searchResult.show);

    //Get Product Details By ProductSubCatID
    app.route('/productdetail/productsubcatid/:productSubCatId') //Use in search result site tree click on sub category
    .get(searchResult.show);

    //Get Product By Product Category ID
    app.route('/productdetail/productcategoryid/:productcategoryid') //Use in search result after view product - Top Category, Header Category
    .get(searchResult.show);

    //Param
    //Use in search result page
    app.param('productdetailname', searchResult.getProductDetailByProdName); 
    //Use in search result site tree click on sub category
    app.param(['productSubCatId'], searchResult.getProductDetailByProdSubCatID);
    //Use in search result after view product - Top Category, Header Category
    app.param('productcategoryid', searchResult.getProductDetailByProdCatCode); 
};