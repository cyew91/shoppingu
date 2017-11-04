'use strict';

angular.module('mean.system')
  .controller('IndexController', ['$scope', '$location', 'Global', function ($scope, $location, Global) {
      $scope.global = Global;

      $scope.productImg1 = "img/womenshirt.jpg";
      $scope.productImg2 = "img/shoes.jpg";
      $scope.productImg3 = "img/shirt.jpg";

      $('.carousel').carousel();
      
  }]);
