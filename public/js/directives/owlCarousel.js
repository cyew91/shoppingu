'use strict';

angular.module('mean.system')
.directive("owlCarousel", function() {
  return {
      restrict: 'E',
      transclude: false,
      link: function (scope) {
          scope.initCarousel = function(element) {
            // provide any default options you want
              var defaultOptions = {
                // items: 1,
				// dots: true,
				// nav: false
				// mouseDrag: false
              };
              var customOptions = scope.$eval($(element).attr('data-options'));
              // combine the two options objects
              for(var key in customOptions) {
                  defaultOptions[key] = customOptions[key];
              }
              // init carousel
              $(element).owlCarousel(defaultOptions);
          };
      }
  }
})
.directive('owlCarouselItem', [function() {
  return {
      restrict: 'A',
      transclude: false,
      link: function(scope, element) {
        // wait for the last item in the ng-repeat then call init
          if(scope.$last) {
              scope.initCarousel(element.parent());
          }
      }
  };
}]);