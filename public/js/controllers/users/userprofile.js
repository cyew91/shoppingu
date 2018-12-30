'use strict';

angular.module('mean.articles')
  .controller('UserProfileController', ['$scope', 'Global', '$stateParams', '$state', 'GetUserProfileById', '$rootScope', 'fileReader', '$window', function($scope, Global, $stateParams, $state, GetUserProfileById, $rootScope, fileReader, $window){
    $scope.global = Global;
    var userId = $window.sessionStorage.getItem("id");

    $scope.initUserProfie = function() {
      GetUserProfileById.get({
        // profileId: $scope.profileId
        id: userId
      }, function(result) {
          $scope.profile = result;
          $scope.lastName = $scope.profile.lastName;
          $scope.firstName = $scope.profile.firstName;
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

    $scope.goToMyOrder = function () {
      $state.go('order', {profile: $scope.profile});
    };

    $scope.goToMyRequest = function () {
      $state.go('request', {profile: $scope.profile});
    };

    $scope.goToMyAddress = function () {
      $state.go('address', {profile: $scope.profile});
    };

    $scope.goToMyPost = function () {
      $state.go('post', {profile: $scope.profile});
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

