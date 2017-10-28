'use strict';

angular.module('mean.auth').controller('signUp', ['$scope', '$window', 'Global', '$state', 'SignUp', function ($scope, $window, Global, $state, SignUp) {
    $scope.global = Global;


    $scope.signUp = function () {

        var signUp = new SignUp({
            "FirstName": this.firstName,
            "LastName": this.lastName,
            "FullName": this.firstName + this.lastName,
            "Address": "",
            "Email": this.email,
            "ContactNo": this.phoneNumber,
            "Gender": 0,
            "DOB": Date.now(),
            "Remarks": "",
            "CreatedDate": Date.now(),
            "CreatedBy": "00000000-0000-0000-0000-000000000000",
            "LastUpdatedDate": Date.now(),
            "LastUpdatedBy": "00000000-0000-0000-0000-000000000000"
        });
        
        signUp.$save(function (response) {
            if (response.status === 'success') {
                $window.location.href = '/';
            }
        });
    };


}]);