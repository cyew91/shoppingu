'use strict';

angular.module('mean.system')
  .controller('ProductDetailsController', ['$scope', 'Global', '$stateParams', function($scope, Global, $stateParams){
    $scope.global = Global;

    $scope.a = $stateParams.a;
    $scope.b = $stateParams.b;

  //   $('.owl-carousel').owlCarousel({
  //      items:5,
  //      width:2000,
  //      loop:false,
  //      center:true,
  //      URLhashListener:true,
  //      autoplayHoverPause:true,
  //      startPosition: 'URLHash'
  //  })
   
   $(".lightgallery").lightGallery();

   
}]);

