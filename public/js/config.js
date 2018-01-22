'use strict';

//Setting up route
angular.module('mean').config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise(function ($injector, $location) {
        $injector.invoke(['$state', function ($state) {
            $state.go('404');
        }]);
    });

    $stateProvider
        .state('home', {
            url: '/',
            controller: 'IndexController',
            templateUrl: 'views/index.html'
        })
        .state('signin', {
            url: '/signin',
            templateUrl: 'views/users/signIn.html'
        })
        .state('signup', {
            url: '/signup',
            templateUrl: 'views/users/signUp.html'
        })
        .state('aboutus', {
            url: '/aboutus',
            templateUrl: 'views/aboutus.html'
        })
        .state('faq', {
            url: '/faq',
            templateUrl: 'views/faq.html'
        })
        .state('contactus', {
            url: '/contactus',
            templateUrl: 'views/contactUs.html'
        })
        .state('articles', {
            url: '/article',
            controller: 'ArticlesController',
            templateUrl: 'views/articles/list.html'
        })
        .state('createarticle', {
            url: '/article/create',
            controller: 'ArticlesController',
            templateUrl: 'views/articles/create.html'
        })
        .state('editarticles', {
            url: '/article/{articleId}/edit',
            controller: 'ArticlesController',
            templateUrl: 'views/articles/edit.html'
        })
        .state('viewarticle', {
            url: '/article/{articleId}',
            controller: 'ArticlesController',
            templateUrl: 'views/articles/view.html'
        })
        .state('productdetails', {
            url: '/productdetails',
            params: { 'a': null, 'b': null },
            controller: 'ProductDetailsController',
            templateUrl: 'views/productDetails.html'
        })
        .state('posttravel', {
            abstract: true,
            url: '/posttravel',
            templateUrl: 'views/product/post/post.html'
        })
        .state('posttravel.travel', {
            url: '',
            params: {
                productObj: null,
                buyer: false
            },
            controller: 'TravelController',
            templateUrl: 'views/product/post/travel.html'
        })
        .state('posttravel.product', {
            url: '',
            params: {
                productObj: null
            },
            controller: 'ProductController',
            templateUrl: 'views/product/post/product.html'
        })
        .state('posttravel.review', {
            params: {
                productObj: null
            },
            controller: 'ReviewController',
            templateUrl: 'views/product/post/review.html'
        })
        .state('userprofile', {
            url: '/userprofile',
            params: {
                profileId: '2e3da212-9953-11e7-b85b-5d64dd272c67',
            },
            controller: 'UserProfileController',
            templateUrl: 'views/users/userProfile.html'
        })
        .state('address', {
            url: '/address',
            params: {
                profileId: '2e3da212-9953-11e7-b85b-5d64dd272c67',
            },
            controller: 'AddressController',
            templateUrl: 'views/users/address.html'
        })
        .state('order', {
            url: '/order',
            controller: 'OrderController',
            templateUrl: 'views/users/order.html'
        })
        .state('post', {
            url: '/post',
            controller: 'PostController',
            templateUrl: 'views/users/post.html'
        })
        .state('forgetpassword', {
            url: '/forgetpassword',
            templateUrl: 'views/users/forgetPassword.html'
        })
        .state('uploadimage', {
            url: '/uploadimage',
            controller: 'UploadImageController',
            templateUrl: 'views/uploadImage.html'
        })
        .state('404', {
            templateUrl: 'views/404.html'
        })
        .state('profileIcon', {
            url: '/profileIcon',
            templateUrl: 'views/users/account-orders.html'
        })
        .state('searchResult', {
            url: '/searchresult',
            params: {
                prodTravel: null,
                prodRequest: null
            },
            controller: 'SearchResultController',
            templateUrl: 'views/searchResult.html'
        })
        .state('searchCountry', {
            url : '/searchcountry',
            params: {
                productDetailID: null
            },
            controller : 'SearchCountryController',
            templateUrl: 'views/searchCountry.html'	
        })
        .state('postProductDetail', {
            url : '/postproductdetail',
            params: {
                productID: null
            },
            controller : 'PostProductDetailController',
            templateUrl: 'views/postProductDetail.html'	
        })
        .state('editProductDetail', {
            url : '/editproductdetail',
            params: {
                productDet: null
            },
            controller : 'EditProductDetailController',
            templateUrl: 'views/editProductDetail.html'	
        })
        .state('posttravelproduct', {
            url: '/posttravelproduct',
            params: {
                productObj: null
            },
            controller: 'ProductController',
            templateUrl: 'views/product/post/product.html'
        })
        .state('userprofilemain', {
            url: '/userprofilemain',
            controller: 'UserProfileMainController',
            templateUrl: 'views/users/userprofilemain.html'
        });
}
]);

//Setting HTML5 Location Mode
angular.module('mean').config(['$locationProvider', function ($locationProvider) {
    $locationProvider.html5Mode(true);

}]);
