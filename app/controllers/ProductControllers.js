'use strict';

/**
 * Module dependencies.
 */
var db = require('../../config/sequelize');

//----------------------------------------Start----------------------------------------
//Product
/**
 * Retrieve a product by ProductID
 */
exports.getProductID = function (req, res, next, ProductID) {
    console.log('id => ' + ProductID);
    db.T_Product.find({ where: { ProductID: ProductID } }).then(function (product) {
        if (!product) {
            return next(new Error('Failed to load ProductID ' + ProductID));
        } else {
            req.product = product;
            return next();
        }
    }).catch(function (err) {
        return next(err);
    });
};

/**
 * Show a product
 */
exports.show = function (req, res) {
    return res.jsonp(req.product);
};

/**
 * Create product
 */
exports.createProduct = function (req, res, next) {
    var message = null;
    var product = {
        ProfileID: req.user,
        TravelID: req.body.TravelID,
        Description: "",
        Amount: "",
        IsActive: 1,
        Remarks: "",
        CreatedDate: Date.now(),
        CreatedBy: "00000000-0000-0000-0000-000000000000",
        LastUpdatedDate: Date.now(),
        LastUpdatedBy: "00000000-0000-0000-0000-000000000000",
    };

    var productSave = db.T_Product.build(product);
    req.body.ProductID = productSave.ProductID;

    productSave.save().then(function () {
        return next();
    }).catch(function (err) {
        res.send({ status: 'Exception', message: err })
    });
};

/**
 * Update Product
 */
exports.update = function (req, res) {

    // create a new variable to hold the article that was placed on the req object.
    var product = req.product;

    product.updateAttributes({
        // FirstName: req.body.FirstName,
        // LastName: req.body.LastName,
        // Email: req.body.Email,
        // ContactNo: req.body.ContactNo
    }).then(function (a) {
        return res.jsonp(a);
    }).catch(function (err) {
        return res.send({ status: 'Exception', message: err });
    });
};
//----------------------------------------End----------------------------------------

//----------------------------------------Start----------------------------------------
//ProductDetail
/**
 * Retrieve a product detail by ProductDetailID
 */
exports.getProductDetailID = function (req, res, next, ProductDetailID) {
    console.log('id => ' + ProductDetailID);
    db.T_Product_Detail.find({ where: { ProductDetailID: ProductDetailID } }).then(function (productdetail) {
        if (!productdetail) {
            return next(new Error('Failed to load ProductDetailID ' + ProductDetailID));
        } else {
            req.productdetail = productdetail;
            return next();
        }
    }).catch(function (err) {
        return next(err);
    });
};

/**
 * Show a product detail
 */
exports.showProductDetail = function (req, res) {
    return res.jsonp(req.productdetail);
};

/**
 * Create product detail
 */
exports.createProductDetail = function (req, res, next) {
    var message = null;
    var productdetail = {
        ProductID: req.body.ProductID,
        ProductCatID: "",
        ProductSubCatID: "",
        CurrencyID: "",
        ProductName: req.body.email,
        Amount: 0,
        Status: "",
        Remarks: "",
        CreatedDate: Date.now(),
        CreatedBy: "00000000-0000-0000-0000-000000000000",
        LastUpdatedDate: Date.now(),
        LastUpdatedBy: "00000000-0000-0000-0000-000000000000",
    };

    var productDetailSave = db.T_Product_Detail.build(productdetail);
    req.body.ProductDetailID = productDetailSave.ProductDetailID;

    productDetailSave.save().then(function () {
        return next();
    }).catch(function (err) {
        res.send({ status: 'Exception', message: err })
    });
};

/**
 * Update product detail
 */
exports.updateProductDetail = function (req, res) {

    // create a new variable to hold the article that was placed on the req object.
    var productdetail = req.productdetail;

    productdetail.updateAttributes({
        // FirstName: req.body.FirstName,
        // LastName: req.body.LastName,
        // Email: req.body.Email,
        // ContactNo: req.body.ContactNo
    }).then(function (a) {
        return res.jsonp(a);
    }).catch(function (err) {
        return res.send({ status: 'Exception', message: err });
    });
};
//----------------------------------------End----------------------------------------

//----------------------------------------Start----------------------------------------
//ProductDetail
/**
 * Retrieve a product document by ProductDocumentID
 */
