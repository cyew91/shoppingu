'use strict';

/**
 * Module dependencies.
 */
var profiles = require('../../app/controllers/ProfileControllers');

module.exports = function (app) {
    // User Profile Routes
    app.route('/profile/:id')
    .get(profiles.show)
    .put(profiles.updateProfile);

    app.route('/address/:id')
    .get(profiles.show)
    .put(profiles.updateAddress);

    // app.route('/profilepicture/:id')
    // .get(profiles.show)
    // .put(profiles.updateProfilePictureById);

    app.route('/profile')
    .post(profiles.create);

    app.param('id', profiles.getProfileById);
};