

angular.module('test', [])
  .directive('editPersonDialog', [function() {
  return {
    restrict: 'E',
    scope: {
      ngModel: '=',
    },
    link: function(scope, element, attributes) {
      scope.$watch('model.visible', function(newValue) {
        var modalElement = element.find('.modal');
        modalElement.modal(newValue ? 'show' : 'hide');
      });
      
      element.on('shown.bs.modal', function() {
        scope.$apply(function() {
          scope.model.visible = true;
        });
      });

      element.on('hidden.bs.modal', function() {
        scope.$apply(function() {
          scope.model.visible = false;
        });
      });
      
    },
    templateUrl: 'edit-person-dialog.html',
  };
}]);