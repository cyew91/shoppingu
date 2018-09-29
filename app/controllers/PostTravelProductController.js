'use strict';

const db = require('../../config/sequelize');
const StandardError = require('standard-error');

exports.all = function(req, res){
    db.post_travel_product.findAll({include: [{model:db.post_travel_product_document, attributes: ['image_name', 'image_path']}]}).then(
        function(product){
            return res.jsonp(product);
        }).catch(function(err){
            return res.jsonp(err);
        });
};

exports.show = function (req, res) {
    return res.jsonp(req.product);
};

exports.getPostTravelProductById = function (req, res) {
    db.post_travel_product.find({
        where: { id: req.query.id },
        include: [{
            model: db.post_travel_product_document
        }]
    }).then(function (product) {
        if (!product) {
            return next(new Error('Failed to load postTraveProductlId ' + id));
        } else {
            req.product = product;
            return next();
        }
    }).catch(function (err) {
        return next(err);
    });
};

exports.getPostTravelProductByProductCategoryId = function(req, res){
    db.post_travel_product.findAll({
        where: {product_category_id: req.query.id}

    }).then(function(product){
        return res.jsonp(product);
        
    }).catch(function(err){
        return res.render('error', {
            error: err,
            status: 500
        })
    });
}

exports.getPostTravelByProfileId = function(req, res){
    db.post_travel.findAll({
        where: {profile_id: req.query.profileId},
        
        include: [{
            model: db.post_travel_product,
            include: [{
                model: db.post_travel_product_document
            }]
        }]

    }).then(function(travel){
        return res.jsonp(travel);
        
    }).catch(function(err){
        return res.jsonp(req.query);
    });
}

exports.createProduct = function (req, res, next) {
    const msg = '';
    const product = {
        productName: req.body.productName,
        description: req.body.description,
        amount: req.body.amount
    }

    const productSave = db.post_travel_product.build(product);

    req.body.postProductId = productSave.id;

    productSave.save().then(function(){
        return next();
    }).catch(function(err){
        return res.jsonp(err);
    });
};

exports.createProductDocument = function (req, res) {
    const msg = '';
    const productDocument = {
        imageName: req.body.imageName,
        imagePath: req.body.imagePath,
        post_travel_product_id: req.body.postProductId
    }

    const productDocumentSave = db.post_travel_product_document.build(productDocument);
    productDocumentSave.save().then(
        function(){
            return res.jsonp(req.body);
        }
    ).catch(function(err){
        return res.jsonp(err);
    });
};

exports.updateProduct = function(req, res){
    var product = req.product;

    console.log('updateProduct');

    product.updateAttributes({
        product_name:   req.body.productName,
        description:    req.body.description,
        amount:         req.body.amount

    }).then(function(result){
        return result.post_travel_product_documents[0].updateAttributes({
            imageName: req.body.imageName,
            imagePath: req.body.imagePath
        });
    }).then(function(result){
        return res.jsonp(result);

    }).catch(function(err){
        return res.jsonp(err);
    });
};
