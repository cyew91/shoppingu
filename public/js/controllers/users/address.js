'use strict';

angular.module('mean.system')
.controller('AddressController', ['$scope', 'Global', '$stateParams', '$rootScope', '$state', 'GetUserAddressById', 'GetCountryList', 
function($scope, Global, $stateParams, $rootScope, $state, GetUserAddressById, GetCountryList){
    $scope.global = Global;
    $scope.profileId = $stateParams.profileId;
    $scope.profile = $stateParams.profile;

    if (angular.isUndefined($stateParams.profile) || $stateParams.profile == ""){
        $state.go('userprofile');
    }

    $scope.initCountry = function () {
        GetCountryList.query(function (list) {
            $scope.countryList = list;
        });
    };

    $scope.initAddress = function() {
        GetUserAddressById.get({
            id: $rootScope.currentUser.id
        }, function(result) {
            $scope.profile = result;
            $scope.selectedOption = result.country_id;
        });
    };

    $scope.updateAddress = function() {
        $scope.profile.country_id = $scope.selectedOption;
        var profile = $scope.profile;
        if (!profile.updated) {
            profile.updated = [];
        }
        profile.updated.push(new Date().getTime());

        profile.$update(function(response){
            if (response.result === "success") {
                $("#myModal").modal("show");
            } else {
                $scope.errorMsg = response.message;
            }
        });
    };

    $("#myModal").on("hidden.bs.modal", function (e) {
        location.reload();
    });

    $scope.goToMyOrder = function () {
        $state.go('order', {profile: $scope.profile});
    };

    $scope.goToMyRequest = function () {
        $state.go('request', {profile: $scope.profile});
    };

    $scope.goToMyProfile = function () {
        $state.go('userprofile');
    };

    $scope.goToMyPost = function () {
        $state.go('post', {profile: $scope.profile});
    };

}]);
