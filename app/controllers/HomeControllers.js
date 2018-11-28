'use strict';

const db = require('../../config/sequelize');

/**
 * Use in home page Top Category
 */
exports.getProductIdByProdCatCode = function (req, res) {
   db.product_category.find({
      where: {
          product_category_code: req.params.productcategorycode
      }
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
 * Show a product
 */
exports.show = function (req, res) {
   return res.jsonp(req.product);
};
