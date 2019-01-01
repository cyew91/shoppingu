'use strict';

angular.module('mean.system')
  .controller('RequestController', ['$scope', 'Global', '$stateParams', '$state', function($scope, Global, $stateParams, $state){
    // $scope.global = Global;
    $scope.profile = $stateParams.profile;

    if (angular.isUndefined($stateParams.profile) || $stateParams.profile == ""){
      $state.go('userprofile');
    }
    
    $scope.goToMyOrder = function () {
      $state.go('order', {profile: $scope.profile});
    };

    $scope.goToMyProfile = function () {
      $state.go('userprofile');
    };

    $scope.goToMyAddress = function () {
      $state.go('address', {profile: $scope.profile});
    };

    $scope.goToMyPost = function () {
      $state.go('post', {profile: $scope.profile});
    };

  }]);
