'use strict';

angular.module('mean').service('GetTravel', ['$resource', function($resource){
    return $resource('/travel');
}]);