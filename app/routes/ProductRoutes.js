'use strict';

/**
 * Module dependencies.
 */
// var passport = require('passport');

// var filePath = 'public/uploads/';
// var multer = require('multer');
// var storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, filePath);
//     },
//     filename: function (req, file, cb) {
//       cb(null, req.body.myFileName);
//     }
//   });
// var upload = multer({ storage: storage }).any();

// const fs = require('fs');

module.exports = function (app) {
//     //Routes
    // var product = require('../../app/controllers/ProductControllers');
    // var country = require('../../app/controllers/CountryControllers');
    
//----------------------------------------------------------------------------------------------------
    //Get Product By ProductID and Update Product
    // app.route('/product/:productId')
    // .get(product.show)
    // .put(product.updateProduct, product.updateProductDetail, product.updateProductDocument);

    //No use
    //Get All Product and Create Product
    // app.route('/product')
    // .get(product.getProduct)
    // .post(product.createTravel, product.createProduct, product.createProductDetail);
    // .post(product.createTravel, product.createProduct, product.createProductDetail, product.createProductDocument)

//----------------------------------------------------------------------------------------------------
    //Get All Product Details
    // app.get('/productdetail',product.getProductDetail);

    //Get Product Details By ProductDetailID
    // app.route('/productdetail/:productDetailId')
    // .get(product.show);

    //Get Product By Product Name
    // app.route('/productdetail/productdetailname/:productdetailname') //Use in search result page
    // .get(product.show);

    //Get Product By Product Name Request
    // app.route('/productdetail/productdetailnamereq/:productdetailnamereq')
    // .get(product.show);

    //Post Product Detail Page
    // app.route('/postproductdetail/:profileId/:travelId')
    // .get(product.getProductByProfileIdAndTravelId);

    // app.route('/productdetaillisting/:productId')
    // .get(product.getProductDetailByProductID);

    //Get Product Details By ProductSubCatID
    // app.route('/productdetail/productsubcatid/:productSubCatId') //Use in search result site tree click on sub category
    // .get(product.show);

//----------------------------------------------------------------------------------------------------
    //Get All Product Documents
    // app.get('/productdocument',product.getProductDocument);

    //Get Product Documents By ProductDocumentID
    // app.route('/productdocument/:productDocumentId')
    // .get(product.show);
 
    //Get Product Documents By ProductDetailID
    // app.route('/productdocument/productdetailId/:productDocumentDetailId')
    // .get(product.show);
//----------------------------------------------------------------------------------------------------
    //Product Categories and Sub Categories
    // app.get('/productcat', product.getProductCat);
    // app.route('/productcat/:productCatID')
    // .get(product.show);

    // app.get('/productsubcat',product.getProductSubCat);
    // app.route('/productsubcat/:productCatIDForSubCat')
    // .get(product.show);

    //Use in search result site tree 
    // app.get('/productcatandsubcat', product.getProductCatAndSubCat);

//----------------------------------------------------------------------------------------------------
    //Param
    // app.param('productId', product.getProductByProdId);
    // app.param('productdetailname', product.getProductDetailByProdName); //Use in search result page
    // app.param('productdetailnamereq', product.getProductDetailByProdNameReq);
    // app.param('productDetailId', product.getProductDetailByProdId);
    // app.param('productDocumentId', product.getProductDocumentById);
    // app.param('productDocumentDetailId', product.getProductDocumentByProdDetailId);
    // app.param('productCatIDForSubCat', product.getProductSubCatByProductCatId);
    // app.param('productCatID', product.getProductCatByProdCatId);
    // app.param(['travelId'], product.getProductByProfileIdAndTravelId);
    // app.param(['productSubCatId'], product.getProductDetailByProdSubCatID); //Use in search result site tree click on sub category

//----------------------------------------------------------------------------------------------------
    //Country
    // app.get('/country', country.all);

    //Dropzone: Upload product image
    // app.post('/uploadProductImage', product.uploadProductImage);
    // app.post('/uploadProductImage', function (req, res) {
    //     upload(req, res, function (err) {
    //       if (err) {
    //         return res.json({ success: false , message: 'Great'});
    //       }
    //       return res.json({ success: true, message: req.files});
    //       // Everything OK
    //     });
    // });
    
    // app.post('/deleteProductImage', function (req, res) {
    //     //filePath = filePath + fileNameDateNow;
    //     fs.unlink(filePath + req.body.myName, function (err) {
    //         if (err) {
    //             return res.json({ success: false , message: 'Great'});
    //         }
    //         return res.json({ success: true, message: req.body.myName});
    //         // Everything OK
    //     });
    // });
};