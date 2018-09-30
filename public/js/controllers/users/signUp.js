'use strict';

angular.module('mean.auth').controller('signUp', ['$scope', 'Global', '$state', 'SignUp', function ($scope, Global, $state, SignUp) {
    $scope.global = Global;

    $scope.signUp = function () {
        var signUp = new SignUp({
            firstName: this.firstName,
            lastName: this.lastName,
            email: this.email,
            contactNo: this.phoneNumber,
            loginId: this.userName,
            password: this.password,
            confirmPassword: this.confirmPassword
        });

        signUp.$save(function (response) {
            if (response.result === 'success') {
                $('#myModal').modal('show');
            }
        });
    };

    $('#myModal').on('hidden.bs.modal', function (e) {
        $state.go('login');
    });
}]);