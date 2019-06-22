'use strict';

angular.module('mean.system')
.controller('RequestController', ['$scope', '$timeout', 'Global', '$stateParams', '$state', '$window', 'GetRequestProductByProfileId', 'UpdateGetRequestProductByProfileId',
function($scope, $timeout, Global, $stateParams, $state, $window, GetRequestProductByProfileId, UpdateGetRequestProductByProfileId){
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

    $scope.deleteRequest = function (index) {
        var postRequest = $scope.request[index];
        postRequest.postRequestId = postRequest.id;

        if (!postRequest.updated) {
            postRequest.updated = [];
        }

        postRequest.updated.push(new Date().getTime());

        UpdateGetRequestProductByProfileId.update({
            updaterequestprofileId: postRequest.postRequestId
        }, function (result) {
            $scope.msg = result;
        });

        $timeout( function(){
            $scope.initMyRequests();
        }, 500);
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
