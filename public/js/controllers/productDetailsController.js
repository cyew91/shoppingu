'use strict';

angular.module('mean').controller('ProductDetailsController', ['$scope', '$stateParams', 'Global', 'GetTravelByTravelId', 'CreateSellerRate', '$window',
	function ($scope, $stateParams, Global, GetTravelByTravelId, CreateSellerRate, $window) {
	$scope.global = Global;
	$scope.profileId = $window.sessionStorage.getItem("id");
	$scope.prodTravel = $stateParams.prodTravel;
	$scope.ratings = [{
		value: '1',
		label: '1'
	}, {
		value: '2',
		label: '2'
	}, {
		value: '3',
		label: '3'
	}, {
		value: '4',
		label: '4'
	}, {
		value: '5',
		label: '5'
	}];   
		// Go to Chat page
		// $scope.goToChat = function(){
		// 	$state.go('chat', {sellerInfo: $stateParams.prodTravel});
		// };

		// Get country name
		$scope.initCountryName = function() {
			GetTravelCountryByTravelId.get({
					postTravelId: $scope.prodTravel.post_travel_id
			}, function(result){
					$scope.countryName = result.country.countryName;
			});
		};

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
		GetTravelByTravelId.get({
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
		//$('.gallery-wrapper .gallery-item').removeClass('active');
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

	//Seller rating and comments
	$scope.saveSellerRate = function(){   
        var createSellerRate = new CreateSellerRate({
            subject: this.reviewSubject,
            rating: this.reviewRating.label,
            comment: this.reviewComment,
			profile_id: $scope.profileId,
			post_travel_product_id: $scope.prodTravel.id,
        });

        createSellerRate.$save(function (response) {
			$('#myModal').modal('show');
			$('#myModal').on('hidden.bs.modal', function () {
				location.reload();
			});
		});
	
		$scope.goToChat = function (index) {
			$state.go('chat', {prodTravel: $stateParams.prodTravel});
		};

}]);


// angular.module('mean').directive('restrictTo', function() {
//     return {
//         restrict: 'A',
//         link: function (scope, element, attrs) {
//             var re = RegExp(attrs.restrictTo);
//             var exclude = /Backspace|Enter|Tab|Delete|Del|ArrowUp|Up|ArrowDown|Down|ArrowLeft|Left|ArrowRight|Right/;

//             element[0].addEventListener('keydown', function(event) {
//                 if (!exclude.test(event.key) && !re.test(event.key)) {
//                     event.preventDefault();
//                 }
//             });
//         }
//     }
// });
