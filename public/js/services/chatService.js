'use strict';

angular.module('mean').service('chat', ['$resource', function($resource){
    return $resource('/chat');
}]);