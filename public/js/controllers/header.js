'use strict';

angular.module('mean.system').controller('HeaderController', ['$scope', 'SignOut', 'CheckLoggedIn', '$state', '$rootScope', '$anchorScroll', 'GetProductID', '$window', 'GetProdCatAndSubCat', 'GetProdDetailByProdCatCode',
    function ($scope, SignOut, CheckLoggedIn, $state, $rootScope, $anchorScroll, GetProductID, $window, GetProdCatAndSubCat, GetProdDetailByProdCatCode) {
    // $scope.showSearchBar = false;
    // $scope.isCollapsed = false;
    //$scope.isLoading = true;
    $scope.productTravel = [];
    $scope.productRequest = [];
    var productCategory = [];
    var productCategoryId = '';

    $rootScope.currentUser = CheckLoggedIn.get(function (response) {
        $scope.isLogin = true;
        var userId = $window.sessionStorage.getItem("id");
        if (userId == "undefined") {
            $scope.isLogin = false;
        }
        if (response.status !== '0') {
            return response;
        } else {
            $scope.errorMessage = 'Not logged in';
            $rootScope.currentUser = null;
            return "";
        }
    });

    // $rootScope.currentUser = function () {
    //     CheckLoggedIn.get(function (response) {
    //             $scope.isLogin = true;
    //             var userId = $window.sessionStorage.getItem("id");
    //             if (userId == "undefined") {
    //                 $scope.isLogin = false;
    //             }
    //             if (response.status !== '0') {
    //                 return response;
    //             } else {
    //                 $scope.errorMessage = 'Not logged in';
    //                 $rootScope.currentUser = null;
    //                 return "";
    //             }
    //         });
    //     //$scope.isLoading = false;
            
    // };
    
    $scope.SignOut = function () {
        SignOut.get(function (response) {
            if (response.status === 'success') {
                $rootScope.currentUser = null;
                $window.location.reload();
                $state.go('home');
            }
        });
    };

    // $scope.openSearch = function () {
    //     $('#mainSearchForm').addClass("fadeIn");
    //     $scope.showSearchBar = true;
    // };

    // $scope.closeSearch = function () {
    //     $('#mainSearchForm').removeClass('fadeIn');
    //     $('#mainSearchForm').addClass('fadeOut');
    //     $scope.showSearchBar = false;
    // };

    $scope.search = function () {
        GetProductID.query({
            productdetailname: $scope.inputSearch
        }, function (result) {
            $scope.product = result;
             for(var i=0;i<$scope.product.length;i++){
                //if ($scope.product[i].t_product.PostType == 0)
                  $scope.productTravel.push($scope.product[i]);
                // else
                //   $scope.productRequest.push($scope.product[i]);
            }
            $state.go('searchResult', { prodTravel: $scope.productTravel });
            $scope.inputSearch = "";
            // $state.go('searchResult', { prodTravel: $scope.productTravel, prodRequest: $scope.productRequest });
            $scope.productTravel = [];
            //$scope.productRequest = [];
        });
    };

    // Category list
    $scope.categoryList = function() {
        GetProdCatAndSubCat.query(function (result) {
          $scope.categoryListResult = result;
          productCategoryId = result;
        });
    };

    // Click on Category
    $scope.clickOnCategory = function(index){
        GetProdDetailByProdCatCode.query({
            productcategoryid: productCategoryId[index].id
        }, function(result){
            productCategory = result;
            $state.go('searchResult', {prodTravel: productCategory});
            $anchorScroll();
        });
    };

    // Sticky Navbar
    // //------------------------------------------------------------------------------
    // function stickyHeader() {
    // 	var $body = $('body');
    // 	var $navbar = $('.navbar-sticky');
    // 	var $topbarH = $('.topbar').outerHeight();
    // 	var $navbarH = $navbar.outerHeight();
    // 	if($navbar.length) {
    // 		$(window).on('scroll', function() {
    // 			if($(this).scrollTop() > $topbarH) {
    // 				$navbar.addClass('navbar-stuck');
    // 				if(! $navbar.hasClass('navbar-ghost')) {
    // 					$body.css('padding-top', $navbarH);
    // 				}
    // 			} else {
    // 				$navbar.removeClass('navbar-stuck');
    // 				$body.css('padding-top', 0);
    // 			}
    // 		});
    // 	}
    // }
    // stickyHeader();

    //Page Loading
    // $(window).on('load', function(){
    //     $('.loader').fadeOut();
    // });
}]);