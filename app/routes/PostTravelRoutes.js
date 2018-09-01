'use strict';

var postTravel = require('../../app/controllers/PostTravelControllers');

module.exports = function (app) {
    // User Profile Routes
    app.route('/posttravel/:postTravelId')
    .get(postTravel.show)
    .put(postTravel.updatePostTravel);

    app.route('/posttravel/profileid/:profileId')
    .get(postTravel.show)

    app.route('/posttravel')
    .get(postTravel.getPostTravel)
    .post(postTravel.createPostTravel);

    app.param('postTravelId', postTravel.getPostTravelById);
    app.param('profileId', postTravel.getPostTravelByProfileId);
};