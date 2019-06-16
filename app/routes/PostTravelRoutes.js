'use strict';

var postTravel = require('../../app/controllers/PostTravelControllers');

module.exports = function (app) {

    // Retrieve All Post Travel Information By postTravelId
    app.route('/posttravel/:postTravelId')
    .get(postTravel.show)
    .put(postTravel.updatePostTravel);
    app.param('postTravelId', postTravel.getPostTravelById);

    // // Get travel by profile id in Account - My Trips
    app.param('profileId', postTravel.getPostTravelByProfileId);
    app.route('/posttravel/profileid/:profileId')
    .get(postTravel.show);

    app.route('/posttravel')
    .get(postTravel.getPostTravel)
    .post(postTravel.createPostTravel, postTravel.createPostTravelProduct);

    // Get product request country in product details page
    app.route('/posttravelcountry/:postCountryId')
    .get(postTravel.show);
    app.param('postCountryId', postTravel.getPostRequestTravelByCountryId);

    //Get country list in post travel page
    app.get('/country', postTravel.all);
};