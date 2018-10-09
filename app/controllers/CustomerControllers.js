'use strict';

/**
 * Module dependencies.
 */
var db = require('../../config/sequelize');

//----------------------------------------Start----------------------------------------
//Customer Order
exports.getCustomerOrder = function (req, res) {
    db.t_customer_order.findAll()
        .then(function (customerorder) {
            return res.jsonp(customerorder);
        })
        .catch(function (err) {
            return res.render('error', {
                error: err,
                status: 500
            });
        });
};

/**
 * Show a Customer Order
 */
exports.show= function (req, res) {
    return res.jsonp(req.customerorder);
};

/**
 * Retrieve a customer order by CustomerOrderID
 */
exports.getCustomerOrderById = function (req, res, next, CustomerOrderID) {
    db.t_customer_order.find({ where: { CustomerOrderID: CustomerOrderID } }).then(function (customerorder) {
        if (!customerorder) {
            return next(new Error('Failed to load CustomerOrderID ' + CustomerOrderID));
        } else {
            req.customerorder = customerorder;
            return next();
        }
    }).catch(function (err) {
        return next(err);
    });
};

/**
 * Retrieve a product detail by CustomerOrderID
 */
exports.getProductDetailByCustomerOrderID = function (req, res, next, CustomerOrderID) {
    db.t_customer_order.findAll({where: {CustomerOrderID: CustomerOrderID}, include: [
        {model: db.t_product_detail}
    ]})
    .then(function(result){
        return res.jsonp(result);
    })
    .catch(function(err){
        return res.render('error', {
            error: err,
            status: 500
        });
    });
};

/**
 * Retrieve a customer order by ProfileID
 */
exports.getCustomerOrderByProfileId = function (req, res, next, ProfileID) {
    // db.t_profile.findAll({where: {ProfileID: ProfileID}, include: [
    //     {model: db.t_customer_order}
    // ]})
    db.t_customer_order.findAll({ where: { ProfileID: ProfileID } })
    .then(function(result){
        return res.jsonp(result);
    })
    .catch(function(err){
        return res.render('error', {
            error: err,
            status: 500
        });
    });
};

/**
 * Create customer order
 */
exports.createCustomerOrder = function (req, res, next) {
    var message = null;
    var customerorder = {
        ProfileID: req.user,
        ProductDetailID: "",
        Quantity: "",
        Amount: "",
        Remarks: "",
        CreatedDate: Date.now(),
        CreatedBy: req.user,
        LastUpdatedDate: Date.now(),
        LastUpdatedBy: req.user
    };

    var customerOrderSave = db.t_customer_order.build(customerorder);
    req.body.CustomerOrderID = customerOrderSave.CustomerOrderID;

    customerorder.save().then(function () {
        return res.jsonp({
            "result": "success"
        });
    }).catch(function (err) {
        res.send({ status: 'Exception', message: err });
    });
};

/**
 * Update customer order
 */
exports.updateCustomerOrder = function (req, res) {
    var customerorder = req.customerorder;

    customerorder.updateAttributes({
        Quantity: "",
        Amount: "",
        LastUpdatedDate: Date.now(),
        LastUpdatedBy: req.user
    }).then(function (a) {
        return res.jsonp(a);
    }).catch(function (err) {
        return res.send({ status: 'Exception', message: err });
    });
};
//----------------------------------------End----------------------------------------