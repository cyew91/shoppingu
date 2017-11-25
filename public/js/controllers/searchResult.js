'use strict';

angular.module('mean.articles')
  .controller('SearchResultController', ['$scope', 'Global', '$stateParams', '$state', 'GetProductResult', function($scope, Global, $stateParams, $state, GetProductResult){
    $scope.global = Global;
    $scope.profileId = $stateParams.profileId;
    $scope.product = $stateParams.productDetailID;
    //$scope.product = [{}];

    // $scope.searchResult = function() {
    //   GetProductResult.query({
    //     productDetailID: $scope.productDetailID
    //   }, function (result) {
    //     $scope.product = result;
    //   });
    // };

  }]);

