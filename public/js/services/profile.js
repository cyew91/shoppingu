'use strict';

//Articles service used for articles REST endpoint
// angular.module('mean.auth').factory("Articles", ['$resource', function($resource) {
//     return $resource('articles/:articleId', {
//         articleId: '@id'
//     }, {
//         update: {
//             method: 'PUT'
//         }
//     });
// }]);

angular.module('mean.articles').service('GetUser', ['$resource', function($resource) {
    return $resource('profile/:profileId', {
        profileId: '@ProfileID'
    }, {
        update: {method: 'PUT'}
    });
}]);

// angular.module('mean.auth').factory("Articles", ['$resource', function($resource) {
//     return $resource('profile/:profileId', {
//         profileId: '@profileId'
//     }, {
//         update: {method: 'PUT'}
//     });
// }]);