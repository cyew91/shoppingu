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

// Use in home page view product
angular.module('mean.articles').service('GetProdIdByProdCatCode', ['$resource', function($resource){
    return $resource('/productcategory/:productcategorycode', {productcategorycode: '@productcategorycode'});
}]);

// Use in search result after view product - Top Category, Header Category
angular.module('mean.articles').service('GetProdDetailByProdCatCode', ['$resource', function($resource){
    return $resource('/productdetail/productcategoryid/:productcategoryid', {productcategoryid: '@productcategoryid'});
}]);

// Get features product in home page
angular.module('mean.articles').service('GetAllTravelProduct', ['$resource', function($resource){
    return $resource('/posttravelproduct');
}]);

// Get posted product in Account - My Trips
angular.module('mean.articles').service('GetTravelProductByTravelId', ['$resource', function($resource){
    return $resource('/posttravelproduct/:postTravelId');
}]);


