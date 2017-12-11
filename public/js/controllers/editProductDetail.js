'use strict';

angular.module('mean.articles')
  .controller('EditProductDetailController', ['$scope', 'Global', '$stateParams', '$state', function($scope, Global, $stateParams, $state){
    $scope.global = Global;
    //$scope.profileId = $stateParams.profileId;
    //$scope.productId = $stateParams.productID;
    //$scope.profile = $stateParams.ProfileID;
    //$scope.tripDate = $stateParams.TravelStartDate;


    // $scope.searchResult = function() {
    //   GetProductResult.query({
    //     productDetailID: $scope.productDetailID
    //   }, function (result) {
    //     $scope.product = result;
    //   });
    // };

    // $scope.getProductDetailResult = function(){
    //   GetProductDetail.query({
    //     ProductID: 'd778710e-d739-11e7-8fce-8086f20f4c17'
    //   }, function (result){
    //     $scope.productDetail = result;
    //   });
    // };

  }]);

