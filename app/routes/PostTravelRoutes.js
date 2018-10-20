'use strict';

var postTravel = require('../../app/controllers/PostTravelControllers');

module.exports = function (app) {

    app.route('/posttravel/:postTravelId')
    .get(postTravel.show)
    .put(postTravel.updatePostTravel);

    app.route('/posttravel/profileid/:profileId')
    .get(postTravel.show)

    app.route('/posttravel')
    .get(postTravel.getPostTravel)
    .post(postTravel.createPostTravel, postTravel.createPostTravelProduct);

    app.param('postTravelId', postTravel.getPostTravelById);
    app.param('profileId', postTravel.getPostTravelByProfileId);
};