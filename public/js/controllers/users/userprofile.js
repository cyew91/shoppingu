'use strict';

angular.module('mean.articles')
  .controller('UserProfileController', ['$scope', 'Global', '$stateParams', '$state', 'GetUser', function($scope, Global, $stateParams, $state, GetUser){
    $scope.global = Global;
    $scope.profileId = $stateParams.profileId;

    $scope.a = $stateParams.a;
    $scope.b = $stateParams.b;

    $scope.abc = "Gary";
    console.log($scope.abc);

    $scope.findOne = function() {
      GetUser.get({
        profileId: $scope.profileId
      }, function(result) {
          //$scope.firstName = result.FirstName;
          //$scope.lastName = result.LastName;
          $scope.profile = result;
      });
    };
    
    $scope.updateProfile = function() {
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

  }]);

