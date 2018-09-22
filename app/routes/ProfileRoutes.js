'use strict';

/**
 * Module dependencies.
 */
var profiles = require('../../app/controllers/ProfileControllers');

module.exports = function (app) {
    // User Profile Routes
    app.route('/profile/:profileId')
    .get(profiles.show)
    .put(profiles.updateProfile, profiles.updateAddress);

    app.route('/profile')
    .post(profiles.create);

    app.param('profileId', profiles.getProfileById);
};