'use strict';

angular.module('mean.auth').factory("SocialAuth", ['$http', function ($http) {
    return {
        FbLogin: function (token) {
            return $http.post('/auth/facebook/token', {
                    "access_token": token.accessToken
                })
                .then(function (res) {
                    return res;
                });
        }
    };
}]);

angular.module('mean.auth').service("SignUp", ['$resource', function ($resource) {
    return $resource('/profile');
}]);

angular.module('mean.auth').service("CheckLoggedIn", ['$resource', function ($resource) {
    return $resource('/checkLoggedin');
}]);

angular.module('mean.auth').service("LogIn", ['$resource', function ($resource) {
    return $resource('/users/session');
}]);

angular.module('mean.auth').service("SignOut", ['$resource', function ($resource) {
    return $resource('/signout');
}]);

angular.module('mean.auth').factory("socket", ['$rootScope',function($rootScope) {
    var socket = io(); //默认连接部署网站的服务器
    return {
        on: function(eventName, callback) {
            socket.on(eventName, function() {
                var args = arguments;
                $rootScope.$apply(function() {   //手动执行脏检查
                    callback.apply(socket, args);
                });
            });
        },
        emit: function(eventName, data, callback) {
            socket.emit(eventName, data, function() {
                var args = arguments;
                $rootScope.$apply(function() {
                    if(callback) {
                        callback.apply(socket, args);
                    }
                });
            });
        }
    };
}]);