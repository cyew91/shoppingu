'use strict';

angular.module('mean.system')
.controller('RequestController', ['$scope', 'Global', '$stateParams', '$state', '$window', 'GetRequestProductByProfileId',
function($scope, Global, $stateParams, $state, $window, GetRequestProductByProfileId){
    // $scope.global = Global;
    $scope.profile = $stateParams.profile;
    $scope.userId = $window.sessionStorage.getItem("id");

    if (angular.isUndefined($stateParams.profile) || $stateParams.profile == ""){
        $state.go('userprofile');
    } 
    else{
        $scope.initMyRequests = function () {
            GetRequestProductByProfileId.query({
                requestprofileId: $scope.userId
            }, function (result) {
                $scope.request = result;
                // $scope.imageName = 
            });
        };
    }
    
    $scope.goToMyOrder = function () {
        $state.go('order', {profile: $scope.profile});
    };

    $scope.goToMyProfile = function () {
        $state.go('userprofile');
    };

    $scope.goToMyAddress = function () {
        $state.go('address', {profile: $scope.profile});
    };

    $scope.goToMyPost = function () {
        $state.go('post', {profile: $scope.profile});
    };

}]);
