'use strict';

angular.module('mean.system')
  .controller('IndexController', ['$scope', '$location', 'Global', function ($scope, $location, Global) {
      $scope.global = Global;

      $scope.productImg1 = "img/Gary.jpg";
      $scope.productImg2 = "https://6.viki.io/image/ffc346eeaae0494d84e1a0943eef2399.jpeg?x=b&a=0x0&s=460x268&e=t&f=t&cb=1";
      $scope.productImg3 = "http://img.etnews.com/news/article/2016/04/04/article_04104822604409.jpg";

  }]);
