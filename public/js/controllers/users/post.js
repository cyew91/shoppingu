'use strict';

angular.module('mean.articles')
  .controller('PostController', ['$scope', 'Global', '$stateParams', '$state', 'GetTravelByProfileId', '$window', 'GetTravelProductByTravelId', function($scope, Global, $stateParams, $state, GetTravelByProfileId, $window, GetTravelProductByTravelId){
    $scope.global = Global;
    var userId = $window.sessionStorage.getItem("id");
    $scope.profile = $stateParams.profile;

    if (angular.isUndefined($stateParams.profile) || $stateParams.profile == ""){
      $state.go('userprofile');
    }
    else{
      $scope.initMyTrips = function() {
        GetTravelByProfileId.query({
          profileId: userId
        },function(result) {
            $scope.travel = result;
        });
      };
    }

    $scope.getTravelProduct = function(index) {
      GetTravelProductByTravelId.query({
        postTravelId: $scope.travel[index].id
      },function(result) {
          $scope.travelProduct = result;
          for (var i=0;i<result.length;i++){
              $scope.travelProduct[i].imageName = result[i].post_travel_product_documents[0].imageName;
          }
          $scope.countryName = $scope.travel[index].country.countryName;
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

