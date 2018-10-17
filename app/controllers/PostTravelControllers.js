'use strict';
var db = require('../../config/sequelize');

//Retrieve All Post Travel Information
exports.getPostTravel = function (req, res) {
    db.post_travel.findAll()
        .then(function (postTravel) {
            return res.jsonp(postTravel);
        })
        .catch(function (err) {
            return res.render('error', {
                error: err,
                status: 500
            });
        });
};

//Retrieve All Post Travel Information By postTravelId
exports.getPostTravelById = function (req, res, next, id) {
    console.log('id => ' + id);
    db.post_travel.find({
        where: {
            id: id
        }
    }).then(function (postTravel) {
        if (!postTravel) {
            return next(new Error('Failed to load postTravelId ' + id));
        } else {
            req.postTravel = postTravel;
            return next();
        }
    }).catch(function (err) {
        return next(err);
    });
};

//Retrieve Post Travel Information By profileId
exports.getPostTravelByProfileId = function (req, res, next) {
    db.post_travel.findAll({ where: { profile_id: req.params.profileId }, include: [{model: db.country}] })
        .then(function (postTravel) {
            return res.jsonp(postTravel);
        })
        .catch(function (err) {
            return res.render('error', {
                error: err,
                status: 500
            });
        });
};

//Show Post Travel
exports.show = function (req, res) {
    return res.jsonp(req.postTravel);
};

//Create Post Travel
exports.createPostTravel = function (req, res, next) {
    var message = null;
    var postTravel = {
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        travelStatus: req.body.travelStatus,
        country_id: req.body.country_id,
        profile_id: req.body.profile_id
    };

    var postTravelSave = db.post_travel.build(postTravel);
    req.body.post_travel_id = postTravelSave.id;

    postTravelSave.save().then(function () {
        return res.jsonp({
            "result": "success"
        });
    }).catch(function (err) {
        res.send({ status: 'Exception', message: err });
    });
};

//Update Post Travel
exports.updatePostTravel = function (req, res) {

    // create a new variable to hold the article that was placed on the req object.
    var postTravel = req.postTravel;

    postTravel.updateAttributes({
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        travelStatus: req.body.travelStatus
    }).then(function (a) {
        return res.jsonp({
            "result": "success"
        });
    }).catch(function (err) {
        return res.send({ status: 'Exception', message: err });
    });
};

//----------------------------------------End----------------------------------------
