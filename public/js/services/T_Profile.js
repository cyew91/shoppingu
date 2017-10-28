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

angular.module('mean.auth').service('GetUser', ['$resource', function($resource) {
    return $resource('/profile/:profileId');
}]);

angular.module('mean.auth').factory("Articles", ['$resource', function($resource) {
    return $resource('/profile/:profileId', {
        profileId: '@profileId'
    }, {
        update: {
            method: 'PUT'
        }
    });
}]);