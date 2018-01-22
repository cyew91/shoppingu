'use strict';

angular.module('mean.system').controller('HeaderController', ['$scope', 'Global', 'SignOut', '$state', 'GetProductID', function ($scope, Global, SignOut, $state, GetProductID) {
    $scope.global = Global;
    $scope.menu = [{
        "title": "Articles",
        "state": "articles"
    }, {
        "title": "Create New Article",
        "state": "createArticle"
    }];
    $scope.showSearchBar = false;
    $scope.isCollapsed = false;
    $scope.productTravel = [];
    $scope.productRequest = [];

    $scope.SignOut = function () {
        SignOut.get(function (response) {
            if (response.status === 'success') {
                $scope.global = null;
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
