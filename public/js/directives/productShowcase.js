'use strict';

angular.module('mean.system')
  .directive('productShowcase', [function(){
    return{
      restrict:'EA',
      scope : {
        productTitle  : '@',
        productImg : '@'
      },
      templateUrl : './views/directives/productShowcase.html',
      transclude: true,
      bindToController : true,
      controllerAs  : 'productShowcaseCtrl',
      controller  : function(){
      }
    };
  }]);
