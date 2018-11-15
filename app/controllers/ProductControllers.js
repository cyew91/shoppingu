'use strict';

/**
 * Module dependencies.
 */
// var db = require('../../config/sequelize');

//----------------------------------------Start----------------------------------------
//Product
// exports.getProduct = function (req, res) {
//     db.t_product.findAll()
//         .then(function (product) {
//             return res.jsonp(product);
//         })
//         .catch(function (err) {
//             return res.render('error', {
//                 error: err,
//                 status: 500
//             });
//         });
// };

/**
 * Retrieve a product by ProductID
 */
// exports.getProductByProdId = function (req, res, next, ProductID) {
//     console.log('id => ' + ProductID);
//     db.t_product.find({
//         where: {
//             ProductID: ProductID
//         }
//     }).then(function (product) {
//         if (!product) {
//             return next(new Error('Failed to load ProductID ' + ProductID));
//         } else {
//             req.product = product;
//             return next();
//         }
//     }).catch(function (err) {
//         return next(err);
//     });
// };

// exports.getProductByProfileIdAndTravelId = function (req, res, next) {
//     db.t_product.find({
//             where: {
//                 ProfileID: req.params.profileId,
//                 TravelID: req.params.travelId
//             }
//         })
//         .then(function (result) {
//             return res.jsonp(result);
//         })
//         .catch(function (err) {
//             return res.render('error', {
//                 error: err,
//                 status: 500
//             });
//         });
// };

/**
 * Show a product
 */
// exports.show = function (req, res) {
//     return res.jsonp(req.product);
// };

/**
 * Create product
 */
// exports.createProduct = function (req, res, next) {
//     var message = null;
//     var product = {
//         ProfileID: req.body.profileId,
//         TravelID: req.body.TravelID,
//         Description: "test",
//         Amount: 30,
//         PostType: 1,
//         IsActive: 1,
//         Remarks: "",
//         CreatedDate: Date.now(),
//         CreatedBy: "ks",
//         LastUpdatedDate: Date.now(),
//         LastUpdatedBy: "ks"
//     };

//     var productSave = db.t_product.build(product);
//     req.body.ProductID = productSave.ProductID;

//     productSave.save().then(function () {
//         return next();
//         // return res.jsonp({
//         //     "result": "success"
//         // });
//     }).catch(function (err) {
//         res.send({
//             status: 'Exception',
//             message: err
//         });
//     });
// };

/**
 * Update Product
 */
// exports.updateProduct = function (req, res) {

//     // create a new variable to hold the article that was placed on the req object.
//     var product = req.product;

//     product.updateAttributes({
//         LastUpdatedDate: Date.now(),
//         LastUpdatedBy: req.user
//     }).then(function (a) {
//         return res.jsonp(a);
//     }).catch(function (err) {
//         return res.send({
//             status: 'Exception',
//             message: err
//         });
//     });
// };

//----------------------------------------End----------------------------------------

//----------------------------------------Start----------------------------------------
//ProductDetail
/**
 * Retrieve a product detail by ProductDetailID
 */
// exports.getProductDetail = function (req, res) {
//     db.t_product_detail.findAll()
//         .then(function (product) {
//             return res.jsonp(product);
//         })
//         .catch(function (err) {
//             return res.render('error', {
//                 error: err,
//                 status: 500
//             });
//         });
// };

// exports.getProductDetailByProdId = function (req, res, next, ProductID) {
//     db.t_product.findAll({
//             where: {
//                 ProductID: ProductID
//             },
//             include: [{
//                 model: db.t_product_detail
//             }]
//         })
//         .then(function (result) {
//             return res.jsonp(result);
//         })
//         .catch(function (err) {
//             return res.render('error', {
//                 error: err,
//                 status: 500
//             });
//         });
// };

// exports.getProductDetailByProdName = function (req, res, next, ProductName) {
//     db.t_product_detail.findAll({ where: {ProductName: {$like: '%' + ProductName + '%'}}, PostType: false, include: [
//         {model: db.t_product_document}
//     ]})
//     .then(function(result){
//         return res.jsonp(result);
//     })
//     .catch(function(err){
//         return res.render('error', {
//             error: err,
//             status: 500
//         })
//     });
// };

