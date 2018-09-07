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

exports.byProductCategoryId = function(req, res, next, id){
    db.post_travel_product.findAll({
        where: {product_category_id: id}

    }).then(function(product){
        req.product = product;
        return next();
        
    }).catch(function(err){
        return res.render('error', {
            error: err,
            status: 500
        })
    });
}

exports.byProfileId = function(req, res, next, id){
    db.post_travel.findAll({
        where: {profile_id: id},
        include: [{
            model: db.post_travel_product,
            include: [{
                model: db.post_travel_product_document
            }]
        }]

    }).then(function(travel){
        req.product = travel;
        return next();
        
    }).catch(function(err){
        return res.jsonp(err);
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