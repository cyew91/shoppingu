'use strict';

angular.module('mean.system')
  .controller('IndexController', ['$scope', '$location', 'Global', function ($scope, $location, Global) {
      $scope.global = Global;

  }]);