//Use in search result page
// exports.getProductDetailByProdName = function (req, res, next, ProductName) {
//     db.post_travel_product.findAll({
//             where: {
//                 product_name: {
//                     $like: '%' + ProductName + '%'
//                 }
//             },
//             include: [
//                 // {model: db.t_product, where: {PostType: 0}}
//                 {
//                     model: db.post_travel_product_document
//                 }
//             ]
//         })
//         .then(function (result) {
//             return res.jsonp(result);
//         })
//         .catch(function (err) {
//             return res.render('error', {
//                 error: err,
//                 status: 500
//             });
//         });
// };

// exports.getProductDetailByProdNameReq = function (req, res, next, ProductName) {
//     db.t_product_detail.findAll({
//             where: {
//                 ProductName: {
//                     $like: '%' + ProductName + '%'
//                 }
//             },
//             include: [{
//                 model: db.t_product,
//                 where: {
//                     PostType: 1
//                 }
//             }, {
//                 model: db.t_product_document
//             }]
//         })
//         .then(function (result) {
//             return res.jsonp(result);
//         })
//         .catch(function (err) {
//             return res.render('error', {
//                 error: err,
//                 status: 500
//             });
//         });
// };

// exports.getProductDetailByProductID = function (req, res, next) {
//     db.t_product_detail.findAll({
//             where: {
//                 ProductID: req.params.productId
//             },
//             include: [{
//                 model: db.t_product_document
//             }]
//         })
//         .then(function (result) {
//             return res.jsonp(result);
//         })
//         .catch(function (err) {
//             return res.render('error', {
//                 error: err,
//                 status: 500
//             });
//         });
// };

//Use in search result site tree click on sub category
// exports.getProductDetailByProdSubCatID = function (req, res, next) {
//     db.post_travel_product.findAll({
//             where: {
//                 product_sub_category_id: req.params.productSubCatId
//             },
//             include: [{
//                     model: db.post_travel_product_document
//                 }
//             ]
//         })
//         .then(function (result) {
//             return res.jsonp(result);
//         })
//         .catch(function (err) {
//             return res.render('error', {
//                 error: err,
//                 status: 500
//             });
//         });
// };

/**
 * Show a product detail
 */
// exports.showProductDetail = function (req, res) {
//     return res.jsonp(req.productdetail);
// };

/**
 * Create product detail
 */
// exports.createProductDetail = function (req, res, next) {
//     var message = null;
    // var productdetail = {
    //     ProductID: req.body.ProductID,
    //     ProductCatID: req.body.ProductCatID,
    //     ProductSubCatID: req.body.ProductSubCatID,
    //     DetailDescription: req.body.DetailDescription,
    //     CurrencyID: req.body.CurrencyID,
    //     ProductName: req.body.ProductName,
    //     Amount: req.body.Amount,
    //     Status: 1,
    //     Remarks: "",
    //     CreatedDate: Date.now(),
    //     CreatedBy: "You2",
    //     LastUpdatedDate: Date.now(),
    //     LastUpdatedBy: "You3"
    // };

    // var productDetailSave = db.t_product_detail.build(productdetail)
    // if (req.body.length > 1)
    // {
    // for (var i = 0; i < req.body.productList.length; i++) {
    //     var productdetail = {
    //         ProductID: req.body.ProductID,
    //         ProductCatID: req.body.productList[i].productMainCategory.ProductCatID,
    //         ProductSubCatID: req.body.productList[i].productSubCategory.ProductSubCatID,
    //         DetailDescription: req.body.productList[i].productDescription,
    //         // CurrencyID: req.body.productList[i].CurrencyID,c1858e5e-995d-11e7-b85b-5d64dd272c67
    //         CurrencyID: "c1858e5e-995d-11e7-b85b-5d64dd272c67",
    //         ProductName: req.body.productList[i].productName,
    //         Amount: req.body.productList[i].productAmount,
    //         Status: 1,
    //         Remarks: "",
    //         CreatedDate: Date.now(),
    //         CreatedBy: "ks",
    //         LastUpdatedDate: Date.now(),
    //         LastUpdatedBy: "ks"
    //     };

    //     var productDetailSave = db.t_product_detail.build(productdetail);
    //     req.body.ProductDetailID = productDetailSave.ProductDetailID;
    //     productDetailSave.save();

    //     var productdocument = {
    //         ProductDetailID: req.body.ProductDetailID,
    //         // DocumentName: req.body.t_product_document.DocumentName,
    //         // DocumentType: req.body.t_product_document.DocumentType,
    //         // DocumentPath: req.body.t_product_document.DocumentPath,
    //         // Remarks: req.body.t_product_document.Remarks,
    //         DocumentName: "test ks",
    //         DocumentType: "test ks",
    //         DocumentPath: "uploads/" + req.body.productList[i].productImages[i],
    //         Remarks: "test ks",
    //         CreatedDate: Date.now(),
    //         CreatedBy: "ks",
    //         LastUpdatedDate: Date.now(),
    //         LastUpdatedBy: "ks"
    //     };

    //     var productDocumentSave = db.t_product_document.build(productdocument);
    //     productDocumentSave.save().then(function () {
    //         return res.jsonp({
    //             "result": "success"
    //         });
    //     });

    // };
    // return next();
    // }
    // else
    // {
    //     var productDetailSave = db.t_product_detail.build(req.body.productList);
    //     productDetailSave.save();
    //     req.body.ProductDetailID = productDetailSave.ProductDetailID;


    // }

    // req.body.ProductDetailID = productDetailSave.ProductDetailID;

    // productDetailSave.save().then(function () {
    //     // return next();
    //     return res.jsonp({
    //         "result": "success"
    //     });
    // }).catch(function (err) {
    //     res.send({ status: 'Exception', message: err })
    // });
