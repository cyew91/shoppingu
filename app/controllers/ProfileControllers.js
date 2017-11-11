'use strict';

/**
 * Module dependencies.
 */
var db = require('../../config/sequelize'),
    config = require('../../config/config');
var bcrypt = require('bcrypt');
const saltRounds = 10;

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

// Update Profile
exports.updateProfile = function(req, res) {
    
    // create a new variable to hold the article that was placed on the req object.
    var profile = req.profile;

    profile.updateAttributes({
        FirstName: req.body.FirstName,
        LastName: req.body.LastName,
        Email: req.body.Email,
        ContactNo: req.body.ContactNo,
        Gender: req.body.Gender,
        DOB: req.body.DOB
    }).then(function(a){
        return res.jsonp(a);
    }).catch(function(err){
        return res.send({status: 'Exception', message: err});
    });
};

exports.updateAddress = function(req, res) {
    
    // create a new variable to hold the article that was placed on the req object.
    var profile = req.profile;

    profile.updateAttributes({
        Address: req.body.Address
    }).then(function(a){
        return res.jsonp(a);
    }).catch(function(err){
        return res.send({status: 'Exception', message: err});
    });
};

/**
 * Create profile account
 */
exports.createProfileAccount = function (req, res, next) {
    var message = null;
    var profileAccount = db.T_Profile_Account.build(req.body);

    profileAccount.save().then(function () {
        return res.jsonp({
            "result": "success"
        });
    }).catch(function (err) {
        res.send({status: 'Exception', message: err})
    });
};

exports.getProfileAccount= function(req, res, next, ProfileAccountID) {
    console.log('id => ' + ProfileAccountID); 
    db.T_Profile_Account.find({where: {ProfileAccountID: ProfileAccountID}}).then(function(profileAccount){
        if(!profileAccount) {
            return next(new Error('Failed to load ProfileAccountID ' + ProfileAccountID));
        } else {
            req.profileAccount = profileAccount;
            return next();            
        }
    }).catch(function(err){
        return next(err);
    });
};

/**
 * Show a profile account
 */
exports.showProfileAccount = function(req, res) {
    return res.jsonp(req.profileAccount);
};