'use strict';

angular.module('mean.system')
  .controller('UploadImageController', ['$scope', 'Global', '$stateParams', function($scope, Global, $stateParams){
    $scope.global = Global;

   alert('UploadImageController');
}]);
