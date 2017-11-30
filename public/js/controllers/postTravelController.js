'use strict'

angular.module('mean').controller('PostTravelController', ['$scope', '$state', 'GetCountryList', function ($scope, $state, GetCountryList) {

    $scope.countryList = [];

    const init = function () {
        GetCountryList.query(function (list) {
            $scope.countryList = list;
        });
    };

    init();

    $('.js-example-basic-single').select2();

    $('.input-daterange').datepicker({
        autoclose: true,
        keepEmptyValues: true,
        format: 'dd-mm-yyyy',
        clearBtn: true
    });

    $scope.submitTravelForm = function (isValid) {

        $('#autocomplete_value').prop('required', true);
        $('#autocomplete_value').removeAttr('placeholder');

        if (isValid) {
            alert("yeah");
        } else {
            alert("damn");
        }
    }

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

        if (count == 2) {
            console.log('2');
            $state.go('posttravel.product');
        } else if (count == 3) {
            $state.go('posttravel.review');
        }
    }

    $scope.back = function (count) {
        $('#text' + count).css('display', 'none');
        $('#textStep' + count).css('display', 'block');

        $('#text' + (count + 1)).css('display', 'block');
        $('#textStep' + (count + 1)).css('display', 'none');

        $('#check' + (count)).css('display', 'none');
        $('#check' + (count + 1)).css('display', 'none');

        console.log('#text' + count);

        var $bar = $(".ProgressBar");
        if ($bar.children(".is-current").length > 0) {
            $bar.children(".is-current").removeClass("is-current").prev().removeClass("is-complete").addClass("is-current");
        } else {
            $bar.children(".is-complete").last().removeClass("is-complete").addClass("is-current");
        }

        if (count == 2) {
            $state.go('posttravel.product');
        } else if (count == 3) {
            $state.go('posttravel.review');
        } else if (count == 1) {
            $state.go('posttravel.travel');
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