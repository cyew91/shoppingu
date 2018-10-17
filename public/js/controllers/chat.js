'use strict';


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

angular.module('mean').controller("CreateChat", ['$scope', 'socket', 'userService', 'chat', function ($scope, socket, userService, chat) {
    var messageWrapper = $('.message-wrapper');
    $scope.hasLogined = false;
    //$scope.receiver="";//默认是群聊
    $scope.publicMessages = [];//群聊消息
    $scope.privateMessages = {};//私信消息
    $scope.messages = $scope.publicMessages;//默认显示群聊
    $scope.users = [];//

    $scope.scrollToBottom = function () {
        messageWrapper.scrollTop(messageWrapper[0].scrollHeight);
    };

    $scope.postMessage = function () {
        $scope.nickname = "david@123";
        $scope.receiver = "john@123";
        var msg = { text: $scope.words, type: "normal", from: $scope.nickname, to: $scope.receiver };
        var rec = $scope.receiver;
        if (rec) {  //私信
            if (!$scope.privateMessages[rec]) {
                $scope.privateMessages[rec] = [];
            }
            $scope.privateMessages[rec].push(msg);
        } else { //群聊
            $scope.publicMessages.push(msg);
        }
        $scope.words = "";
        if (rec !== $scope.nickname) { //排除给自己发的情况
            socket.emit("addMessage", msg);


            var chatData = new chat({
                ChatProfileID_Sender: msg.from,
                ChatProfileID_Receiver: msg.to,
                TotalMessages: 1
            });


            chatData.$save(function (response) {
                if (response.result === 'success') {
                    $('#myModal').modal('show');
                }
            });
        }
    };

    $scope.setReceiver = function (receiver) {
        $scope.receiver = receiver;
        if (receiver) { //私信用户
            if (!$scope.privateMessages[receiver]) {
                $scope.privateMessages[receiver] = [];
            }
            $scope.messages = $scope.privateMessages[receiver];
        } else {//广播
            $scope.messages = $scope.publicMessages;
        }
        var user = userService.get($scope.users, receiver);
        if (user) {
            user.hasNewMessage = false;
        }
    };

    //收到登录结果
    socket.on('userAddingResult', function (data) {
        if (data.result) {
            $scope.userExisted = false;
            $scope.hasLogined = true;
        } else {//昵称被占用
            $scope.userExisted = true;
        }
    });

    //接收到欢迎新用户消息
    socket.on('userAdded', function (data) {
        if (!$scope.hasLogined) return;
        $scope.publicMessages.push({ text: data.nickname, type: "welcome" });
        $scope.users.push(data);
    });

    //接收到在线用户消息
    socket.on('allUser', function (data) {
        if (!$scope.hasLogined) return;
        $scope.users = data;
    });

    //接收到用户退出消息
    socket.on('userRemoved', function (data) {
        if (!$scope.hasLogined) return;
        $scope.publicMessages.push({ text: data.nickname, type: "bye" });
        for (var i = 0; i < $scope.users.length; i++) {
            if ($scope.users[i].nickname === data.nickname) {
                $scope.users.splice(i, 1);
                return;
            }
        }
    });

    //接收到新消息
    socket.on('messageAdded', function (data) {
        if (!$scope.hasLogined) return;
        if (data.to) { //私信
            if (!$scope.privateMessages[data.from]) {
                $scope.privateMessages[data.from] = [];
            }
            $scope.privateMessages[data.from].push(data);
        } else {//群发
            $scope.publicMessages.push(data);
        }
        var fromUser = userService.get($scope.users, data.from);
        var toUser = userService.get($scope.users, data.to);
        if ($scope.receiver !== data.to) {//与来信方不是正在聊天当中才提示新消息
            if (fromUser && toUser.nickname) {
                fromUser.hasNewMessage = true;//私信
            } else {
                toUser.hasNewMessage = true;//群发
            }
        }
    });
}]);

/*-----------------------------------------------------------------*/

// var app = angular.module("chatRoom", []);

// app.factory('userService', function ($rootScope) {
//     return {
//         get: function (users, nickname) {
//             if (users instanceof Array) {
//                 for (var i = 0; i < users.length; i++) {
//                     if (users[i].nickname === nickname) {
//                         return users[i];
//                     }
//                 }
//             } else {
//                 return null;
//             }
//         }
//     };
// });

