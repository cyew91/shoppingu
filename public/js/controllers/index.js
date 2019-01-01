'use strict';

angular.module('mean.system')
  .controller('IndexController', ['$scope', 'Global', '$state', '$anchorScroll', 'GetProdIdByProdCatCode', 'GetProdDetailByProdCatCode', 'GetAllTravelProduct', 
    function ($scope, Global, $state, $anchorScroll, GetProdIdByProdCatCode, GetProdDetailByProdCatCode, GetAllTravelProduct) {
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

    $scope.initFeatureProduct = function(){
        GetAllTravelProduct.query(function (list) {
            $scope.featuredProduct = list;
            for (var i=0;i<list.length;i++){
                $scope.featuredProduct[i].imageName = list[i].post_travel_product_documents[0].imageName;
            }
        });
    };

    $scope.goToProductDetails = function (index) {
        $state.go('productdetails', {prodTravel: $scope.featuredProduct[index]});
        $anchorScroll();
    };
        
}]);
