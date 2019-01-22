'use strict';

angular.module('mean.articles')
  .controller('SearchResultController', ['$scope', 'Global', '$stateParams', '$state', '$anchorScroll', 'GetProdCatAndSubCat', 'GetProductDetailByProdSubCatID',
    function($scope, Global, $stateParams, $state, $anchorScroll, GetProdCatAndSubCat, GetProductDetailByProdSubCatID){
    $scope.global = Global;
    $scope.profileId = $stateParams.profileId;
    
    $scope.productTravel = $stateParams.prodTravel;
    // $scope.productRequest = $stateParams.prodRequest;
    
    // Travel product
    $scope.tFilteredTodos = [];
    $scope.tCurrentPage = 1;
    $scope.tNumPerPage = 9;
    $scope.tMaxSize = 5;

    // Request product
    // $scope.rFilteredTodos = [];
    // $scope.rCurrentPage = 1;
    // $scope.rNumPerPage = 12;
    // $scope.rMaxSize = 5;

    $scope.menuTree = function() {
      GetProdCatAndSubCat.query(function (result) {
        $scope.menuTreeResult = result;
      });
    };

    $scope.openFirst = function (index) {
      if ($('#'+$scope.menuTreeResult[index].id).hasClass("expanded"))
      {
        $('#'+$scope.menuTreeResult[index].id).removeClass("expanded");
      }
      else
      {
        $('#'+$scope.menuTreeResult[index].id).addClass("expanded");
        for (var i=0; i<$scope.menuTreeResult.length;i++){
          if ($scope.menuTreeResult[i] !== $scope.menuTreeResult[index])
            $('#'+$scope.menuTreeResult[i].id).removeClass("expanded");
        }
      }
      $scope.count = index;
    };

    // Get product from menu tree
    $scope.getProductDetail = function (index) {
      GetProductDetailByProdSubCatID.query({
        productSubCatId: $scope.menuTreeResult[$scope.count].product_sub_categories[index].id
      },function(result) {
        $scope.product = result;
        $scope.productTravel = [];
        // $scope.productRequest = [];
        $scope.todos = [];
        $scope.tFilteredTodos = [];
        // $scope.rTodos = [];
        // $scope.rFilteredTodos = [];
        $scope.tCurrentPage = 1;
        // $scope.rCurrentPage = 1;
        var begin = (($scope.tCurrentPage - 1) * $scope.tNumPerPage);
        var end = $scope.tCurrentPage * $scope.tNumPerPage;
        // var rBegin = (($scope.rCurrentPage - 1) * $scope.rNumPerPage);
        // var rEnd = rBegin + $scope.rNumPerPage;
        
        for(var i=0;i<$scope.product.length;i++){
          // if ($scope.product[i].t_product.PostType === 0)
          // {
            //$scope.product[i].post_travel_product_documents[0].imagePath = $scope.product[i].post_travel_product_documents[0].imagePath.substring(6, 10);
            $scope.product[i].imageName = $scope.product[i].post_travel_product_documents[0].imageName;
            $scope.productTravel.push($scope.product[i]);
            $scope.todos.push($scope.product[i]);
            $scope.tFilteredTodos = $scope.todos.slice(begin, end);
            $scope.tTotalItems = $scope.productTravel.length;
          // }
          // else
          // {
          //   $scope.productRequest.push($scope.product[i]);
          //   $scope.rTodos.push($scope.product[i]);
          //   $scope.rFilteredTodos = $scope.rTodos.slice(rBegin, rEnd);
          //   $scope.rTotalItems = $scope.productRequest.length;
          // }
        }
        $scope.showBegin = begin + 1;
        $scope.showEnd = begin + $scope.tFilteredTodos.length;
        if ($scope.tFilteredTodos.length < 1){
          $scope.showBegin = 0;
        }
      });
    };

    $scope.goToProductDetails = function (index) {
      $state.go('productdetails', {prodTravel: $stateParams.prodTravel[index]});
    };

    //Tab
    // $scope.selectedTab = function (number){
    //   if (number === 1){
    //     $('#profile1').addClass("active");
    //     $('#request').removeClass("active");
    //   }
    //   else{
    //     $('#profile1').removeClass("active");
    //     $('#request').addClass("active");
    //   }
    // };

    // Pagination setup
    if ($scope.productTravel != null)
    {
      $scope.makeTodos = function() {
        $scope.todos = [];
        for (var i=0;i<$scope.productTravel.length;i++) {
          // $scope.todos.push($scope.productTravel[i]);
          $scope.productTravel[i].imageName = $scope.productTravel[i].post_travel_product_documents[0].imageName;
          $scope.todos.push($scope.productTravel[i]);
        }
        // $scope.rTodos = [];
        // for (var j=0;j<$scope.productRequest.length;j++) {
        //   $scope.rTodos.push($scope.productRequest[j]);
        // }
      };
      $scope.makeTodos(); 
      
      $scope.isTravel = function (number){
        if (number === 0)
        {
          $scope.$watch("tCurrentPage", function() {
            var begin = (($scope.tCurrentPage - 1) * $scope.tNumPerPage);
            var end = $scope.tCurrentPage * $scope.tNumPerPage;
            $scope.tFilteredTodos = $scope.todos.slice(begin, end);
            $scope.showBegin = begin + 1;
            $scope.showEnd = begin + $scope.tFilteredTodos.length;
            if ($scope.tFilteredTodos.length < 1){
              $scope.showBegin = 0;
            }
          });
        }
        else
        {
          // $scope.$watch("rCurrentPage + rNumPerPage", function() {
          //   var rBegin = (($scope.rCurrentPage - 1) * $scope.rNumPerPage);
          //   var rEnd = rBegin + $scope.rNumPerPage;
          //   $scope.rFilteredTodos = $scope.rTodos.slice(rBegin, rEnd);
          // });
        }
        $anchorScroll();
      };
      $scope.tTotalItems = $scope.productTravel.length;
      // $scope.rTotalItems = $scope.productRequest.length;
    };

    // Sort By Filtering
    $scope.productFilter = function(selected) {
      // make sure it a valid column
      var selectItem = "";
      if (selected == "lowToHigh"){
        var cols = [{
          name: 'amount',
          orderDesc: false
        }];
      }
      else{
        var cols = [{
          name: 'amount',
          orderDesc: true
        }];
      }
      selectItem = cols[0].name;
      var column = cols.find(function(col) {
        return col.name === selectItem;
      });
  
      if (!column) return;
      
      // orderDesc = true
      column.orderDesc = !column.orderDesc;
  
      //if false = 1, true = -1
      var order = !column.orderDesc ? 1 : -1;
      
      $scope.todos.sort(function(a, b) {
        if (a[column.name] < b[column.name])
          return 1 * order;
        if (a[column.name] > b[column.name])
          return -1 * order;
        return 0;
      });
      
      var begin = (($scope.tCurrentPage - 1) * $scope.tNumPerPage);
      var end = $scope.tCurrentPage * $scope.tNumPerPage;
      $scope.tFilteredTodos = $scope.todos.slice(begin, end);
      $scope.showBegin = begin + 1;
      $scope.showEnd = begin + $scope.tFilteredTodos.length;
      if ($scope.tFilteredTodos.length < 1){
        $scope.showBegin = 0;
      }
    };

}]);

