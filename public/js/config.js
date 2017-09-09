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
        .state('SignIn',{
            url : '/signin',
            templateUrl: 'views/users/signin.html'
        })
        .state('SignUp',{
            url : '/signup',
            templateUrl: 'views/users/signup.html'
        })
        .state('AboutUs', {
            url : '/aboutus',
            templateUrl: 'views/aboutus.html'
        })
        .state('Faq', {
            url : '/faq',
            templateUrl: 'views/faq.html'
        })
        .state('ContactUs', {
            url : '/contactus',
            templateUrl: 'views/contactus.html'
        })
        .state('articles',{
            url : '/article',
            controller : 'ArticlesController',
            templateUrl: 'views/articles/list.html'
        })
        .state('createArticle',{
            url : '/article/create',
            controller : 'ArticlesController',
            templateUrl: 'views/articles/create.html'
        })
        .state('editArticles',{
            url : '/article/{articleId}/edit',
            controller : 'ArticlesController',
            templateUrl: 'views/articles/edit.html'
        })
        .state('viewArticle',{
            url : '/article/{articleId}',
            controller : 'ArticlesController',
            templateUrl: 'views/articles/view.html'
        })
        .state('foo',{
            url : '/foo',
            params  : {'a': null, 'b': null},
            controller  : 'FooController',
            templateUrl : 'views/foo.html'
        })
        .state('userprofile',{
            url : '/userprofile',
            controller  : 'UserProfileController',
            templateUrl : 'views/users/userprofile.html'
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
        .state('404',{
            templateUrl: 'views/404.html'
        });
}
]);

//Setting HTML5 Location Mode
angular.module('mean').config(['$locationProvider', function ($locationProvider) {
    $locationProvider.html5Mode(true);

}]);
