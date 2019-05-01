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

    app.route('/forgetpassword/:email')
    .get(profiles.triggerForgetPasswordEmail)

    app.route('/resetpassword/:token')
    .get(profiles.show)
    .put(profiles.resetPassword)

    // app.route('/profilepicture/:id')
    // .get(profiles.show)
    // .put(profiles.updateProfilePictureById);

    app.route('/profile')
    .post(profiles.create);

    app.param('id', profiles.getProfileById);
    app.param('email', profiles.getProfileByEmail);
    app.param('token', profiles.getProfileByToken);
};