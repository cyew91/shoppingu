'use strict';

angular.module('mean.system')
  .controller('IndexController', ['$scope', 'Global', function ($scope, Global) {
      $scope.global = Global;

      // $('#owlCarousel1').owlCarousel({
      //   loop:true,
      //   dots: true,
      //   nav: true,
      //   navText: [ '', '' ],
      //   items: 1,
      //   autoplayTimeout: 7000,
      // });
      
  }]);
