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
    }])

.directive('message', ['$timeout',function($timeout) {
    return {
        restrict: 'E',
        templateUrl: 'views/directives/message.html',
        scope:{
            info:"=",
            self:"=",
            scrolltothis:"&"
        },
        link:function(scope, elem, attrs){
                scope.time=new Date();
                $timeout(scope.scrolltothis);
                // $timeout(function(){
                //     elem.find('.avatar').css('background',scope.info.color);
                // });
        }
    };
}])
.directive('user', ['$timeout',function($timeout) {
    return {
        restrict: 'E',
        templateUrl: 'user.html',
        scope:{
            info:"=",
            iscurrentreceiver:"=",
            setreceiver:"&"
        },
        link:function(scope, elem, attrs,chatCtrl){
            $timeout(function(){
                elem.find('.avatar').css('background',scope.info.color);
            });
        }
    };
}]);