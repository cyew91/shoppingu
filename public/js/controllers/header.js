'use strict';

angular.module('mean.system')
    .controller('HeaderController', ['$scope', 'socket', 'SignOut', 'CheckLoggedIn', '$state', '$rootScope', '$anchorScroll', 'GetProductID', '$window', 'GetProdCatAndSubCat', 'GetProdDetailByProdCatCode',
    function ($scope, socket, SignOut, CheckLoggedIn, $state, $rootScope, $anchorScroll, GetProductID, $window, GetProdCatAndSubCat, GetProdDetailByProdCatCode) {
        
    //$scope.isLoading = true;
    $scope.productTravel = [];
    $scope.productRequest = [];
    var productCategory = [];
    var productCategoryId = '';
    $scope.msgCount = 0;

    $rootScope.currentUser = CheckLoggedIn.get(function (response) {
        $scope.isLogin = true;
        $scope.loginId = $rootScope.currentUser.loginId;
        $window.localStorage.setItem("usernameHeader", $scope.loginId);
        var userId = $window.sessionStorage.getItem("id");
        
        if (userId == "undefined") {
            $scope.isLogin = false;
        }
        if (response.status !== '0') {
            $scope.initChatNotification();
            return response;
        } else {
            $scope.errorMessage = 'Not logged in';
            $rootScope.currentUser = null;
            return "";
        }
        
    });
    
    $scope.SignOut = function () {
        SignOut.get(function (response) {
            if (response.status === 'success') {
                $rootScope.currentUser = null;
                $window.location.reload();
                $state.go('home');
            }
        });
    };

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
            $('#searchBar').removeClass('search-visible');
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

    $scope.goToPostTravel = function(){
        $state.go('travel', { buyer: false });
    }

    $scope.goToPostRequest = function(){
        $state.go('travel', { buyer: true });
    }

    // Return notification while push msg
    socket.on('notifications_1', function(data){
        if(data.name == $window.localStorage.getItem("usernameHeader")){
            $scope.msgCount = data.count;
        }
    });

    // Return notification when init page
    socket.on('notifications', function(data){
        $scope.msgCount = data.count;

    });

    // Update notification inbox in home page
    socket.on('returnHomePageCountToZero', function(data){
        $scope.msgCount = data.setCount;
    });

    // Init chat notification
    $scope.initChatNotification = function(){
        socket.emit("getUserFriendList", {username: $window.localStorage.getItem("usernameHeader"), user_2: "null"});

        socket.on('returnFriendList', function (data) {
            $scope.users_temp = data;

            //Get all users inbox id
            angular.forEach($scope.users_temp, function(value, key){
                console.log("value: " + value + "key: " + key);
                if (value.user_2 == $window.localStorage.getItem("usernameHeader")){
                    value.user_2 = value.user_1;
                }
                socket.emit("inbox_id", {user_1: $window.localStorage.getItem("usernameHeader"), user_2: value.user_2}); 
            });
            
            socket.on('inbox_id2', function(data){
                socket.emit('get_notification', {inbox_id: data.inbox_id, user_name: data.user_2, name: $window.localStorage.getItem("usernameHeader")}); 
            });
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