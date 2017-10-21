'use strict';

/**
 * Module dependencies.
 */
var StandardError = require('standard-error');
var db = require('../../config/sequelize');

/**
 * Find article by id
 * Note: This is called every time that the parameter :articleId is used in a URL. 
 * Its purpose is to preload the article on the req object then call the next function. 
 */
exports.T_Profile = function(req, res, next, ProfileID) {
    console.log('ProfileID => ' + ProfileID);
    db.T_Profile.find({where: {ProfileID: ProfileID}, }).then(function(T_Profile){
        if(!T_Profile) {
            return next(new Error('Failed to load Profile ' + ProfileID));
        } else {
            req.T_Profile = T_Profile;
            return next();            
        }
    }).catch(function(err){
        return next(err);
    });
};


