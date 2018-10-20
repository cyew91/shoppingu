'use strict'

angular.module('mean').controller('TravelController', ['$scope', '$state', '$stateParams', 'GetCountryList', function ($scope, $state, $stateParams, GetCountryList) {
    $scope.buyer = $stateParams.buyer;
    $scope.profileId = '0fc62662-2078-4b56-b753-4b72e557cc62'
    var startDate;
    var toDate;

    $scope.count = 1;

    $scope.init = function () {
        GetCountryList.query(function (list) {
            $scope.countryList = list;
        });

        // if ($stateParams.productObj == null) {
        //     $scope.productObj = {
        //         count: 1 
        //     }
        // } else {
        // $scope.productObj = $stateParams.productObj;
        //$scope.travelObject.initCountry = { CountryCode: $scope.productObj['countryCode'], CountryID: $scope.productObj['countryID'], CountryName: $scope.productObj['countryName'], Status: $scope.productObj['countryStatus'] }
        // }
    };

    $('.date').datepicker({
        autoclose: true,
        keepEmptyValues: true,
        format: 'yyyy-mm-dd',
        clearBtn: true
    });

    // $scope.productObj.startDate = $('#datepickerFrom').datepicker('getFormattedDate');
    // $scope.productObj.toDate = $('#datepickerTo').datepicker('getFormattedDate');

    

    // $('#datepickerFrom').datepicker();

    $scope.selectedCountry = function (selected) {
        $scope.TravelObj = selected.description;
    };

    $('#datepickerFrom').on('changeDate', function() {
        startDate = $('#datepickerFrom').datepicker('getFormattedDate');
    });

    $('#datepickerTo').on('changeDate', function() {
        toDate = $('#datepickerTo').datepicker('getFormattedDate')
    });

    $scope.continue = function (count) {
        $scope.TravelObj.startDate = startDate;
        $scope.TravelObj.toDate = toDate;
        $scope.TravelObj.profileId = $scope.profileId;

        if (angular.isUndefined($scope.TravelObj)) {
            $scope.response = false;
            if (angular.isUndefined($scope.TravelObj.startDate)) {
                $('#datepickerFrom').removeClass("dateRangePicker");
                $('#datepickerFrom').addClass("dateRangePickerAfter");
            } else {
                $('#datepickerFrom').removeClass("dateRangePickerAfter");
                $('#datepickerFrom').addClass("dateRangePicker");
            }

            if (angular.isUndefined($scope.TravelObj)) {
                $('#autocomplete').removeClass("form-control-small");
                $('#autocomplete').addClass("form-control-smallAfter");
            } else {
                $('#autocomplete').removeClass("form-control-smallAfter");
                $('#autocomplete').addClass("form-control-small");
            }
        }
        else {
            var count = 2;
            $('#text' + count).css('display', 'none');
            $('#textStep' + count).css('display', 'block');

            $('#text' + (count - 1)).css('display', 'none');
            $('#textStep' + (count - 1)).css('display', 'none');

            $('#check' + (count - 1)).css('display', 'block');

            var $bar = $(".ProgressBar");
            if ($bar.children(".is-current").length > 0) {
                $bar.children(".is-current").removeClass("is-current").addClass("is-complete").next().addClass("is-current");
            } else {
                $bar.children().first().addClass("is-current");
            }

            if (count == 2) {
                //$scope.productObj.buyer = $scope.buyer;
                $state.go('postproduct', { travelObj: $scope.TravelObj });
            } else if (count == 3) {
                $state.go('posttravel.review', { productObj: $scope.productObj });
            }
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