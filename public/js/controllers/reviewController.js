'use strict'

angular.module('mean').controller('ReviewController', ['$scope', '$state', '$stateParams', '$rootScope', 'CreatePost', 'CreateRequest',
    function ($scope, $state, $stateParams, $rootScope, CreatePost, CreateRequest) {
    $scope.productObj = $stateParams.productObj;
    
    //var productImageObj = $stateParams.productObj.productList[0].productImage;
    var hasTravel = $rootScope.hasTravel;
    var buyer = $scope.productObj.buyer;

    $scope.init = function () {
        if (!hasTravel){
            $state.go('travel');
            $window.location.reload();
        }
    };

    if(buyer){
        localStorage.setItem("imageObj", JSON.stringify($scope.productObj.productList[0].productImage));
    }

    $scope.savePostTravel = function(){
        if (buyer){
            // Fix the bug which Image will disappear after click confirm button
            $scope.productObj.productList[0].productImage = JSON.parse(localStorage.getItem("imageObj"))
            var createRequest = new CreateRequest({
                // Create Request
                countryID: $scope.productObj.id,
                profileId: $scope.productObj.profileId,

                // Create Product
                productList: $scope.productObj.productList,
                // productList: JSON.parse(localStorage.getItem("imageObj")),
            });

            createRequest.$save(function (response) {
                // if (response.result === 'success') {
                //     $('#myModal').modal('show');
                //     $('#myModal').on('hidden.bs.modal', function (e) {
                //         $state.go('userprofile');
                //     });
                // }
                // else{
                //     $('#myModal').modal('show');
                //     $('#myModal').on('hidden.bs.modal', function (e) {
                //         $state.go('userprofile');
                //     });
                // }
            });
            $('#myModal').modal('show');
            $('#myModal').on('hidden.bs.modal', function (e) {
                $state.go('userprofile');
            });
        }
        else {
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
        }
        
    };

}]);