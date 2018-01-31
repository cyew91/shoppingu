'use strict';

angular.module('mean.auth').controller('signIn', ['$scope', '$window','socket', '$state', 'LogIn', function ($scope, $window, socket, $state, LogIn) {

    $scope.signIn = function (user) {

        var logIn = new LogIn({
            email: user.email,
            password: user.password
        });

        logIn.$save(function (response) {
            if (response.status === 'success') {
                socket.emit("addUser",{email:user.email});
                $window.location.href = '/';
            }else{
                $scope.response = false;
                user.email = null;
                user.password = null;
            }
        });
    };


}]);