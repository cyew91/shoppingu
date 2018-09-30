'use strict';

angular.module('mean.articles')
  .controller('UserProfileController', ['$scope', 'Global', '$stateParams', '$state', 'GetUserProfileById', '$rootScope', 'fileReader', function($scope, Global, $stateParams, $state, GetUserProfileById, $rootScope, fileReader){
    $scope.global = Global;
    // $scope.profileId = $stateParams.profileId;
    // $scope.profileId = $rootScope.currentUser.ProfileID;

    $scope.initUserProfie = function() {
      GetUserProfileById.get({
        // profileId: $scope.profileId
        id: "0fc62662-2078-4b56-b753-4b72e557cc62"
      }, function(result) {
          $scope.profile = result;
          $scope.lastName = $scope.profile.lastName;
          $scope.firstName = $scope.profile.firstName;
          // if ($scope.profile.Gender == 0){
          //   $scope.checkFemale = "active";
          //   $scope.checkMale = "inactive";
          // }
          // else{
          //   $scope.checkMale = "active";
          //   $scope.checkFemale = "inactive";
          // }

      });
    };

    $scope.updateUserProfile = function() {
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

    // $scope.updateUserProfilePicture = function() {
    //   var profile = $scope.profile;
    //   if (!profile.updated) {
    //       profile.updated = [];
    //   }
    //   profile.updated.push(new Date().getTime());
    //   //profile.$update(function() {
    //     //$state.go('home');
    //   profile.$update();
    //   //});
    // };

    

    // $scope.$on("fileProgress", function(e, progress) {
    //   $scope.progress = progress.loaded / progress.total;
    // });

    // $scope.accountMenu = [{accId: 'a1',accName: 'Profiles'}, {accId: 'a2',accName: 'Addresses'}];

    // $('.input-daterange').datepicker({
    //   autoclose: true,
    //   keepEmptyValues: true,
    //   format: 'dd-mm-yyyy',
    //   clearBtn: true
    // });

    // $('#datepickerFrom').on('changeDate', function() {
    //   $scope.productObj.startDate = $('#datepickerFrom').datepicker('getFormattedDate');
    // });

    // $scope.updateProfile = function() {
    //   var profile = $scope.profile;
    //   if (!profile.updated) {
    //       profile.updated = [];
    //   }
    //   profile.updated.push(new Date().getTime());
    //   //profile.$update(function() {
    //     //$state.go('home');
    //   profile.$update();
    //   //});
    // };

    

  }]);

