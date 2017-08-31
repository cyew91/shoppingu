'use strict';

angular.module('mean.system')
  .controller('IndexController', ['$scope', '$location', 'Global', function ($scope, $location, Global) {
      $scope.global = Global;

      $scope.productImg1 = "img/Gary.jpg";
      $scope.productImg2 = "img/Gary.jpg";
      $scope.productImg3 = "img/Gary.jpg";

  }]);
