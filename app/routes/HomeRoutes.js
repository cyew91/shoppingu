'use strict';

var home = require('../controllers/HomeControllers');

module.exports = (app) => {
   app.route('/home/topcategories')
      .get(home.getTopCategories);
};