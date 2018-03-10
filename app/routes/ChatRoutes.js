'use strict';

/**
 * Module dependencies.
 */
var chat = require('../../app/controllers/ChatControllers');

module.exports = function (app) {
    // User Profile Routes
    // app.route('/profile/:profileId')
    // .get(chat.show)
    // .put(chat.updateProfile, profiles.updateAddress);

    app.route('/chat')
    .post(chat.createChat);

    // app.param('profileId', profiles.getProfileId);
};