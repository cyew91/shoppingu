'use strict'

angular.module('mean').controller('TravelController', ['$scope', '$state', '$stateParams', 'GetCountryList', '$rootScope', '$window', '$anchorScroll', 
function ($scope, $state, $stateParams, GetCountryList, $rootScope, $window, $anchorScroll) {
    $scope.buyer = $stateParams.buyer;
    $scope.profileId = $window.sessionStorage.getItem("id");
    var startDate;
    var toDate;
    $rootScope.hasTravel = true;

    $scope.count = 1;

    if (!$scope.buyer){
        $rootScope.firstProgressBar = "1. Post Travel";
        $rootScope.secondProgressBar = "2. Post Product";
    }
    else{
        $rootScope.firstProgressBar = "1. Select Item Country";
        $rootScope.secondProgressBar = "2. Request Product";
    }
    

    $scope.init = function () {
        GetCountryList.query(function (list) {
            $scope.countryList = list;
        });

        initStartDate();
    };

    // var initDatePicker = function () {
    //     $('.date').datepicker({
    //     autoclose: true,
    //     keepEmptyValues: true,
    //     format: 'yyyy-mm-dd',
    //     clearBtn: true,
    //     startDate : new Date()
    //     });
    // }

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
        else{
            if (!$scope.buyer){
                if (angular.isUndefined(startDate))
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
                    $scope.TravelObj.buyer = $scope.buyer;
                    $state.go('postproduct', { travelObj: $scope.TravelObj });
                    // Scroll to top
                    $anchorScroll();
                }
            }
            else{
                $scope.TravelObj.profileId = $scope.profileId;
                $scope.TravelObj.buyer = $scope.buyer;
                $state.go('postproduct', { travelObj: $scope.TravelObj });
                // Scroll to top
                $anchorScroll();
            }
        }
        
        
    }

}]);


