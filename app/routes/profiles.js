'use strict';

/**
 * Module dependencies.
 */
var passport = require('passport');

module.exports = function (app) {
    // Profile Routes
    var profiles = require('../../app/controllers/profiles');

    app.get('/profiles/:profileId', profiles.show)

    // Setting up the profile api
    app.post('/profiles', profiles.create);

    app.param('profileId', profiles.getProfileId);
};