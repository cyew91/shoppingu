'use strict';

angular.module('mean').controller('ProductDetailsController', ['$scope', '$stateParams', 'Global', 'GetTravelCountryByTravelId', 
		function ($scope, $stateParams, Global, GetTravelCountryByTravelId) {
		$scope.global = Global;
		$scope.prodTravel = $stateParams.prodTravel;

		// $('.owl-carousel').owlCarousel({
		//   items: 5,
		//   loop: true,
		//   margin: 10,
		//   merge: true,
		//   responsive: {
		//     678: {
		//       mergeFit: true
		//     },
		//     1000: {
		//       mergeFit: false
		//     }
		//   }
		// });

		// Get country name
		$scope.initCountryName = function() {
			GetTravelCountryByTravelId.get({
					postTravelId: $scope.prodTravel.post_travel_id
			}, function(result){
					$scope.countryName = result.country.countryName;
			});
		};


		$scope.owlC = function activeHash(e) {
				var i = e;
				var $activeHash = $('.owl-item').eq(i).find('[data-hash]').attr('data-hash');
				$('.product-thumbnails li').removeClass('active');
				$('[href="#' + $activeHash + '"]').parent().addClass('active');
				$('.gallery-wrapper .gallery-item').removeClass('active');
				$('[data-hash="' + $activeHash + '"]').parent().addClass('active');
		}

		$(document).ready(function() {
				var bigimage = $("#big");
				var thumbs = $("#thumbs");
				var syncedSecondary = true;
				
				thumbs.on("initialized.owl.carousel", function() {
					thumbs
					.find(".thumbnails")
					.eq(0)
					.addClass("current");
				}).owlCarousel({
					mouseDrag: false
				}).on("changed.owl.carousel", syncPosition2);
				
				function syncPosition2(el) {
					if (syncedSecondary) {
					var number = el.item.index;
					bigimage.data("owl.carousel").to(number, 100, true);
					}
				};
				
				thumbs.on("click", ".thumbnails", function(e) {
					e.preventDefault();
					var number = $(this).index();
					bigimage.data("owl.carousel").to(number, 300, true);
				});
		});
	
	  

}]);

