'use strict';

angular.module('mean.articles')
  .controller('PostController', ['$scope', 'Global', '$stateParams', '$state', 'GetTravel', 'GetProductIDByProfileAndTravel', 'GetProductDetail', '$rootScope', function($scope, Global, $stateParams, $state, GetTravel, GetProductIDByProfileAndTravel, GetProductDetail, $rootScope){
    $scope.global = Global;
    $scope.profileId = $rootScope.currentUser.ProfileID;

    $scope.getTrip = function() {
      GetTravel.query({
        tprofileId: $scope.profileId
      },function(result) {
          $scope.travel = result;
      });
    };

    $scope.getProductId = function(travelId) {
      GetProductIDByProfileAndTravel.get({
        profileId: $scope.profileId,
        travelId: travelId
      },function(result) {
        $scope.ProdId = result.ProductID;
        $state.go('postProductDetail', { productID: result.ProductID });
      });
    };

    $scope.getProductDetailResult = function(){
      GetProductDetail.query({
        productId: $scope.ProdId
      }, function (result){
        $scope.productDetail = result;
        $state.go('postProductDetail', { productID: $scope.productDetail });
      });
    };

  }]);

