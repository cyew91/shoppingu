'use strict';

angular.module('mean.system')
  .directive('productShowcase', [function(){
    return{
      restrict:'EA',
      scope : {
        productTitle  : '@',
        productImg : '@'
      },
      templateUrl : './views/common_directives/product_showcase.html',
      transclude: true,
      bindToController : true,
      controllerAs  : 'productShowcaseCtrl',
      controller  : function(){

      }
    }
  }]);
