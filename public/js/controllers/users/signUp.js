'use strict';

angular.module('mean.auth').controller('signUp', ['$scope', '$window', 'Global', '$state', 'SignUp', 'GetCountryList', '$stateParams', function ($scope, $window, Global, $state, SignUp, GetCountryList, $stateParams) {
    $scope.global = Global;

    $scope.signUp = function () {
        var signUp = new SignUp({
            firstName: this.firstName,
            lastName: this.lastName,
            email: this.email,
            phoneNumber: this.phoneNumber,
            password: this.password,
            confirmPassword: this.confirmPassword,
            countryID: this.countryID
        });

        signUp.$save(function (response) {
            if (response.result === 'success') {
                $('#myModal').modal('show');
            }
        });
    };

    $('#myModal').on('hidden.bs.modal', function (e) {
        $state.go('signin');
    });

    $scope.travelObject = {
        countryList: [],
        initCountry: {}
    }

    const init = function () {
        GetCountryList.query(function (list) {
            $scope.travelObject.countryList = list; 
        });

        // if($stateParams.productObj == null){
        //     $scope.productObj={
        //         count: 1
        //     }
        // }else{
        //     $scope.productObj = $stateParams.productObj;
        //     $scope.travelObject.initCountry= {CountryCode: $scope.productObj['countryCode'], CountryID: $scope.productObj['countryID'], CountryName: $scope.productObj['countryName'],Status: $scope.productObj['countryStatus']}
        // }
    };

    init();

    $scope.selectedCountry = function (selected) {
        
        if (selected && typeof(selected.description) !== 'undefined') {
            $scope.countryID = selected.description.CountryID;
            // $scope.productObj.countryCode = selected.description.CountryCode;
            // $scope.productObj.countryName = selected.description.CountryName;
            // $scope.productObj.countryStatus = selected.description.Status;
            
        }
    };
    
}]);