exports.getProductDocumentID = function (req, res, next, ProductDocumentID) {
    console.log('id => ' + ProductDocumentID);
    db.T_Product_Document.find({ where: { ProductDocumentID: ProductDocumentID } }).then(function (productdocument) {
        if (!productdocument) {
            return next(new Error('Failed to load ProductDocumentID ' + ProductDocumentID));
        } else {
            req.productdocument = productdocument;
            return next();
        }
    }).catch(function (err) {
        return next(err);
    });
};

/**
 * Create product document
 */
exports.createProductDocument = function (req, res, next) {
    var message = null;
    var productdocument = {
        ProductDetailID: req.body.ProductDetailID,
        DocumentName: "",
        DocumentType: "",
        DocumentPath: "",
        Remarks: "",
        CreatedDate: Date.now(),
        CreatedBy: "00000000-0000-0000-0000-000000000000",
        LastUpdatedDate: Date.now(),
        LastUpdatedBy: "00000000-0000-0000-0000-000000000000",
    };

    productdocument.save().then(function () {
        return res.jsonp({
            "result": "success"
        });
    }).catch(function (err) {
        res.send({ status: 'Exception', message: err })
    });
};

/**
 * Update product document
 */
exports.updateProductDocument = function (req, res) {

    // create a new variable to hold the article that was placed on the req object.
    var productdocument = req.productdocument;

    productdocument.updateAttributes({
        // FirstName: req.body.FirstName,
        // LastName: req.body.LastName,
        // Email: req.body.Email,
        // ContactNo: req.body.ContactNo
    }).then(function (a) {
        return res.jsonp(a);
    }).catch(function (err) {
        return res.send({ status: 'Exception', message: err });
    });
};
//----------------------------------------End----------------------------------------

//----------------------------------------Start----------------------------------------
//ProductDetail
/**
 * Create, Update and Select from Travel table.
 */
exports.createTravel = function (req, res, next) {
    var message = null;
    var travel = {
        ProfileID: req.user,
        CountryID: "",
        TravelDescription: "",
        TravelStartDate: "",
        TravelEndDate: req.body.email,
        IsExpired: 0,
        Remarks: "",
        CreatedDate: Date.now(),
        CreatedBy: "00000000-0000-0000-0000-000000000000",
        LastUpdatedDate: Date.now(),
        LastUpdatedBy: "00000000-0000-0000-0000-000000000000",
    };

    var travelSave = db.T_Travel.build(travel);
    req.body.TravelID = travelSave.TravelID;

    travelSave.save().then(function () {
        return next();
    }).catch(function (err) {
        res.send({ status: 'Exception', message: err })
    });
};

 //----------------------------------------End----------------------------------------

exports.getAllProductDetailByProdId = function (req, res, next, ProductID) {
    db.t_product.findAll({ where: {ProductID: ProductID}, include: [
        {model: db.t_product_detail}
    ]})
    .then(function(result){
        return res.jsonp(result);
    })
    .catch(function(err){
        return res.render('error', {
            error: err,
            status: 500
        })
    });
};

exports.getProductByProdName = function (req, res, next, ProductName) {
    db.t_product_detail.findAll({ where: {ProductName: {$like: '%' + ProductName + '%'}}, include: [
        {model: db.t_product_document}
    ]})
    .then(function(result){
        return res.jsonp(result);
    })
    .catch(function(err){
        return res.render('error', {
            error: err,
            status: 500
        })
    });
};

//----------------------------------------Start----------------------------------------
//Product Categories
/**
 * Get Product Categories Lists
 */
exports.getProductCat = function(req, res){
    db.t_product_cat.findAll()
    .then(function(productCat){
        return res.jsonp(productCat);
    })
    .catch(function(err){
        return res.render('error', {
            error: err,
            status: 500
        })
    });
};

exports.getProductSubCat = function (req, res, next, ProductCatID) {
    db.t_product_cat.findAll({ where: {ProductCatID: ProductCatID}, include: [
        {model: db.t_product_subcat}
    ]})
    .then(function(result){
        return res.jsonp(result);
    })
    .catch(function(err){
        return res.render('error', {
            error: err,
            status: 500
        })
    });
};

  //----------------------------------------End----------------------------------------

