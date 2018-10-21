'use strict';

angular.module('mean.system')
    .directive('chatTravel', [function () {
        return {
            restrict: 'E',
            templateUrl: './views/directives/chatTravel.html',
            scope: {
                info: "=",
                iscurrentreceiver: "=",
                setreceiver: "&"
            },
            link: function (scope, elem, attrs, chatCtrl) {
                // $timeout(function () {
                //     elem.find('.avatar').css('background', scope.info.color);
                // });
            }
        };
    }]);