'use strict';
angular.module('mean.auth').factory('socket', function($rootScope) {
    var socket = io(); //默认连接部署网站的服务器
    return {
        on: function(eventName, callback) {
            socket.on(eventName, function() {
                var args = arguments;
                $rootScope.$apply(function() {   //手动执行脏检查
                    callback.apply(socket, args);
                });
            });
        },
        emit: function(eventName, data, callback) {
            socket.emit(eventName, data, function() {
                var args = arguments;
                $rootScope.$apply(function() {
                    if(callback) {
                        callback.apply(socket, args);
                    }
                });
            });
        }
    };
});

angular.module('mean').service('chat', ['$resource', function ($resource) {
    return $resource('/chat');
}]);

angular.module('mean').factory('userService', function ($rootScope) {
    return {
        get: function (users, nickname) {
            if (users instanceof Array) {
                for (var i = 0; i < users.length; i++) {
                    if (users[i].nickname === nickname) {
                        return users[i];
                    }
                }
            } else {
                return null;
            }
        }
    };
});


angular.module('mean').service('chat', ['$resource', function($resource){
    return $resource('/chat');
}]);