'use strict'

angular.module('mean').controller('PostTravelController', ['$scope', 'GetCountryList', function ($scope, GetCountryList) {

    $scope.countryList = [];

    const init = function () {
        GetCountryList.query(function (list) {
            $scope.countryList = list;
        });
    };

    init();

    $('.js-example-basic-single').select2();
}]);