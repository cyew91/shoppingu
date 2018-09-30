'use strict';


angular.module('mean.articles').service("GetTravelByProfileId", ['$resource', function($resource) {
    return $resource('/posttravel/profileid/:profileId', {profileId: '@profileId'});
}]);
