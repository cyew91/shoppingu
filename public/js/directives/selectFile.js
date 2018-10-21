'use strict';

angular.module('mean.system')
  .directive("ngFileSelect", function(fileReader, $timeout) {
    return {
      scope: {
        ngModel: '=',
        ngFileName: '='
      },
      link: function($scope, el) {
        function getFile(file) {
          $scope.ngFileName = file.name;
          fileReader.readAsDataUrl(file, $scope)
            .then(function(result) {
              $timeout(function() {
                $scope.ngModel = result;
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
