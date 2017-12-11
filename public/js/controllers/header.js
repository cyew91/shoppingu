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
            $state.go('searchResult', { productDetailID: result });
        });
    };


}]);
