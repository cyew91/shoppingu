'use strict';

angular.module('mean.system')
  .controller('PostController', ['$scope', 'Global', '$stateParams', function($scope, Global, $stateParams){
    $scope.global = Global;

    $scope.a = $stateParams.a;
    $scope.b = $stateParams.b;
  }]);
