'use strict';

angular.module('mean.articles')
  .controller('PostController', ['$scope', 'Global', '$stateParams', '$state', 'GetTravelByProfileId', '$window', function($scope, Global, $stateParams, $state, GetTravelByProfileId, $window){
    $scope.global = Global;
    // $scope.profileId = $rootScope.currentUser.ProfileID;
    var userId = $window.sessionStorage.getItem("id");
    $scope.profile = $stateParams.profile;

    if (angular.isUndefined($stateParams.profile) || $stateParams.profile == ""){
      $state.go('userprofile');
    }

    $scope.initMyTrips = function() {
      GetTravelByProfileId.query({
        // tprofileId: $scope.profileId
        profileId: userId
      },function(result) {
          $scope.travel = result;
      });
    };

    
    $scope.goToMyOrder = function () {
      $state.go('order', {profile: $scope.profile});
    };

    $scope.goToMyRequest = function () {
      $state.go('request', {profile: $scope.profile});
    };

    $scope.goToMyAddress = function () {
      $state.go('address', {profile: $scope.profile});
    };

    $scope.goToMyProfile = function () {
      $state.go('userprofile');
    };

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

