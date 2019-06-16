'use strict';

// Get travel by profile id in Account - My Trips
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

// Retrieve All Post Travel Information By postCountryId
angular.module('mean.articles').service("GetTravelByCountryId", ['$resource', function($resource) {
    return $resource('/posttravelcountry/:postCountryId', {postCountryId: '@postCountryId'});
}]);