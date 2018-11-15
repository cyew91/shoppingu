'use strict';

const db = require('../../config/sequelize');

exports.show = function (req, res) {
    return res.jsonp(req.productCatId);
};

exports.getProductCat = function (req, res) {
    db.product_category.findAll({
        where: {
            is_active: 1
        }
    }).then(function (country) {
        return res.jsonp(country);
    }).catch(function (err) {
        return res.render('error', {
            error: err,
            status: 500
        });
    });
};

exports.getProdCatById = function (req, res, next, id) {
    db.product_category.find({
        where: {
            id: id,
            is_active: 1
        }
    }).then(function (productCat) {
        return res.jsonp(productCat);
    }).catch(function (err) {
        return next(err);
    });
};

exports.getSubProductCat = function (req, res) {
    db.product_sub_category.findAll({
        where: {
            is_active: 1
        }
    }).then(function (country) {
        return res.jsonp(country);
    }).catch(function (err) {
        return res.render('error', {
            error: err,
            status: 500
        });
    });
};

exports.getProductSubCatByProdCatId = function (req, res, next, product_category_id) {
    db.product_sub_category.findAll({
        where: {
            product_category_id: product_category_id,
            is_active: 1
        }
    }).then(function (productSubCat) {
        return res.jsonp(productSubCat);
    }).catch(function (err) {
        return next(err);
    });
};

/**
 * Use in search result site tree
 */
exports.getProductCatAndSubCat = function (req, res, next) {
    db.product_category.findAll({include: [
        {model: db.product_sub_category}
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
