'use strict'

angular.module('mean').controller('ReviewController', ['$scope', '$state', '$stateParams', 'CreatePost', '$rootScope', function ($scope, $state, $stateParams, CreatePost, $rootScope) {
    $scope.productObj = $stateParams.productObj;
    var hasTravel = $rootScope.hasTravel;

    $scope.init = function () {
        if (!hasTravel){
            $state.go('travel');
            $window.location.reload();
        }
    };

    $scope.savePostTravel = function(){   
        var createPost = new CreatePost({
            // Create Travel
            countryID: $scope.productObj.id,
            profileId: $scope.productObj.profileId,
            status: "Pending",
            startDate: $scope.productObj.startDate,
            toDate: $scope.productObj.toDate,
            //isRequest: $scope.productObj.buyer,
            //isExpired: 0,

            // Create Product
            productList: $scope.productObj.productList,
        });

        createPost.$save(function (response) {
            //if (response.result === 'success') {
                
            //}
        });
        $('#myModal').modal('show');
        $('#myModal').on('hidden.bs.modal', function (e) {
            $state.go('userprofile');
        });
    };

}]);