'use strict';

angular.module('mean.system').controller('HeaderController', ['$scope', 'SignOut', 'CheckLoggedIn', '$state', '$rootScope', 'GetProductID', function ($scope, SignOut, CheckLoggedIn, $state, $rootScope, GetProductID) {
    $scope.showSearchBar = false;
    $scope.isCollapsed = false;
    $scope.productTravel = [];
    $scope.productRequest = [];

    $rootScope.currentUser = CheckLoggedIn.get(function (response) {
        if(response !== '0'){
            return response;
        }else{
            $scope.errorMessage = 'Not logged in';
            return "";
        }
    });

    $scope.SignOut = function () {
        SignOut.get(function (response) {
            if (response.status === 'success') {
                $rootScope.currentUser = null;
                $state.go('home');
            }
        });
    };

    $scope.openSearch = function () {
        $('#mainSearchForm').addClass("fadeIn");
        $scope.showSearchBar = true;
    };

    $scope.closeSearch = function () {
        $('#mainSearchForm').removeClass('fadeIn');
        $('#mainSearchForm').addClass('fadeOut');
        $scope.showSearchBar = false;
    };

    $scope.search = function () {
        GetProductID.query({
            productdetailname: $scope.inputSearch
        }, function (result) {
            $scope.product = result;
             for(var i=0;i<$scope.product.length;i++){
                if ($scope.product[i].t_product.PostType == 0)
                  $scope.productTravel.push($scope.product[i]);
                else
                  $scope.productRequest.push($scope.product[i]);
            }
            $state.go('searchResult', { prodTravel: $scope.productTravel, prodRequest: $scope.productRequest });
            $scope.productTravel = [];
            $scope.productRequest = [];
        });
    };


}]);