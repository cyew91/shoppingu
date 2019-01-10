'use strict';


angular.module('mean.articles').service("GetTravelByProfileId", ['$resource', function($resource) {
    return $resource('/posttravel/profileid/:profileId', {profileId: '@profileId'});
}]);

// Retrieve All Post Travel Information By postTravelId
angular.module('mean.articles').service("GetTravelByTravelId", ['$resource', function($resource) {
    return $resource('/posttravel/:postTravelId', {
        postTravelId: '@postTravelId'
    }, {
        update: {
            method: 'PUT'
        }
    });
}]);