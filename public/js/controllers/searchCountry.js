'use strict';

angular.module('mean.articles')
  .controller('SearchCountryController', ['$scope', 'Global', '$stateParams', '$state', function($scope, Global, $stateParams, $state){
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

