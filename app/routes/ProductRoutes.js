'use strict';

/**
 * Module dependencies.
 */
var passport = require('passport');

module.exports = function (app) {
    //Routes
    var product = require('../../app/controllers/ProductControllers');
    var country = require('../../app/controllers/CountryControllers');
    
//----------------------------------------------------------------------------------------------------
    //Get Product By ProductID and Update Product
    app.route('/product/:productId')
    .get(product.show)
    .put(product.updateProduct, product.updateProductDetail, product.updateProductDocument);

    //Get All Product and Create Product
    app.route('/product')
    .get(product.getProduct)
    .post(product.createTravel, product.createProduct, product.createProductDetail, product.createProductDocument)

//----------------------------------------------------------------------------------------------------
    //Get All Product Details
    app.get('/productdetail',product.getProductDetail);

    //Get Product Details By ProductDetailID
    app.route('/productdetail/:productDetailId')
    .get(product.show);

    //Get Product By Product Name
    app.route('/productdetail/productdetailname/:productdetailname')
    .get(product.show);

    //Post Product Detail Page
    app.route('/postproductdetail/:profileId/:travelId')
    .get(product.getProductByProfileIdAndTravelId);

    app.route('/productdetaillisting/:productId')
    .get(product.getProductDetailByProductID);

//----------------------------------------------------------------------------------------------------
    //Get All Product Documents
    app.get('/productdocument',product.getProductDocument);

    //Get Product Documents By ProductDocumentID
    app.route('/productdocument/:productDocumentId')
    .get(product.show);
 
    //Get Product Documents By ProductDetailID
    app.route('/productdocument/productdetailId/:productDocumentDetailId')
    .get(product.show);
//----------------------------------------------------------------------------------------------------
    //Product Categories and Sub Categories
    app.get('/productcat', product.getProductCat);
    app.get('/productsubcat',product.getProductSubCat);
    app.route('/productsubcat/:productCatID')
    .get(product.show);

//----------------------------------------------------------------------------------------------------
    //Param
    app.param('productId', product.getProductByProdId);
    app.param('productdetailname', product.getProductDetailByProdName);
    app.param('productDetailId', product.getProductDetailByProdId);
    app.param('productDocumentId', product.getProductDocumentById);
    app.param('productDocumentDetailId', product.getProductDocumentByProdDetailId);
    app.param('productCatID', product.getProductSubCatByProductCatId);
    app.param(['travelId'], product.getProductByProfileIdAndTravelId);

//----------------------------------------------------------------------------------------------------
    //Country
    app.get('/country', country.all);

};