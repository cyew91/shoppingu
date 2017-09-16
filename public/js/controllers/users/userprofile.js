'use strict';

angular.module('mean.system')
  .controller('UserProfileController', ['$scope', 'Global', '$stateParams', function($scope, Global, $stateParams){
    $scope.global = Global;

    $scope.a = $stateParams.a;
    $scope.b = $stateParams.b;

  }]);
