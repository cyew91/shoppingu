'use strict';

const db = require('../../config/sequelize');

/**
 * Show a product
 */
exports.show = function (req, res) {
    return res.jsonp(req.product);
};

/**
 * Use in search result page
 */
exports.getProductDetailByProdName = function (req, res, next, ProductName) {
    db.post_travel_product.findAll({
            where: {
                product_name: {
                    $like: '%' + ProductName + '%'
                }
            },
            include: [
                // {model: db.t_product, where: {PostType: 0}}
                {
                    model: db.post_travel_product_document
                }
            ]
        })
        .then(function (result) {
            return res.jsonp(result);
        })
        .catch(function (err) {
            return res.render('error', {
                error: err,
                status: 500
            });
        });
};

/**
 * Use in search result site tree click on sub category
 */
exports.getProductDetailByProdSubCatID = function (req, res, next) {
    db.post_travel_product.findAll({
            where: {
                product_sub_category_id: req.params.productSubCatId
            },
            include: [{
                    model: db.post_travel_product_document
                }
            ]
        })
        .then(function (result) {
            return res.jsonp(result);
        })
        .catch(function (err) {
            return res.render('error', {
                error: err,
                status: 500
            });
        });
};

/**
 * Use in search result after view product - Top Category, Header Category
 */
exports.getProductDetailByProdCatCode = function (req, res) {
    db.post_travel_product.findAll({
            where: {
                product_category_id: req.params.productcategoryid
            },
            include: [
                {
                    model: db.post_travel_product_document
                }
            ]
        })
        .then(function (result) {
            return res.jsonp(result);
        })
        .catch(function (err) {
            return res.render('error', {
                error: err,
                status: 500
            });
        });
};