// };

/**
 * Update product detail
 */
// exports.updateProductDetail = function (req, res) {

//     // create a new variable to hold the article that was placed on the req object.
//     var productdetail = req.productdetail;

//     productdetail.updateAttributes({
//         ProductCatID: "",
//         ProductSubCatID: "",
//         DetailDescription: req.body.productDescription,
//         CurrencyID: "",
//         ProductName: req.body.productName,
//         Amount: req.body.productAmount,
//         LastUpdatedDate: Date.now(),
//         LastUpdatedBy: req.user
//     }).then(function (a) {
//         return res.jsonp(a);
//     }).catch(function (err) {
//         return res.send({
//             status: 'Exception',
//             message: err
//         });
//     });
// };
//----------------------------------------End----------------------------------------

//----------------------------------------Start----------------------------------------
//ProductDetail
/**
 * Retrieve a product document by ProductDocumentID
 */
// exports.getProductDocument = function (req, res) {
//     db.t_product_document.findAll()
//         .then(function (product) {
//             return res.jsonp(product);
//         })
//         .catch(function (err) {
//             return res.render('error', {
//                 error: err,
//                 status: 500
//             });
//         });
// };

// exports.getProductDocumentById = function (req, res, next, ProductDocumentID) {
//     console.log('id => ' + ProductDocumentID);
//     db.t_product_document.find({
//         where: {
//             ProductDocumentID: ProductDocumentID
//         }
//     }).then(function (productdocument) {
//         if (!productdocument) {
//             return next(new Error('Failed to load ProductDocumentID ' + ProductDocumentID));
//         } else {
//             req.productdocument = productdocument;
//             return next();
//         }
//     }).catch(function (err) {
//         return next(err);
//     });
// };

// exports.getProductDocumentByProdDetailId = function (req, res, next, ProductName) {
//     db.t_product_detail.findAll({
//             where: {
//                 ProductDetailID: ProductDetailID
//             },
//             include: [{
//                 model: db.t_product_document
//             }]
//         })
//         .then(function (result) {
//             return res.jsonp(result);
//         })
//         .catch(function (err) {
//             return res.render('error', {
//                 error: err,
//                 status: 500
//             });
//         });
// };

/**
 * Create product document
 */
// exports.createProductDocument = function (req, res, next) {
//     var message = null;
//     var productdocument = {
//         ProductDetailID: req.body.ProductDetailID,
//         DocumentName: "",
//         DocumentType: "",
//         DocumentPath: "",
//         Remarks: "",
//         CreatedDate: Date.now(),
//         CreatedBy: req.user,
//         LastUpdatedDate: Date.now(),
//         LastUpdatedBy: req.user
//     };

