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
        isActive: 1,
        createdDate: Date.now(),
        //post_travel_id: req.body.post_travel_id,
        product_category_id: req.body.productList[0].productCategoryId,
        product_sub_category_id: req.body.productList[0].productSubCategoryId,
        country_id: req.body.countryID,
        profile_id: req.body.profileId
    };

    var productSave = db.post_request_product.build(postRequestProduct);
    req.body.post_request_product_id = productSave.id;
    productSave.save().then(function () {
        // If success
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
            }).catch(function (err) { // If save post_request_product_document failed
                res.send({
                    status: 'Exception',
                    message: err
                })
            });
        };
    }).catch(function () { // If save post_request_product failed
        res.send({
            status: 'Exception',
            message: err
        })
    });
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

/**
 * Get posted request product in Account - My Requests
 */
exports.getPostRequestProductByProfileId = function (req, res) {
    db.post_request_product.findAll({
        where: { 
            profile_id: req.params.requestprofileId ,
            is_active: {
                $ne: 0
            }
        },
        order: [
            ['created_date', 'DESC']
        ],
        include: [{
            model: db.post_request_product_document
        },
        {
            model: db.country
        }
        ]
    }).then(function (request) {
        if (!request) {
            return res.jsonp(new Error('Failed to load postRequestProfileId '));
        } else {
            return res.jsonp(request);
        }
    }).catch(function (err) {
        return res.jsonp(err);
    });
};

/**
 *  Update Status Get posted request product in Account - My Requests
 */
exports.updatePostRequest = function (req, res) {

    // create a new variable to hold the article that was placed on the req object.
    var postRequest = req.postRequest;
    var requestStatus = false;

    postRequest.updateAttributes({
        isActive: requestStatus
    }).then(function (a) {
        return res.jsonp({
            "result": "success"
        });
    }).catch(function (err) {
        return res.send({ 
            status: 'Exception',
            message: err 
        });
    });
};

//Retrieve All Post Request Information By postTravelId
exports.getPostRequestById = function (req, res, next, id) {
    //console.log('id => ' + id);
    db.post_request_product.find({
        where: {
            id: id
        },
        include: [{
            model: db.country
        }]
    }).then(function (postRequest) {
        if (!postRequest) {
            return next(new Error('Failed to load postTravelId ' + id));
        } else {
            req.postRequest = postRequest;
            return next();
        }
    }).catch(function (err) {
        return next(err);
    });
};
