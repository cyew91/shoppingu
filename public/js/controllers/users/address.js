'use strict';

angular.module('mean.system')
  .controller('AddressController', ['$scope', 'Global', '$stateParams', 'GetUser', function($scope, Global, $stateParams, GetUser){
    $scope.global = Global;
    $scope.profileId = $stateParams.profileId;

    $scope.a = $stateParams.a;
    $scope.b = $stateParams.b;

    $scope.findOne = function() {
      GetUser.get({
        profileId: $scope.profileId
      }, function(result) {
          //$scope.firstName = result.FirstName;
          //$scope.lastName = result.LastName;
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
  }]);