//     productdocument.save().then(function () {
//         return res.jsonp({
//             "result": "success"
//         });
//     }).catch(function (err) {
//         res.send({
//             status: 'Exception',
//             message: err
//         });
//     });
// };

/**
 * Update product document
 */
// exports.updateProductDocument = function (req, res) {

//     // create a new variable to hold the article that was placed on the req object.
//     var productdocument = req.productdocument;

//     productdocument.updateAttributes({
//         DocumentName: "",
//         DocumentType: "",
//         DocumentPath: "",
//         LastUpdatedDate: Date.now(),
//         LastUpdatedBy: req.user
//     }).then(function (a) {
//         return res.jsonp(a);
//     }).catch(function (err) {
//         return res.send({
//             status: 'Exception',
//             message: err
//         });
//     });
// };
//----------------------------------------End----------------------------------------

//----------------------------------------Start----------------------------------------
//ProductDetail
/**
 * Create, Update and Select from Travel table.
 */
// exports.createTravel = function (req, res, next) {

//     var message = null;
//     var travel = {
//         // req.user not working.
//         //ProfileID: req.user,
//         ProfileID: req.body.profileId,
//         CountryID: req.body.countryID,
//         TravelDescription: req.body.travelDescription,
//         TravelStartDate: req.body.travelStartDate,
//         TravelEndDate: req.body.travelEndDate,
//         IsRequest: req.body.isRequest,
//         IsExpired: req.body.isExpired,
//         Remarks: req.body.remarks,
//         CreatedDate: Date.now(),
//         CreatedBy: req.body.createdBy,
//         LastUpdatedDate: Date.now(),
//         LastUpdatedBy: req.body.lastUpdatedBy
//     };

//     var travelSave = db.t_travel.build(travel);
//     req.body.TravelID = travelSave.TravelID;

//     travelSave.save().then(function () {
//         return next();
//         // return res.jsonp({
//         //     "result": "success"
//         // });
//     }).catch(function (err) {
//         res.send({
//             status: 'Exception',
//             message: err
//         });
//     });
// };

//----------------------------------------End----------------------------------------

//----------------------------------------Start----------------------------------------
//Product Categories
/**
 * Get Product Categories Lists
 */
// exports.getProductCat = function (req, res) {
//     db.t_product_cat.findAll()
//         .then(function (productcat) {
//             return res.jsonp(productcat);
//         })
//         .catch(function (err) {
//             return res.render('error', {
//                 error: err,
//                 status: 500
//             });
//         });
// };

// exports.getProductCatByProdCatId = function (req, res, next, ProductCatID) {
//     console.log('id => ' + ProductCatID);
//     db.t_product_cat.find({
//         where: {
//             ProductCatID: ProductCatID
//         }
//     }).then(function (product) {
//         if (!product) {
//             return next(new Error('Failed to load ProductCatID ' + ProductCatID));
//         } else {
//             req.product = product;
//             return next();
//         }
//     }).catch(function (err) {
//         return next(err);
//     });
// };

// exports.getProductSubCatByProductCatId = function (req, res, next, ProductCatID) {
//     db.t_product_cat.findAll({
//             where: {
//                 ProductCatID: ProductCatID
//             },
//             include: [{
//                 model: db.t_product_subcat
//             }]
//         })
//         .then(function (result) {
//             return res.jsonp(result);
//         })
//         .catch(function (err) {
//             return res.render('error', {
//                 error: err,
//                 status: 500
//             });
//         });
// };

// exports.getProductSubCat = function (req, res) {
//     db.t_product_subcat.findAll()
//         .then(function (product) {
//             return res.jsonp(product);
//         })
//         .catch(function (err) {
//             return res.render('error', {
//                 error: err,
//                 status: 500
//             });
//         });
// };

//Use in search result site tree 
// exports.getProductCatAndSubCat = function (req, res, next) {
//     db.product_category.findAll({include: [
//         {model: db.product_sub_category}
//     ]})
//     .then(function(result){
//         return res.jsonp(result);
//     })
//     .catch(function(err){
//         return res.render('error', {
//             error: err,
//             status: 500
//         });
//     });
// };

// exports.uploadProductImage = function (req, res) {
//     return res.render('201', {
//         Success: 'Yeah',
//         status: 201
//     });
// };