'use strict';
angular.module('mean.auth').factory('socket', function($rootScope) {
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
});

angular.module('mean.auth').controller('signIn', ['$scope', '$window', 'LogIn', 'socket', function ($scope, $window, LogIn, socket) {

    $scope.signIn = function (user) {
        var logIn = new LogIn({
            username: user.username,
            password: user.password
        });

        logIn.$save(function (response) {
            if (response.status === 'success') {
                socket.emit("addUser",{username: user.username});
                $window.location.href = '/';
            } else {
                $scope.response = false;
                user.email = null;
                user.password = null;
            }
        });
    };


}]);