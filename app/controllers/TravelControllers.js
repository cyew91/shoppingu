'use strict';

// const db = require('../../config/sequelize');

// exports.allTravel = function(req, res, next, ProfileID){
//     db.t_travel.findAll({
//         where: {
//             ProfileID: ProfileID
//         }, include: [{model: db.t_country}
//         ]})
//     .then(function(travel){
//         return res.jsonp(travel);
//     })
//     .catch(function(err){
//         return res.render('error', {
//             error: err,
//             status: 500
//         });
//     });
// };

// exports.show = function (req, res) {
//     return res.jsonp(req.travel);
// };