// app.controller("chatCtrl", ['$scope', 'socket', 'userService', function ($scope, socket, userService) {
//     var messageWrapper = $('.message-wrapper');
//     $scope.hasLogined = false;
//     $scope.receiver = "";//默认是群聊
//     $scope.publicMessages = [];//群聊消息
//     $scope.privateMessages = {};//私信消息
//     $scope.messages = $scope.publicMessages;//默认显示群聊
//     $scope.users = [];//

//     $scope.scrollToBottom = function () {
//         messageWrapper.scrollTop(messageWrapper[0].scrollHeight);
//     }

//     $scope.postMessage = function () {
//         $scope.nickname = "david"
//         $scope.reciever = "john";
//         var msg = { text: $scope.words, type: "normal", from: $scope.nickname, to: $scope.receiver };
//         var rec = $scope.receiver;
//         if (rec) {  //私信
//             if (!$scope.privateMessages[rec]) {
//                 $scope.privateMessages[rec] = [];
//             }
//             $scope.privateMessages[rec].push(msg);
//         } else { //群聊
//             $scope.publicMessages.push(msg);
//         }
//         $scope.words = "";
//         if (rec !== $scope.nickname) { //排除给自己发的情况
//             socket.emit("addMessage", msg);
//         }
//     }

//     $scope.setReceiver = function (receiver) {
//         $scope.receiver = receiver;
//         if (receiver) { //私信用户
//             if (!$scope.privateMessages[receiver]) {
//                 $scope.privateMessages[receiver] = [];
//             }
//             $scope.messages = $scope.privateMessages[receiver];
//         } else {//广播
//             $scope.messages = $scope.publicMessages;
//         }
//         var user = userService.get($scope.users, receiver);
//         if (user) {
//             user.hasNewMessage = false;
//         }
//     }

//     //收到登录结果
//     socket.on('userAddingResult', function (data) {
//         if (data.result) {
//             $scope.userExisted = false;
//             $scope.hasLogined = true;
//         } else {//昵称被占用
//             $scope.userExisted = true;
//         }
//     });

//     //接收到欢迎新用户消息
//     socket.on('userAdded', function (data) {
//         if (!$scope.hasLogined) return;
//         $scope.publicMessages.push({ text: data.nickname, type: "welcome" });
//         $scope.users.push(data);
//     });

//     //接收到在线用户消息
//     socket.on('allUser', function (data) {
//         if (!$scope.hasLogined) return;
//         $scope.users = data;
//     });

//     //接收到用户退出消息
//     socket.on('userRemoved', function (data) {
//         if (!$scope.hasLogined) return;
//         $scope.publicMessages.push({ text: data.nickname, type: "bye" });
//         for (var i = 0; i < $scope.users.length; i++) {
//             if ($scope.users[i].nickname == data.nickname) {
//                 $scope.users.splice(i, 1);
//                 return;
//             }
//         }
//     });

//     //接收到新消息
//     socket.on('messageAdded', function (data) {
//         if (!$scope.hasLogined) return;
//         if (data.to) { //私信
//             if (!$scope.privateMessages[data.from]) {
//                 $scope.privateMessages[data.from] = [];
//             }
//             $scope.privateMessages[data.from].push(data);
//         } else {//群发
//             $scope.publicMessages.push(data);
//         }
//         var fromUser = userService.get($scope.users, data.from);
//         var toUser = userService.get($scope.users, data.to);
//         if ($scope.receiver !== data.to) {//与来信方不是正在聊天当中才提示新消息
//             if (fromUser && toUser.nickname) {
//                 fromUser.hasNewMessage = true;//私信
//             } else {
//                 toUser.hasNewMessage = true;//群发
//             }
//         }
//     });



// }]);

// app.directive('message', ['$timeout', function ($timeout) {
//     return {
//         restrict: 'E',
//         templateUrl: 'message.html',
//         scope: {
//             info: "=",
//             self: "=",
//             scrolltothis: "&"
//         },
//         link: function (scope, elem, attrs) {
//             scope.time = new Date();
//             $timeout(scope.scrolltothis);
//             $timeout(function () {
//                 elem.find('.avatar').css('background', scope.info.color);
//             });
//         }
//     };
// }])
//     .directive('user', ['$timeout', function ($timeout) {
//         return {
//             restrict: 'E',
//             templateUrl: 'user.html',
//             scope: {
//                 info: "=",
//                 iscurrentreceiver: "=",
//                 setreceiver: "&"
//             },
//             link: function (scope, elem, attrs, chatCtrl) {
//                 $timeout(function () {
//                     elem.find('.avatar').css('background', scope.info.color);
//                 });
//             }
//         };
//     }]);
