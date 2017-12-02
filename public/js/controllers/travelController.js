'use strict'

angular.module('mean').controller('TravelController', ['$scope', '$state', '$stateParams', 'GetCountryList', function ($scope, $state, $stateParams, GetCountryList) {

    $scope.countryList = [];

    const init = function () {
        GetCountryList.query(function (list) {
            $scope.countryList = list;
        });

        if($stateParams.productObj == null){
            console.log($stateParams.productObj == null)
            $scope.productObj={
                count: 1
            }
        }else{
            $scope.productObj = $stateParams.productObj;
            console.log($scope.productObj)
        }
    };

    init();

    $('.input-daterange').datepicker({
        autoclose: true,
        keepEmptyValues: true,
        format: 'dd-mm-yyyy',
        clearBtn: true
    });

    $('#datepickerFrom').on('changeDate', function() {
        $scope.productObj.startDate = $('#datepickerFrom').datepicker('getFormattedDate');
    });

    $('#datepickerTo').on('changeDate', function() {
        $scope.productObj.toDate = $('#datepickerTo').datepicker('getFormattedDate')
    });

    $scope.selectedCountry = function (selected) {
        if (selected) {
            $scope.productObj.countryId = selected.description.CountryID;
        }
    };

    $scope.continue = function (count) {
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

        console.log(count);
        if (count == 2) {
            console.log($scope.productObj);
            $state.go('posttravel.product', {productObj: $scope.productObj});
        } else if (count == 3) {
            console.log($scope.productObj);
            $state.go('posttravel.review', {productObj: $scope.productObj});
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