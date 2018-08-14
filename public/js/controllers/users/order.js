'use strict';
angular.module('mean.system')
  .controller('OrderController', ['$scope', 'Global', '$stateParams', 'GetOrderByProfileId', '$rootScope', function($scope, Global, $stateParams, GetOrderByProfileId, $rootScope){
    $scope.global = Global;
    $scope.profileId = $rootScope.currentUser.ProfileID;

    // $scope.a = $stateParams.a;
    // $scope.b = $stateParams.b;

    $scope.openProductDetail = function() {
      GetOrderByProfileId.query({
        cprofileId: $scope.profileId
      }, function(result) {
          $scope.order = result;
      });
    };
    
    $scope.getProductByProductDetailId = function(ProductDetailID) {
      for (var a = 0; a >= 0; a++){
        if (ProductDetailID == $scope.order[a].ProductDetailID)
          $scope.Amount = $scope.order[a].Amount;
      }
    };

    // data-* attributes to scan when populating modal values
    var ATTRIBUTES = ['myamount', 'myvar', 'bb'];

    $scope.triggerClick = function (e) {
    // $('[data-toggle="modal"]').on('click', function (e) {
      // convert target (e.g. the button) to jquery object
      var $target = $(e.target);
      // modal targeted by the button
      var modalSelector = $target.data('target');
      
      // iterate over each possible data-* attribute
      ATTRIBUTES.forEach(function (attributeName) {
        // retrieve the dom element corresponding to current attribute
        var $modalAttribute = $(modalSelector + ' #modal-' + attributeName);
        var dataValue = $target.data(attributeName);
        
        // if the attribute value is empty, $target.data() will return undefined.
        // In JS boolean expressions return operands and are not coerced into
        // booleans. That way is dataValue is undefined, the left part of the following
        // Boolean expression evaluate to false and the empty string will be returned
        $modalAttribute.text(dataValue || '');
      });
    };

}]);


