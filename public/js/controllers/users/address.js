'use strict';

angular.module('mean.system')
  .controller('AddressController', ['$scope', 'Global', '$stateParams', 'GetUserAddressById', function($scope, Global, $stateParams, GetUserAddressById){
    $scope.global = Global;
    $scope.profileId = $stateParams.profileId;

    $scope.a = $stateParams.a;
    $scope.b = $stateParams.b;

    $scope.initAddress = function() {
      GetUserAddressById.get({
        id: "0fc62662-2078-4b56-b753-4b72e557cc62"
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
