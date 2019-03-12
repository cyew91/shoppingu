'use strict';

angular.module('mean.articles')
  .controller('PostController', ['$scope', '$stateParams', '$state', '$timeout', 'GetTravelByProfileId', 'GetTravelByTravelId', '$window', 'GetTravelProductByTravelId', function ($scope, $stateParams, $state, $timeout, GetTravelByProfileId, GetTravelByTravelId, $window, GetTravelProductByTravelId) {
    $scope.profile = $stateParams.profile;
    $scope.userId = $window.sessionStorage.getItem("id");
    
    const TRAVELSTATUS = {
      pending: "Pending",
      ongoing: "On Going",
      expire: "Expired",
      cancel: "Cancelled"
    };

    $scope.checkTripStatus = function (trips) {
      // Check trip status
      // 1. date now < start date = pending
      // 2. date now between start date and end date = on going
      // 3. date now > end date = expired

      var currentDate = new Date();

      for (var i = 0; i < trips.length; i++) { 
        var tripStartDate = new Date(trips[i].startDate);
        var tripEndDate = new Date(trips[i].endDate);

        if (currentDate < tripStartDate) {
          trips[i].travelStatus = TRAVELSTATUS.pending;
          trips[i].travelStatusClass = "text-warning";
        } else if (currentDate >= tripStartDate && currentDate <= tripEndDate) {
          trips[i].travelStatus = TRAVELSTATUS.ongoing;
          trips[i].travelStatusClass = "text-info";
        } else if (currentDate > tripEndDate) {
          trips[i].travelStatus = TRAVELSTATUS.expire;
          trips[i].travelStatusClass = "text-danger";
        }
      }

      return trips;
    };

    if (angular.isUndefined($scope.profile) || $scope.profile === "") {
      $state.go('userprofile');
    } else {
      $scope.initMyTrips = function () {
        GetTravelByProfileId.query({
          profileId: $scope.userId
        }, function (result) {
          $scope.travel = $scope.checkTripStatus(result);
        });
      };
    }

    $scope.getTravelProduct = function (index) {
      GetTravelProductByTravelId.query({
        postTravelId: $scope.travel[index].id
      }, function (result) {
        $scope.travelProduct = result;
        for (var i = 0; i < result.length; i++) {
          $scope.travelProduct[i].imageName = result[i].post_travel_product_documents[0].imageName;
        }
        $scope.countryName = $scope.travel[index].country.countryName;
      });
    };

    $scope.deletePost = function (index) {
      var postTravel = $scope.travel[index];
      postTravel.postTravelId = postTravel.id;
      postTravel.travelStatus = TRAVELSTATUS.cancel;

      GetTravelByTravelId.update(postTravel);

      $timeout( function(){
        $scope.initMyTrips();
      }, 500);

    };

    $scope.goToMyOrder = function () {
      $state.go('order', {
        profile: $scope.profile
      });
    };

    $scope.goToMyRequest = function () {
      $state.go('request', {
        profile: $scope.profile
      });
    };

    $scope.goToMyAddress = function () {
      $state.go('address', {
        profile: $scope.profile
      });
    };

    $scope.goToMyProfile = function () {
      $state.go('userprofile');
    };
  }]);