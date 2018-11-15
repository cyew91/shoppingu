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

// angular.module('mean.articles').service("GetProductResult", ['$resource', function($resource) {
//     return $resource('/productDetail/:productDetailID', {productDetailID: '@productDetailID'});
// }]);

//Use in search result page (travel)
angular.module('mean.articles').service("GetProductID", ['$resource', function($resource) {
    return $resource('/productdetail/productdetailname/:productdetailname', {productdetailname: '@productdetailname'});
}]);

// angular.module('mean.articles').service("GetProductIDByProfileAndTravel", ['$resource', function($resource) {
//     return $resource('/postproductdetail/:profileId/:travelId', {
//         profileId: '@profileId',
//         travelId: '@travelId'
//     });
// }]);

// angular.module('mean.articles').service("GetProductDetail", ['$resource', function($resource) {
//     return $resource('/productdetaillisting/:productId', {productId: '@productId'});
// }]);

//Use in search result site tree click on sub category
angular.module('mean.articles').service("GetProductDetailByProdSubCatID", ['$resource', function($resource) {
    return $resource('/productdetail/productsubcatid/:productSubCatId', {productSubCatId: '@productSubCatId'});
}]);

// angular.module('mean.articles').service('GetOrderByProfileId', ['$resource', function($resource){
//     return $resource('/custorderwithproduct/:cprofileId', {cprofileId: '@cprofileId'});
// }]);

// New service after revamp
//Use in search result site tree 
angular.module('mean.articles').service('GetProdCatAndSubCat', ['$resource', function($resource){
    return $resource('/productcatandsubcat');
}]);

angular.module('mean.articles').service('CreatePost', ['$resource', function($resource){
    return $resource('/posttravel');
}]);