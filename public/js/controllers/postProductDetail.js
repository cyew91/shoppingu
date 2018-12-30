'use strict';

angular.module('mean.articles')
  .controller('PostProductDetailController', ['$scope', 'Global', '$stateParams', '$state', function($scope, Global, $stateParams, $state){
    $scope.global = Global;
    //$scope.profileId = $stateParams.profileId;
    $scope.productId = $stateParams.productID;
    //$scope.profile = $stateParams.ProfileID;
    //$scope.tripDate = $stateParams.TravelStartDate;

    // $scope.getProductDetailResult = function(){
    //   GetProductDetail.query({
    //     productId: $scope.productId
    //   }, function (result){
    //     $scope.productDetail = result;
    //     //$state.go('postProductDetail', { productID: $scope.productDetail });
    //   });
    // };
    $scope.open = function () {
      //$scope.seletedProduct = product;
      //console.log($scope.seletedProduct);
      //$('#modal-product').modal('show');
      $state.go('editProductDetail');
    };
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

