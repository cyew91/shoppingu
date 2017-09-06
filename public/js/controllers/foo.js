'use strict';

angular.module('mean.system')
  .controller('FooController', ['$scope', 'Global', '$stateParams', function($scope, Global, $stateParams){
    $scope.global = Global;

    $scope.a = $stateParams.a;
    $scope.b = $stateParams.b;

    $('.owl-carousel').owlCarousel({
      loop:true,
      margin:10,
      nav:true,
      responsive:{
          0:{
              items:1
          },
          600:{
              items:3
          },
          1000:{
              items:5
          }
      }
  });
  }]);
