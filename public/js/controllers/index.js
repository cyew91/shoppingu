'use strict';

angular.module('mean.system')
  .controller('IndexController', ['$scope', 'Global', '$state', '$anchorScroll', 'GetProdIdByProdCatCode', 'GetProdDetailByProdCatCode', 
    function ($scope, Global, $state, $anchorScroll, GetProdIdByProdCatCode, GetProdDetailByProdCatCode) {
    $scope.global = Global;
    var productCategoryId = '';
    var productCategory = [];

    $scope.viewProduct = function(productCategoryCode) {
        GetProdIdByProdCatCode.get({
            productcategorycode: productCategoryCode
        }, function(result){
            productCategoryId = result.id;
            getProductDetail();
        }); 
    };

    var getProductDetail = function(){
        GetProdDetailByProdCatCode.query({
            productcategoryid: productCategoryId
        }, function(result2){
            productCategory = result2;
            $state.go('searchResult', {prodTravel: productCategory});
            $anchorScroll();
        });
    };
      
  }]);
