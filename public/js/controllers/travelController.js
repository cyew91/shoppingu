'use strict'

angular.module('mean').controller('TravelController', ['$scope', '$state', '$stateParams', 'GetCountryList', function ($scope, $state, $stateParams, GetCountryList) {
    $scope.buyer = $stateParams.buyer;

    $scope.travelObject = {
        countryList: [],
        initCountry: {}
    }

    const init = function () {
        GetCountryList.query(function (list) {
            $scope.travelObject.countryList = list; 
        });

        if($stateParams.productObj == null){
            $scope.productObj={
                count: 1
            }
        }else{
            $scope.productObj = $stateParams.productObj;
            $scope.travelObject.initCountry= {CountryCode: $scope.productObj['countryCode'], CountryID: $scope.productObj['countryID'], CountryName: $scope.productObj['countryName'],Status: $scope.productObj['countryStatus']}
        }
    };

    init();

    $('.input-daterange').datepicker({
        autoclose: true,
        keepEmptyValues: true,
        format: 'yyyy-mm-dd',
        clearBtn: true
    });

    $('#datepickerFrom').on('changeDate', function() {
        $scope.productObj.startDate = $('#datepickerFrom').datepicker('getFormattedDate');
    });

    $('#datepickerTo').on('changeDate', function() {
        $scope.productObj.toDate = $('#datepickerTo').datepicker('getFormattedDate')
    });

    $scope.selectedCountry = function (selected) {
        
        if (selected && typeof(selected.description) !== 'undefined') {
            $scope.productObj.countryID = selected.description.CountryID;
            $scope.productObj.countryCode = selected.description.CountryCode;
            $scope.productObj.countryName = selected.description.CountryName;
            $scope.productObj.countryStatus = selected.description.Status;
            
        }
    };

    $scope.continue = function (count) {

        if (angular.isUndefined($scope.productObj.countryID) || angular.isUndefined($scope.productObj.startDate)){
            $scope.response = false;
            if (angular.isUndefined($scope.productObj.startDate)){
                $('#datepickerFrom').removeClass("dateRangePicker");
                $('#datepickerFrom').addClass("dateRangePickerAfter");
            }else{
                $('#datepickerFrom').removeClass("dateRangePickerAfter");
                $('#datepickerFrom').addClass("dateRangePicker");
            }
            
            if (angular.isUndefined($scope.productObj.countryID)){
                $('#autocomplete').removeClass("form-control-small");
                $('#autocomplete').addClass("form-control-smallAfter");
            }else{
                $('#autocomplete').removeClass("form-control-smallAfter");
                $('#autocomplete').addClass("form-control-small");
            }
        }
        else{
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
                $scope.productObj.buyer = $scope.buyer;
                $state.go('posttravel.product', {productObj: $scope.productObj});
            } else if (count == 3) {
                $state.go('posttravel.review', {productObj: $scope.productObj});
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