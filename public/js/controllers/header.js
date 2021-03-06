'use strict';

angular.module('mean.system')
    .controller('HeaderController', ['$scope', 'socket', 'SignOut', 'CheckLoggedIn', '$state', '$rootScope', '$anchorScroll', 'GetProductID', '$window', 'GetProdCatAndSubCat', 'GetProdDetailByProdCatCode', 'SocialAuth',
    function ($scope, socket, SignOut, CheckLoggedIn, $state, $rootScope, $anchorScroll, GetProductID, $window, GetProdCatAndSubCat, GetProdDetailByProdCatCode, SocialAuth) {
        
    //$scope.isLoading = true;
    $scope.productTravel = [];
    $scope.productRequest = [];
    var productCategory = [];
    var productCategoryId = '';
    $scope.msgCount = 0;
    $scope.allMsgCount = 0;

    $rootScope.currentUser = CheckLoggedIn.get(function (response) {
        $scope.isLogin = true;
        $scope.loginId = $rootScope.currentUser.loginId;
        $scope.imageName = response.imageName;
        if($scope.imageName === null || $scope.imageName === ""){
            $window.localStorage.setItem("checkImageName", 0);
            $rootScope.checkImageName = $window.localStorage.getItem("checkImageName");
        }
        else{
            $window.localStorage.setItem("checkImageName", 1);
            $rootScope.checkImageName = $window.localStorage.getItem("checkImageName");
        }
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
    
    // Load the SDK asynchronously
    (function(d){
    var js, id = 'facebook-jssdk', ref = d.getElementsByTagName('script')[0];
    if (d.getElementById(id)) {return;}
    js = d.createElement('script'); js.id = id; js.async = true;
    js.src = "//connect.facebook.net/en_US/all.js";
    ref.parentNode.insertBefore(js, ref);
    }(document));

    $scope.SignOut = function () {
        SignOut.get(function (response) {
            if (response.status === 'success') {
                $rootScope.currentUser = null;

                FB.logout(function(response) {
                    // user is now logged out
                });
                $window.location.href = '/';
            }
        });
    };

    $scope.search = function () {
        GetProductID.query({
            productdetailname: $scope.inputSearch
        }, function (result) {
            $scope.product = result;
            // Posted Product
            for(var i=0;i<$scope.product.Post.length;i++){
                  $scope.productTravel.push($scope.product.Post[i]);
            }

            // Requested Product
            for(var i=0;i<$scope.product.Request.length;i++){
                $scope.productRequest.push($scope.product.Request[i]);
            } 
            $state.go('searchResult', { prodTravel: $scope.productTravel, prodRequest: $scope.productRequest });
            $('#searchBar').removeClass('search-visible');
            $scope.inputSearch = "";
            // $state.go('searchResult', { prodTravel: $scope.productTravel, prodRequest: $scope.productRequest });
            $scope.productTravel = [];
            $scope.productRequest = [];
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

    $scope.goToLogin = function(){
        $state.go('login');
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
        //allMsgCount += data.count;
        //$scope.allMsgCount = allMsgCount;
    });

    // Update notification inbox in home page
    socket.on('returnHomePageCountToZero', function(data){
        //$scope.msgCount = data.setCount;
        //$scope.initChatNotification();
    });

    // Init chat notification
    $scope.initChatNotification = function(){
        //$scope.allMsgCount = 0;
        socket.emit("getUserFriendList", {username: $window.localStorage.getItem("usernameHeader"), user_2: "null", fromHeader: 1});

        socket.on('returnFriendListHeader', function (data) {
            $scope.users_temps = data;

            //Get all users inbox id
            angular.forEach($scope.users_temps, function(value, key){
                // console.log("value: " + value + "key: " + key);
                if (value.user_2 == $window.localStorage.getItem("usernameHeader")){
                    value.user_2 = value.user_1;
                }
                socket.emit("inbox_id_header", {
                    user_1: $window.localStorage.getItem("usernameHeader"), 
                    user_2: value.user_2, 
                    fromHeader: 1,
                    product_id: value.post_travel_product_id
                }); 
            });
            
            socket.on('inbox_id2Header', function(data){
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