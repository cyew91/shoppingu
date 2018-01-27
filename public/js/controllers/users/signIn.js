'use strict';

angular.module('mean.auth').controller('signIn', ['$scope', '$window', '$state', 'LogIn', function ($scope, $window, $state, LogIn) {

    $scope.signIn = function (user) {

        var logIn = new LogIn({
            email: user.email,
            password: user.password
        });

        logIn.$save(function (response) {
            if (response.status === 'success') {
                $window.location.href = '/';
            }
        });
    };


}]);