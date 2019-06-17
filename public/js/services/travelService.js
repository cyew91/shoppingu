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

// Trigger when page refresh
angular.module('mean.auth')
.factory('beforeUnload', function ($rootScope, $window) {
    // Events are broadcast outside the Scope Lifecycle
    
    $window.onbeforeunload = function (e) {
        var confirmation = {};
        var event = $rootScope.$broadcast('onBeforeUnload', confirmation);
        if (event.defaultPrevented) {
            return confirmation.message;
        }
    };
    
    $window.onunload = function () {
        $rootScope.$broadcast('onUnload');
    };
    return {};
})
.run(function (beforeUnload) {
    // Must invoke the service at least once
});