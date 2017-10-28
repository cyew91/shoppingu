'use strict';

/**
 * Module dependencies.
 */
var db = require('../../config/sequelize'),
    config = require('../../config/config');

/**
 * Find profile by id
 * Note: This is called every time that the parameter :profileId is used in a URL. 
 * Its purpose is to preload the profile on the req object then call the next function. 
 */
exports.getProfileId = function(req, res, next, ProfileID) {
    console.log('id => ' + ProfileID);
    db.T_Profile.find({where: {ProfileID: ProfileID}}).then(function(profile){
        if(!profile) {
            return next(new Error('Failed to load ProfileId ' + ProfileID));
        } else {
            req.profile = profile;
            return next();            
        }
    }).catch(function(err){
        return next(err);
    });
};

/**
 * Show a profile
 */
exports.show = function(req, res) {
    // Sending down the profile that was just preloaded by the profiles.getProfileId function
    // and saves profile on the req object.
    return res.jsonp(req.profile);
};

/**
 * Create profile
 */
exports.create = function (req, res, next) {
    var message = null;
    var profile = db.T_Profile.build(req.body);

    profile.save().then(function () {
        return res.jsonp({
            "result": "success"
        });
    }).catch(function (err) {
        res.send({status: 'Exception', message: err})
    });
};