'use strict';

angular.module('mean.system')
    .directive('chatMessage', [function () {
        return {
            restrict: 'E',
            templateUrl: './views/directives/chatMessage.html',
            scope: {
                info: "=",
                self: "=",
                scrolltothis: "&"
            },
            link: function (scope, elem, attrs) {
                scope.time = new Date();
                // $timeout(scope.scrolltothis);
                // $timeout(function () {
                //     elem.find('.avatar').css('background', scope.info.color);
                // });
            }
        };
    }]);