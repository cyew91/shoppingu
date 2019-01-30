'use strict'

angular.module('mean').controller('ReviewController', ['$scope', '$state', '$stateParams', '$rootScope', 'CreatePost', 'CreateRequest',
    function ($scope, $state, $stateParams, $rootScope, CreatePost, CreateRequest) {
    $scope.productObj = $stateParams.productObj;
    var hasTravel = $rootScope.hasTravel;
    var buyer = $scope.productObj.buyer;

    $scope.init = function () {
        if (!hasTravel){
            $state.go('travel');
            $window.location.reload();
        }
    };

    if (buyer){
        $scope.savePostTravel = function(){
            var createRequest = new CreateRequest({
                // Create Request
                countryID: $scope.productObj.id,
                profileId: $scope.productObj.profileId,

                // Create Product
                productList: $scope.productObj.productList,
            });

            createRequest.$save(function (response) {
                //if (response.result === 'success') {
                    
                //}
            });
            $('#myModal').modal('show');
            $('#myModal').on('hidden.bs.modal', function (e) {
                $state.go('userprofile');
            });
        };
    }
    else{
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
    }

    

}]);