'use strict';

const db = require('../../config/sequelize');
const StandardError = require('standard-error');

/**
 * Get features product in home page
 */
exports.all = function(req, res){
    db.post_travel_product.findAll({
        include: [{
            model:db.post_travel_product_document
        },
        {
            model:db.product_category
        }
        ]
    }).then(
        function(product){
            return res.jsonp(product);
        }).catch(function(err){
            return res.jsonp(err);
        });
};

exports.show = function (req, res) {
    return res.jsonp(req.product);
};

/**
 * Create product
 */
exports.createPostRequestProduct = function (req, res) {
    var postRequestProduct = {
        productName: req.body.productList[0].productName,
        description: req.body.productList[0].productDescription,
        amount: req.body.productList[0].amount,
        // PostType: 1,
        // IsActive: 1,
        createdDate: Date.now(),
        //post_travel_id: req.body.post_travel_id,
        product_category_id: req.body.productList[0].productCategoryId,
        product_sub_category_id: req.body.productList[0].productSubCategoryId,
        country_id: req.body.countryID,
        profile_id: req.body.profileId
    };

    var productSave = db.post_request_product.build(postRequestProduct);
    req.body.post_request_product_id = productSave.id;
    productSave.save();//.then(function () {

    for (var j=0; j<req.body.productList[0].productImage.length; j++){
        var postRequestProductDocument = {
            imageName: req.body.productList[0].productImage[j].imageName,
            imagePath: req.body.productList[0].productImage[j].imagePath,
            createdDate: Date.now(),
            post_request_product_id: req.body.post_request_product_id
        };

        var productDocumentSave = db.post_request_product_document.build(postRequestProductDocument);
        productDocumentSave.save().then(function () {
            return res.jsonp({
                "result": "success"
            });
        }).catch(function (err) {
            res.send({
                status: 'Exception',
                message: err
            })
        });
    };
};


/**
 * Upload product image on post travel product page
 */
exports.uploadProductImage = function (req, res) {
    return res.render('201', {
        Success: 'Yeah',
        status: 201
    });
};
