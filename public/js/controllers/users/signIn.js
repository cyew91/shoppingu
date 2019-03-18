'use strict';

angular.module('mean.auth').controller('signIn', ['$scope', '$window', 'LogIn', 'socket', function ($scope, $window, LogIn, socket) {

    $scope.signIn = function (user) {
        var logIn = new LogIn({
            username: user.username,
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


}]);