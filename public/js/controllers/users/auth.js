'use strict';

angular.module('mean.auth').controller('socialAuth', ['$scope', 'Global','$state', '$fblogin', 'SocialAuth','$window','$auth','$rootScope','facebookService', function ($scope, Global, $state, $fblogin, SocialAuth, $window, $auth, $rootScope, facebookService) {
    $scope.global = Global;

    $scope.menu = [{
        "title": "Articles",
        "state": "articles"
    }, {
        "title": "Create New Article",
        "state": "createArticle"
    }];

    $scope.isCollapsed = false;

    // This is called with the results from from FB.getLoginStatus().
    function statusChangeCallback(response) {
        console.log('statusChangeCallback');
        console.log(response);
        // The response object is returned with a status field that lets the
        // app know the current login status of the person.
        // Full docs on the response object can be found in the documentation
        // for FB.getLoginStatus().
        if (response.status === 'connected') {
            console.log(response.authResponse.accessToken)
        // Logged into your app and Facebook.
            testAPI();
        } else {
        // The person is not logged into your app or we are unable to tell.
            FB.login(function(response){
                // Handle the response object, like in statusChangeCallback() in our demo
                // code.
            });
        }
        
    }

    // This function is called when someone finishes with the Login
    // Button.  See the onlogin handler attached to it in the sample
    // code below.
    $scope.checkLoginState = function() {
        FB.getLoginStatus(function(response) {
        statusChangeCallback(response);
        });
    }

    $rootScope.user = {};
    $window.fbAsyncInit = function() {
      // Executed when the SDK is loaded
      FB.init({
        /*
         The app id of the web app;
         To register a new app visit Facebook App Dashboard
         ( https://developers.facebook.com/apps/ )
        */
        appId: '219745928654021',
        /*
         Adding a Channel File improves the performance
         of the javascript SDK, by addressing issues
         with cross-domain communication in certain browsers.
        */
        channelUrl: 'app/channel.html',
        /*
         Set if you want to check the authentication status
         at the start up of the app
        */
        status: true,
        /*
         Enable cookies to allow the server to access
         the session
        */
        cookie: true,
        /* Parse XFBML */
        xfbml: true,
        version: 'v2.4'
      });
      FB.getLoginStatus(function(response) {
        statusChangeCallback(response);
      });
      //sAuth.watchAuthenticationStatusChange();
    };
    (function(d){
      // load the Facebook javascript SDK
      var js,
      id = 'facebook-jssdk',
      ref = d.getElementsByTagName('script')[0];
  
      if (d.getElementById(id)) {
        return;
      }
  
      js = d.createElement('script');
      js.id = id;
      js.async = true;
      js.src = 'https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v3.0&appId=219745928654021&autoLogAppEvents=1';
  
      ref.parentNode.insertBefore(js, ref);
  
    }(document));

    function testAPI() {
        SocialAuth.FbLogin(FB.getAuthResponse()) 
          .then(function(response) {
            $scope.last_name = response.last_name;
          }
        );
     };

    $scope.logout = function (){
        FB.logout(function(response){
            console.log(response);
        });
    };




    // $scope.fbAuth = function(){
    //     $fblogin({
    //         fbId: "219745928654021"
    //         // permissions: 'email,user_birthday',
    //         // fields: 'first_name,last_name,email,birthday,picture'
    //     }).then(function () {
    //         SocialAuth.FbLogin(FB.getAuthResponse()).then(function (response) {
    //             if(response.status === 'success' || 200){
    //                 $window.location.href = '/';
    //             }
    //         });
    //     }, function (e){

    //     }
    
    //     ).catch(function () {
    //         $window.location.reload();
    //     });
    // };
    $scope.twitterAuth = function(){
        $auth.authenticate('twitter').then(function(response) {
            if(response.status === 'success' || 200){
                $window.location.href = '/';
            }
        });
    };

    $scope.googleAuth = function(){

        $auth.authenticate('google').then(function(response) {
            if(response.status === 'success' || 200){
                $window.location.href = '/';
            }
        });
    };


}]);
