'use strict';

angular.module('mean').controller('ProductDetailsController', ['$scope', '$state', '$stateParams', 'Global', 'GetTravelByTravelId', 'CreateSellerRate', '$window', '$anchorScroll',
	function ($scope, $state, $stateParams, Global, GetTravelByTravelId, CreateSellerRate, $window, $anchorScroll) {
	$scope.global = Global;
	$scope.profileId = $window.sessionStorage.getItem("id");
	
	if ($stateParams.prodTravel !== null){
		$scope.prodTravel = $stateParams.prodTravel;
		$scope.prodProfileId = $scope.prodTravel.post_travel.profile.id;
		$window.localStorage.setItem("prodTravel", JSON.stringify($scope.prodTravel));
		$window.localStorage.setItem("post_travel_id", $scope.prodTravel.post_travel_id);
	}
	else{
		$scope.prodTravel = JSON.parse($window.localStorage.getItem("prodTravel"));
		$scope.prodProfileId = $scope.prodTravel.post_travel.profile.id;
	}
	
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
				postTravelId: $window.localStorage.getItem("post_travel_id")
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
	};

	$scope.goToChat = function () {
		if($scope.profileId === "undefined"){

		}
		else{
			$state.go('chat', {prodTravel: $stateParams.prodTravel});
			$anchorScroll();
		}
		
	};

	$scope.range = function(rating, step){
		step = step || 1;
		var input = [];
		for (var i = 1; i <= rating; i += step) input.push(i);
		return input;
	};

}]);
