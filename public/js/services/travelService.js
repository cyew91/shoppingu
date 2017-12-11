'use strict';


angular.module('mean.articles').service("GetTravel", ['$resource', function($resource) {
    return $resource('/travel/:tprofileId', {tprofileId: '@tprofileId'});
}]);
