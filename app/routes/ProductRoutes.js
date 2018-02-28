'use strict';

/**
 * Module dependencies.
 */
var passport = require('passport');

var multer = require('multer');
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/uploads/')
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + '.jpg')
    }
  })
var upload = multer({ storage: storage }).any();

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
    .post(product.createTravel, product.createProduct, product.createProductDetail);
    // .post(product.createTravel, product.createProduct, product.createProductDetail, product.createProductDocument)

//----------------------------------------------------------------------------------------------------
    //Get All Product Details
    app.get('/productdetail',product.getProductDetail);

    //Get Product Details By ProductDetailID
    app.route('/productdetail/:productDetailId')
    .get(product.show);

    //Get Product By Product Name
    app.route('/productdetail/productdetailname/:productdetailname')
    .get(product.show);

    //Get Product By Product Name Request
    app.route('/productdetail/productdetailnamereq/:productdetailnamereq')
    .get(product.show);

    //Post Product Detail Page
    app.route('/postproductdetail/:profileId/:travelId')
    .get(product.getProductByProfileIdAndTravelId);

    app.route('/productdetaillisting/:productId')
    .get(product.getProductDetailByProductID);

    //Get Product Details By ProductSubCatID
    app.route('/productdetail/productsubcatid/:productSubCatId')
    .get(product.show);

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
    app.route('/productcat/:productCatID')
    .get(product.show);

    app.get('/productsubcat',product.getProductSubCat);
    app.route('/productsubcat/:productCatIDForSubCat')
    .get(product.show);

    app.get('/productcatandsubcat', product.getProductCatAndSubCat);

//----------------------------------------------------------------------------------------------------
    //Param
    app.param('productId', product.getProductByProdId);
    app.param('productdetailname', product.getProductDetailByProdName);
    app.param('productdetailnamereq', product.getProductDetailByProdNameReq);
    app.param('productDetailId', product.getProductDetailByProdId);
    app.param('productDocumentId', product.getProductDocumentById);
    app.param('productDocumentDetailId', product.getProductDocumentByProdDetailId);
    app.param('productCatIDForSubCat', product.getProductSubCatByProductCatId);
    app.param('productCatID', product.getProductCatByProdCatId);
    app.param(['travelId'], product.getProductByProfileIdAndTravelId);
    app.param(['productSubCatId'], product.getProductDetailByProdSubCatID);

//----------------------------------------------------------------------------------------------------
    //Country
    app.get('/country', country.all);

    //Dropzone: Upload product image
    // app.post('/uploadProductImage', product.uploadProductImage);
    app.post('/uploadProductImage', function (req, res) {
        upload(req, res, function (err) {
          if (err) {
            return res.json({ success: false , message: 'Damnit'});
          }
          return res.json({ success: true, message: 'Yeah'});
          // Everything OK
        })
      })
};