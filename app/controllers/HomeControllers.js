'use strict';

const db = require('../../config/sequelize');
const sequelize = require('sequelize');

exports.getTopCategories = (req, res) => {
   db.post_travel_product.findAll({
      raw: true,
      attributes: ['product_category_id', 
         [sequelize.fn('COUNT', 'product_category_id'), 'row_count']],
      include: [{
         model: db.product_category,
         attributes: ['product_category_code', 'product_category_name']
      }],
      group: ['product_category_id'],
      order: sequelize.literal('row_count DESC'),
      limit: 3
   })
   .then( (result) => {
      return res.jsonp(result);
   })
   .catch( (err) => {
      return res.render('error', {
         error: err,
         status: 500
     });
   });
};