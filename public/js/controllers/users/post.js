'use strict';

angular.module('mean.articles')
  .controller('PostController', ['$scope', 'Global', '$stateParams', '$state', 'GetTravelByProfileId', 'GetProductIDByProfileAndTravel', 'GetProductDetail', '$rootScope', '$window', function($scope, Global, $stateParams, $state, GetTravelByProfileId, GetProductIDByProfileAndTravel, GetProductDetail, $rootScope, $window){
    $scope.global = Global;
    // $scope.profileId = $rootScope.currentUser.ProfileID;
    var userId = $window.sessionStorage.getItem("id");

    $scope.initMyTrips = function() {
      GetTravelByProfileId.query({
        // tprofileId: $scope.profileId
        profileId: userId
      },function(result) {
          $scope.travel = result;
      });
    };


    // $scope.getTrip = function() {
    //   GetTravel.query({
    //     tprofileId: $scope.profileId
    //   },function(result) {
    //       $scope.travel = result;
    //   });
    // };

    // $scope.getProductId = function(travelId) {
    //   GetProductIDByProfileAndTravel.get({
    //     profileId: $scope.profileId,
    //     travelId: travelId
    //   },function(result) {
    //     $scope.ProdId = result.ProductID;
    //     $state.go('postProductDetail', { productID: result.ProductID });
    //   });
    // };

    // $scope.getProductDetailResult = function(){
    //   GetProductDetail.query({
    //     productId: $scope.ProdId
    //   }, function (result){
    //     $scope.productDetail = result;
    //     $state.go('postProductDetail', { productID: $scope.productDetail });
    //   });
    // };

  }]);

