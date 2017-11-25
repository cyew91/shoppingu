'use strict';

angular.module('mean.system').controller('HeaderController', ['$scope', 'Global', 'SignOut', '$state', 'GetProductID', function ($scope, Global, SignOut, $state, GetProductID) {
    $scope.global = Global;
    //$scope.productDetailId = $stateParams.productDetailId;    

    $scope.menu = [{
        "title": "Articles",
        "state": "articles"
    }, {
        "title": "Create New Article",
        "state": "createArticle"
    }];

    $scope.isCollapsed = false;

    $scope.SignOut = function(){
        SignOut.get(function(response){
            if(response.status === 'success'){
                $scope.global = null;
                $state.go('home');
            }
        });
    };

    //$scope.search = function(){
       
    //};

    $scope.search = function() {
        GetProductID.query({
            productName: $scope.inputSearch
        }, function(result) {
            //$scope.firstName = result.FirstName;
            //$scope.lastName = result.LastName;
            $scope.product = result;
            $state.go('searchResult',{productDetailID: result});
        });
      };

    
}]);
