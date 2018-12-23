'use strict';

angular.module('mean').controller('ProductDetailsController', ['$scope', '$stateParams', 'Global', function ($scope, $stateParams, Global) {
  $scope.global = Global;
  $scope.prodTravel = $stateParams.prodTravel[0];

  // $scope.productName = $scope.productObj.id;
  // $scope.productName = "testing"
  // $(".lightgallery").lightGallery();

//   $('.owl-carousel').owlCarousel({
//     items: 5,
//     loop: true,
//     margin: 10,
//     merge: true,
//     responsive: {
//       678: {
//         mergeFit: true
//       },
//       1000: {
//         mergeFit: false
//       }
//     }
//   });

// Product Gallery
	//------------------------------------------------------------------------------
	// var $productCarousel = $('.product-carousel');
	// if($productCarousel.length) {

		//Carousel init
		// $productCarousel.owlCarousel({
		// 	items: 1,
		// 	loop: false,
		// 	dots: false,
		// 	URLhashListener: true,
		// 	startPosition: 'URLHash',
		// 	onTranslate: activeHash
		// });

	// 	function activeHash(e) {
	// 		var i = e.item.index;
	// 		var $activeHash = $('.owl-item').eq(i).find('[data-hash]').attr('data-hash');
	// 		$('.product-thumbnails li').removeClass('active');
	// 		$('[href="#' + $activeHash + '"]').parent().addClass('active');
	// 		$('.gallery-wrapper .gallery-item').removeClass('active');
	// 		$('[data-hash="' + $activeHash + '"]').parent().addClass('active');
			
	// 	}
    // }
    
    $scope.thumbs = function activeHash(e) {
        var i = e;
        var $activeHash = $('.owl-item').eq(i).find('[data-hash]').attr('data-hash');
        $('.product-thumbnails li').removeClass('active');
        $('[href="#' + $activeHash + '"]').parent().addClass('active');
        $('.gallery-wrapper .gallery-item').removeClass('active');
        $('[data-hash="' + $activeHash + '"]').parent().addClass('active');
        
    }
           

}]);



