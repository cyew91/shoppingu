'use strict';

//Setting up route
angular.module('mean').config(['$stateProvider','$urlRouterProvider', function($stateProvider,$urlRouterProvider) {

    $urlRouterProvider.otherwise(function($injector, $location){
        $injector.invoke(['$state', function($state) {
            $state.go('404');
        }]);
    });
    $stateProvider
        .state('home',{
            url : '/',
            controller : 'IndexController',
            templateUrl: 'views/index.html'
        })
        .state('signin',{
            url : '/signin',
            templateUrl: 'views/users/signIn.html'
        })
        .state('signup',{
            url : '/signup',
            templateUrl: 'views/users/signUp.html'
        })
        .state('aboutus', {
            url : '/aboutus',
            templateUrl: 'views/aboutus.html'
        })
        .state('faq', {
            url : '/faq',
            templateUrl: 'views/faq.html'
        })
        .state('contactus', {
            url : '/contactus',
            templateUrl: 'views/contactUs.html'
        })
        .state('articles',{
            url : '/article',
            controller : 'ArticlesController',
            templateUrl: 'views/articles/list.html'
        })
        .state('createarticle',{
            url : '/article/create',
            controller : 'ArticlesController',
            templateUrl: 'views/articles/create.html'
        })
        .state('editarticles',{
            url : '/article/{articleId}/edit',
            controller : 'ArticlesController',
            templateUrl: 'views/articles/edit.html'
        })
        .state('viewarticle',{
            url : '/article/{articleId}',
            controller : 'ArticlesController',
            templateUrl: 'views/articles/view.html'
        })
        .state('productdetails',{
            url : '/productdetails',
            params  : {'a': null, 'b': null},
            controller  : 'ProductDetailsController',
            templateUrl : 'views/productDetails.html'
        })
        .state('posttravel',{
            url : '/posttravel',
            templateUrl : 'views/product/post/postTravel.html'
        })
        .state('postproduct',{
            url : '/postproduct',
            templateUrl : 'views/product/post/postProduct.html'
        })
        .state('userprofile',{
            url : '/userprofile',
            controller  : 'UserProfileController',
            templateUrl : 'views/users/userProfile.html'
        })
        .state('address',{
            url : '/address',
            controller  : 'AddressController',
            templateUrl : 'views/users/address.html'
        })
        .state('order',{
            url : '/order',
            controller  : 'OrderController',
            templateUrl : 'views/users/order.html'
        })
        .state('post',{
            url : '/post',
            controller  : 'PostController',
            templateUrl : 'views/users/post.html'
        })
        .state('forgetpassword',{
            url : '/forgetpassword',
            templateUrl : 'views/users/forgetPassword.html'
        })
        .state('404',{
            templateUrl: 'views/404.html'
        });
}
]);

//Setting HTML5 Location Mode
angular.module('mean').config(['$locationProvider', function ($locationProvider) {
    $locationProvider.html5Mode(true);

}]);
