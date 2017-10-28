'use strict';

/**
 * Module dependencies.
 */
var passport = require('passport');

module.exports = function (app) {
    // Profile Routes
    var profiles = require('../../app/controllers/ProfileControllers');

    app.get('/profile/:profileId', profiles.show)

    // Setting up the profile api
    app.post('/profile', profiles.create);

    app.param('profileId', profiles.getProfileId);
};