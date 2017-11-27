'use strict';

angular.module('mean.system')
  .controller('PostController', ['$scope', 'Global', '$stateParams', 'GetTravel', function($scope, Global, $stateParams, GetTravel){
    $scope.global = Global;

    $scope.getTrip = function() {
      GetTravel.query(function(result) {
          $scope.travel = result;
      });
    };
  }]);
