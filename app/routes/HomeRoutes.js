'use strict';

var home = require('../controllers/HomeControllers');

module.exports = function (app) {

   //Get Product By Product Name
   app.route('/productcategory/:productcategorycode') //Use in search result page
   .get(home.show);

   //Param
   //Use in search result page
   app.param('productcategorycode', home.getProductIdByProdCatCode); 

};