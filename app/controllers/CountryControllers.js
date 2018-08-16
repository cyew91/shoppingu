'use strict';

const db = require('../../config/sequelize');

exports.all = function(req, res){
    db.t_country.findAll()
    .then(function(country){
        return res.jsonp(country);
    })
    .catch(function(err){
        return res.render('error', {
            error: err,
            status: 500
        });
    });
};