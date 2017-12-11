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

angular.module('mean.articles').service("GetProductResult", ['$resource', function($resource) {
    return $resource('/productDetail/:productDetailID', {productDetailID: '@productDetailID'});
}]);

angular.module('mean.articles').service("GetProductID", ['$resource', function($resource) {
    return $resource('/productdetail/productdetailname/:productdetailname', {productdetailname: '@productdetailname'});
}]);

angular.module('mean.articles').service("GetProductIDByProfileAndTravel", ['$resource', function($resource) {
    return $resource('/postproductdetail/:profileId/:travelId', {
        profileId: '@profileId',
        travelId: '@travelId'
    });
}]);

angular.module('mean.articles').service("GetProductDetail", ['$resource', function($resource) {
    return $resource('/productdetaillisting/:productId', {productId: '@productId'});
}]);

// angular.module('mean.auth').factory("Articles", ['$resource', function($resource) {
//     return $resource('profile/:profileId', {
//         profileId: '@profileId'
//     }, {
//         update: {method: 'PUT'}
//     });
// }]);