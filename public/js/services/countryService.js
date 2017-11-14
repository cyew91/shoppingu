'use strict';

angular.module('mean').service('GetCountryList', ['$resource', function($resource){
    return $resource('/country');
}]);