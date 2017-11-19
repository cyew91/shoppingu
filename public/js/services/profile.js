'use strict';

angular.module('mean.articles').service('GetUser', ['$resource', function ($resource) {
    return $resource('profile/:profileId', {
        profileId: '@ProfileID'
    }, {
        update: {
            method: 'PUT'
        }
    });
}]);