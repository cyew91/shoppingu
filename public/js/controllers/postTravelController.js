'use strict'

angular.module('mean').controller('PostTravelController', ['$scope', 'GetCountryList', function ($scope, GetCountryList) {

    $scope.countryList = [];
    $scope.fooDate = new Date;

    const init = function () {
        GetCountryList.query(function (list) {
            $scope.countryList = list;
        });
    };

    init();

    $('.js-example-basic-single').select2();

    $('.input-daterange').datepicker({
        format: 'dd-mm-yyyy'
    });
}]);
