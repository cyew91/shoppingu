'use strict';

angular.module('mean.system')
  .controller('AddressController', ['$scope', 'Global', '$stateParams', '$rootScope', '$state', 'GetUserAddressById', function($scope, Global, $stateParams, $rootScope, $state, GetUserAddressById){
    $scope.global = Global;
    $scope.profileId = $stateParams.profileId;
    $scope.profile = $stateParams.profile;

    if (angular.isUndefined($stateParams.profile) || $stateParams.profile == ""){
      $state.go('userprofile');
    }

    $scope.initAddress = function() {
      GetUserAddressById.get({
        id: $rootScope.currentUser.id
      }, function(result) {
          $scope.profile = result;
      });
    };

    $scope.updateAddress = function() {
        var profile = $scope.profile;
        if (!profile.updated) {
            profile.updated = [];
        }
        profile.updated.push(new Date().getTime());
        //profile.$update(function() {
          //$state.go('home');
        profile.$update();
        //});
    };

    $scope.goToMyOrder = function () {
      $state.go('order', {profile: $scope.profile});
    };

    $scope.goToMyRequest = function () {
      $state.go('request', {profile: $scope.profile});
    };

    $scope.goToMyProfile = function () {
      $state.go('userprofile');
    };

    $scope.goToMyPost = function () {
      $state.go('post', {profile: $scope.profile});
    };

    // $scope.findOne = function() {
    //   GetUser.get({
    //     profileId: $scope.global.user.ProfileID
    //   }, function(result) {
    //       $scope.profile = result;
    //   });
    // };

    // $scope.updateAddress = function() {
    //   var profile = $scope.profile;
    //   if (!profile.updated) {
    //       profile.updated = [];
    //   }
    //   profile.updated.push(new Date().getTime());
      //profile.$update(function() {
        //$state.go('home');
      // profile.$update();
      //});
    // };
  }]);
