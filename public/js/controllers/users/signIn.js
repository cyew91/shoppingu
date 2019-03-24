'use strict';

angular.module('mean.auth').controller('signIn', ['$scope', '$window', 'LogIn', 'SignUp', 'SocialAuth',
    function ($scope, $window, LogIn, SignUp, SocialAuth) {

    $scope.signIn = function (user) {
        var logIn = new LogIn({
            email: user.email,
            password: user.password
        });

        logIn.$save(function (response) {
            if (response.status === 'success') {
                $window.location.href = '/';
            } else {
                $scope.response = false;
                user.email = null;
                user.password = null;
            }
        });
    };
    
    (function(d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) return;
        js = d.createElement(s); js.id = id;
        js.src = "https://connect.facebook.net/en_US/sdk.js";
        fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));

    // This is called with the results from from FB.getLoginStatus().
    function statusChangeCallback(response) {
        console.log('statusChangeCallback');
        console.log(response);
        // The response object is returned with a status field that lets the
        // app know the current login status of the person.
        // Full docs on the response object can be found in the documentation
        // for FB.getLoginStatus().
        if (response.status === 'connected') {
            // Logged into your app and Facebook.
            testAPI();
        } else {
            // The person is not logged into your app or we are unable to tell.
            document.getElementById('status').innerHTML = 'Please log ' +
                'into this app.';
        }
    };

    // This function is called when someone finishes with the Login
    // Button.  See the onlogin handler attached to it in the sample
    // code below.
    $scope.checkLoginState = function() {
        FB.getLoginStatus(function(response) {
            statusChangeCallback(response);
        });
    }

    // Here we run a very simple test of the Graph API after login is
    // successful.  See statusChangeCallback() for when this call is made.
    function testAPI() {
        console.log('Welcome!  Fetching your information.... ');
        FB.api('/me', {fields: 'first_name, last_name, email, picture'}, function(response) {
            SocialAuth.FbLogin(FB.getAuthResponse()).then(function (response) {
                if(response.status === 'success' || 200){
                    $window.location.href = '/';
                }
            });
            console.log('Successful login for: ' + response.name);
        });
    };

    // Facebook login
    $scope.fbAuth = function(){
        FB.init({ 
            appId: '219745928654021',
            status: true, 
            cookie: true, 
            xfbml: true,
            version: 'v2.4'
        });

        FB.login(function(response) {
            if (response.status === 'connected') {
              // Logged into your app and Facebook.
              statusChangeCallback(response);
            } else {
              // The person is not logged into this app or we are unable to tell. 
            }
          });
    };

}]);