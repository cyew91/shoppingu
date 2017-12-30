'use strict';

angular.module('mean.articles')
  .controller('SearchResultController', ['$scope', 'Global', '$stateParams', '$state', 'GetProductResult', 'GetProdCatAndSubCat', 'GetProductDetailByProdSubCatID', function($scope, Global, $stateParams, $state, GetProductResult, GetProdCatAndSubCat, GetProductDetailByProdSubCatID){
    $scope.global = Global;
    $scope.profileId = $stateParams.profileId;
    $scope.product = $stateParams.productDetailID;

    $scope.menuTree = function() {
      GetProdCatAndSubCat.query(function (result) {
        $scope.menuTreeResult = result;
      });
    }

    $scope.openFirst = function (index) {
      if ($('#'+$scope.menuTreeResult[index].ProductCatID).hasClass("expanded"))
      {
        $('#'+$scope.menuTreeResult[index].ProductCatID).removeClass("expanded");
      }
      else
      {
        $('#'+$scope.menuTreeResult[index].ProductCatID).addClass("expanded");
        for (var i=0; i<$scope.menuTreeResult.length;i++){
          if ($scope.menuTreeResult[i] != $scope.menuTreeResult[index])
            $('#'+$scope.menuTreeResult[i].ProductCatID).removeClass("expanded");
        }
      }
      $scope.count = index;
    };

    $scope.getProductDetail = function (index) {
      GetProductDetailByProdSubCatID.query({
        productSubCatId: $scope.menuTreeResult[$scope.count].t_product_subcats[index].ProductSubCatID
      },function(result) {
        $scope.product = result;
    
      });
    };

    $scope.currentPage = 1;
    //$scope.productLength = $scope.product.length;
  }]);

