'use strict';

// const db = require('../../config/sequelize');

// //No use - moved to PostTravelController.js
// exports.all = function(req, res){
//     db.country.findAll({
//         where: {
//             is_active: 1
//         }
//     })
//     .then(function(country){
//         return res.jsonp(country);
//     })
//     .catch(function(err){
//         return res.render('error', {
//             error: err,
//             status: 500
//         });
//     });
// };