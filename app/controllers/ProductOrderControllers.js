'use strict';

var db = require('../../config/sequelize');

// Get all product order
exports.get = function (req, res) {
    db.product_order.findAll()
        .then(function (productOrder) {
            return res.jsonp(productOrder);
        })
        .catch(function (err) {
            return res.render('error', {
                error: err,
                status: 500
            });
        });
};

// Get product order by id
exports.getProductOrderById = function (req, res, next, id) {
    db.product_order.find({
        where: {
            id: id
        }
    }).then(function (productOrder) {
        if (!productOrder) {
            return next(new Error('Failed to load product order ' + id));
        } else {
            req.productOrder = productOrder;
            return next();
        }
    }).catch(function (err) {
        return next(err);
    });
};

// Get product order by profile id
exports.getProductOrderByProfileId = function (req, res, next) {
    db.product_order.find({
            where: {
                profile_id: req.query.profileId
            }
        })
        .then(function (productOrder) {
            return res.jsonp(productOrder);
        })
        .catch(function (err) {
            return res.render('error', {
                error: err,
                status: 500
            });
        });
};

// Get product order result
exports.show = function (req, res) {
    return res.jsonp(req.productOrder);
};

// Create product order
exports.create = function (req, res, next) {
    var productOrder = {
        quantity: req.body.quantity,
        offerPrice: req.body.offerPrice,
        orderStatus: req.body.orderStatus,
        post_travel_product_id: req.body.post_travel_product_id,
        profile_id: req.body.profile_id
    };

    var productOrderModel = db.product_order.build(productOrder);
    req.body.productOrderId = productOrderModel.id;

    productOrderModel.save().then(function () {
        return res.jsonp({
            "result": "success"
        });
    }).catch(function (err) {
        res.send({
            status: 'Exception',
            message: err
        });
    });
};

// Update product order
exports.update = function (req, res) {
    var productOrder = req.productOrder;

    productOrder.updateAttributes({
        quantity: req.body.quantity,
        offerPrice: req.body.offerPrice,
        orderStatus: req.body.orderStatus
    }).then(function () {
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