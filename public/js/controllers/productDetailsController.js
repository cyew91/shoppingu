'use strict';

angular.module('mean').controller('ProductDetailsController', ['$scope', '$stateParams', 'Global', function ($scope, $stateParams, Global) {
  $scope.global = Global;
  $scope.prodTravel = $stateParams.prodTravel[0];

  // $scope.productName = $scope.productObj.id;
  // $scope.productName = "testing"
  // $(".lightgallery").lightGallery();

  $('.owl-carousel').owlCarousel({
    items: 5,
    loop: true,
    margin: 10,
    merge: true,
    responsive: {
      678: {
        mergeFit: true
      },
      1000: {
        mergeFit: false
      }
    }
  });

}]);

