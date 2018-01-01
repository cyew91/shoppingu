'use strict'

angular.module('mean').controller('ProductController', ['$scope', '$state', '$stateParams', '$uibModal', 'GetProdCatAndSubCat', function ($scope, $state, $stateParams, $uibModa, GetProdCatAndSubCat) {

    $scope.productCategoryList = [];
    $scope.productSubCategoryList = [];

    const init = function () {
        $scope.productObj = $stateParams.productObj;

        if ($scope.productObj.productList == null) {
            $scope.productObj.productList = [];
        }

        GetProdCatAndSubCat.query(function (list) {
            $scope.productCategoryList = list;
        });

        $('#selectMainCategory').select2();
        $('#selectSubCategory').select2();
    }

    init();

    $('#selectMainCategory').on('select2:select', function (e) {
        var data = e.params.data;
        $scope.productSubCategoryList = [];

        $scope.$apply(function(){
            $scope.productCategoryList.forEach(categoryItem => {

                categoryItem['t_product_subcats'].forEach(subCategoryItem => {
                    if(subCategoryItem['ProductCatID'] === data['id']){
                        $scope.productSubCategoryList.push(subCategoryItem);
                    }
                });
            });
        });
    });

    $scope.addProductToList = function () {
        $scope.productObj.productList.push($scope.product);
        $scope.product = null;
    }

    $scope.removeFromList = function (index) {
        $scope.productObj.productList.splice(index, 1);
    }

    $scope.onRowSelect = function (product) {
        $scope.seletedProduct = Object.create(product);
        $('#modal-product').modal('show');
    }
    
    $scope.open = function (product) {
        var modalInstance = $uibModal.open({
          //scope: $scope,
          //animation: $scope.animationsEnabled,
          templateUrl: 'views/editProductDetail.html',
          controller: 'EditProductDetailController',
          //size: size,
          resolve: {
            addProductToList: function() {
              return $scope.addProductToList;
              //$('#modal-product').modal('show');
            }
          }
        })
      };
      
    $scope.continue = function (count) {
        $('#text' + count).css('display', 'none');
        $('#textStep' + count).css('display', 'block');

        $('#text' + (count - 1)).css('display', 'none');
        $('#textStep' + (count - 1)).css('display', 'none');

        $('#check' + (count - 1)).css('display', 'block');

        var $bar = $(".ProgressBar");
        if ($bar.children(".is-current").length > 0) {
            $bar.children(".is-current").removeClass("is-current").addClass("is-complete").next().addClass("is-current");
        } else {
            $bar.children().first().addClass("is-current");
        }

        if (count == 2) {
            $state.go('posttravel.product', { productObj: $scope.productObj });
        } else if (count == 3) {
            $state.go('posttravel.review', { productObj: $scope.productObj });
        }
    }

    $scope.back = function (count) {
        $('#text' + count).css('display', 'none');
        $('#textStep' + count).css('display', 'block');

        $('#text' + (count + 1)).css('display', 'block');
        $('#textStep' + (count + 1)).css('display', 'none');

        $('#check' + (count)).css('display', 'none');
        $('#check' + (count + 1)).css('display', 'none');

        var $bar = $(".ProgressBar");
        if ($bar.children(".is-current").length > 0) {
            $bar.children(".is-current").removeClass("is-current").prev().removeClass("is-complete").addClass("is-current");
        } else {
            $bar.children(".is-complete").last().removeClass("is-complete").addClass("is-current");
        }

        if (count == 2) {
            $state.go('posttravel.product', { productObj: $scope.productObj });
        } else if (count == 3) {
            $state.go('posttravel.review', { productObj: $scope.productObj });
        } else if (count == 1) {
            $state.go('posttravel.travel', { productObj: $scope.productObj });
        }
    }
}]);