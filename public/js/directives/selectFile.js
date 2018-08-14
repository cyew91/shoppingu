'use strict'

angular.module('mean.system')
  .directive("ngFileSelect", function(fileReader, $timeout) {
    return {
      scope: {
        ngModel: '=',
        ngAa: '='
      },
      link: function($scope, el, $rootScope) {
        function getFile(file) {
          fileReader.readAsDataUrl(file, $scope)
            .then(function(result) {
              $timeout(function() {
                $scope.ngModel = result;
                $scope.ngAa = file.name;
              });
            });
        }

        el.bind("change", function(e) {
          var file = (e.srcElement || e.target).files[0];
          getFile(file);
        });
      }
    };
  });
