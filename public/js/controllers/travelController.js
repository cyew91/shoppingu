'use strict'

angular.module('mean').controller('TravelController', ['$scope', '$state', '$stateParams', 'GetCountryList', '$rootScope', '$window', '$anchorScroll', function ($scope, $state, $stateParams, GetCountryList, $rootScope, $window, $anchorScroll) {
    $scope.buyer = $stateParams.buyer;
    $scope.profileId = $window.sessionStorage.getItem("id");
    var startDate;
    var toDate;
    $rootScope.hasTravel = true;

    $scope.count = 1;

    $scope.init = function () {
        GetCountryList.query(function (list) {
            $scope.countryList = list;
        });

        // initDatePicker();
        initStartDate();
    };

    var initDatePicker = function () {
        $('.date').datepicker({
        autoclose: true,
        keepEmptyValues: true,
        format: 'yyyy-mm-dd',
        clearBtn: true,
        startDate : new Date()
        });
    }

    var initStartDate = function() {
        $("#datepickerFrom").datepicker({
            autoclose: true,
            clearBtn: true,
            format: 'yyyy-mm-dd',
            startDate : new Date()
        }).on('changeDate', function (selected) {
            var minDate = new Date(selected.date.valueOf());
            $('#datepickerTo').datepicker('setStartDate', minDate);
            $('#datepickerTo').datepicker('setDate', minDate);
        });

        $("#datepickerTo").datepicker({
            autoclose: true,
            clearBtn: true,
            format: 'yyyy-mm-dd',
            startDate : new Date()
        // }).on('changeDate', function (selected) {
        //         var minDate = new Date(selected.date.valueOf());
        //         $('#datepickerFrom').datepicker('setStartDate', minDate);
        });
    }

    $scope.selectedCountry = function (selected) {
        $scope.TravelObj = selected.description;
    };

    $('#datepickerFrom').on('changeDate', function() {
        startDate = $('#datepickerFrom').datepicker('getFormattedDate');
    });

    $('#datepickerTo').on('changeDate', function() {
        toDate = $('#datepickerTo').datepicker('getFormattedDate');
        $scope.toDate = startDate >= toDate ? startDate : toDate;
    });

    $scope.continue = function (count) {
        if (angular.isUndefined($scope.TravelObj)){
            $scope.response = false;
            $scope.errorMsg = "Select travel Country";
        }
        else if (angular.isUndefined(startDate))
        {
            $scope.response = false;
            $scope.errorMsg = "Fill in Date From";
        }
        else if (angular.isUndefined(toDate)){
            $scope.response = false;
            $scope.errorMsg = "Fill in Date To";
        }
        else {
            $scope.TravelObj.startDate = startDate;
            $scope.TravelObj.toDate = toDate;
            $scope.TravelObj.profileId = $scope.profileId;
            $state.go('postproduct', { travelObj: $scope.TravelObj });
            // Scroll to top
            $anchorScroll();
        }
    }

    //Input Progress
    // function updateInputProgress() {
    //     var filledFields = 0;
    //     $("#input-progress").find("input, select").each(function () {
    //         if ($(this).val() != "") {
    //             filledFields++;
    //         }
    //     });

    //     var percent = Math.ceil(100 * filledFields / totalFields);
    //     $("#progress-inputs .progress-bar").attr("aria-valuenow", percent).width(percent + "%").find(".sr-only").html(percent + "% Complete");

    //     return percent;
    // }


    // $("#input-progress").click(function () {
    //     updateInputProgress();
    // });
    // $("#input-progress .btn-success").click(function () {
    //     var percent = updateInputProgress();
    //     if (percent == 100) {
    //         alert("Finished inputs successfully!");
    //     }
    // })
}]);


