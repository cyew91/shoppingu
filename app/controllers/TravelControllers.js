'use strict';

const db = require('../../config/sequelize');

exports.allTravel = function(req, res){
    db.t_travel.findAll()
    .then(function(travel){
        return res.jsonp(travel);
    })
    .catch(function(err){
        return res.render('error', {
            error: err,
            status: 500
        })
    });
};