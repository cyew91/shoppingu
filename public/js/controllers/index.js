'use strict';

angular.module('mean.system')
  .controller('IndexController', ['$scope', 'Global', function ($scope, Global) {
      $scope.global = Global;

      $('#owlCarousel1').owlCarousel({
        loop:true,
        dots: true,
        nav: true,
        navText: [ '', '' ],
        responsive:{
            0:{
                items:1
            }
        },
        autoplayTimeout: 7000
      });

      $('#owlCarousel2').owlCarousel({
        loop:true,
        dots: true,
        margin: 30,
        nav: false,
        responsive:{
            0:{
                items:1
            },
            576:{
                items:2
            },
            768:{
                items:3
            },
            1200:{
                items:4
            }
        },
        autoplayTimeout: 7000
      });

      $('#owlCarousel3').owlCarousel({
        loop:true,
        dots: false,
        margin: 30,
        nav: false,
        responsive:{
            0:{
                items:1
            },
            200:{
                items:2
            },
            400:{
                items:3
            },
            600:{
                items:4
            },
            1200:{
                item:5
            }
        },
        autoplayTimeout: 4000
      });
      
  }]);
