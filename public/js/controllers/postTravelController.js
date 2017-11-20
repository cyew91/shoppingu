'use strict'

angular.module('mean').controller('PostTravelController', ['$scope', 'GetCountryList', function ($scope, GetCountryList) {

    $scope.countryList = [];
    $scope.fooDate = new Date;
    var totalFields = 10;

    const init = function () {
        GetCountryList.query(function (list) {
            $scope.countryList = list;
        });

        totalFields = $("#input-progress").find("input, select").length;
        updateInputProgress();
    };

    init();

    $('.js-example-basic-single').select2();

    $('.input-daterange').datepicker({
        autoclose: true,
        keepEmptyValues: true,
        format: 'dd-mm-yyyy'
    });

    $('#datepickerFrom').datepicker().on('changeDate', function (e) {
        updateInputProgress();
    });

    $('#datepickerTo').datepicker().on('changeDate', function (e) {
        updateInputProgress();
    });

    function updateInputProgress() {
        var filledFields = 0;
        $("#input-progress").find("input, select").each(function () {
            if ($(this).val() != "") {
                filledFields++;
            }
        });

        var percent = Math.ceil(100 * filledFields / totalFields);
        $("#progress-inputs .progress-bar").attr("aria-valuenow", percent).width(percent + "%").find(".sr-only").html(percent + "% Complete");

        return percent;
    }

    //Input Progress
    $("#input-progress").click(function () {
        updateInputProgress();
    });
    $("#input-progress .btn-success").click(function () {
        var percent = updateInputProgress();
        if (percent == 100) {
            alert("Finished inputs successfully!");
        }
    })
}]);