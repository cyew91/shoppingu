'use strict';

angular.module('mean')
  .controller("ChatController", ['$scope', '$stateParams', '$window', 'GetUserProfileById', 'userService', 'chat', 'socket', 
    function ($scope, $stateParams, $window, GetUserProfileById, userService, chat, socket) {

    var messageWrapper = $('.message-wrapper');
    $scope.hasLogined = false;
    //$scope.receiver="";//默认是群聊
    $scope.publicMessages = [];//群聊消息
    $scope.privateMessages = {};//私信消息
    // $scope.messages = $scope.publicMessages;//默认显示群聊
    $scope.users = [];//

    //$scope.sellerInfo = $stateParams.sellerInfo;
    //$scope.sellerLoginId = $scope.sellerInfo == "" ? "yew" : $scope.sellerInfo.post_travel.profile.loginId;
    // $scope.sellerLoginId = null ? $scope.sellerInfo.post_travel.profile.loginId : yks;
    var userId = $window.sessionStorage.getItem("id");

    $scope.productTravel = $stateParams.prodTravel;

    // Triggered when leave the page
    $scope.$on("$destroy", function() {


        console.log("bye");
        socket.getSocket().removeListener("returnFriendList");
        //socket.removeListener("inbox_id2");
    });

    $scope.initUserProfile = function() {
        GetUserProfileById.get({
            id: userId
        }, function(result) {
            //$scope.users = [];
            $scope.profile = result;
            $scope.lastName = $scope.profile.lastName;
            $scope.firstName = $scope.profile.firstName;
            $scope.loginId = result.loginId;

            $window.localStorage.setItem("username", $scope.loginId);
            //   socket.emit("addUser",{username: $window.localStorage.getItem("username")});
            
            // To check route from index or productDetail page
            if($scope.productTravel == null){
                socket.emit("getUserFriendList", {username: $window.localStorage.getItem("username"), user_2: "null"});
            }
            else{
                socket.emit("getUserFriendList", {username: $window.localStorage.getItem("username"), user_2: $scope.productTravel.post_travel.profile.loginId});
                
            }
            
            socket.on('returnFriendList', function (data) {
                $scope.users_temp = data;

                //Get all users inbox id
                angular.forEach($scope.users_temp, function(value, key){
                    console.log("value: " + value + "key: " + key);
                    if (value.user_2 == $window.localStorage.getItem("username")){
                        value.user_2 = value.user_1;
                    }
                    socket.emit("inbox_id", {user_1: $window.localStorage.getItem("username"), user_2: value.user_2}); 
                });
                var i = 0;
                socket.on('inbox_id2', function(data){
                    $scope.users[i] = data;
                    i++;

                    $scope.users.forEach(element => {
                        if($scope.productTravel != null){
                            if($scope.productTravel.post_travel.profile.loginId == element.user_2){
                                $scope.clickOnUserList(element.user_2, element.inbox_id);
                            }
                        }
                    });
                });
            });

            

            

        });
        
    };

    $scope.scrollToBottom = function () {
        messageWrapper.scrollTop(messageWrapper[0].scrollHeight);
    };

    $scope.postMessage = function () {
        socket.emit('message', {
            name: $scope.loginId, 
            msg: $scope.user_message, 
            frnd_name: $window.localStorage.getItem("frnd_name"),
            inbox_id: $window.localStorage.getItem("inbox_id")
        }); 
        $scope.user_message = '';
    };
    

    // $scope.postMessage1 = function () {
    //     $scope.nickname = $scope.loginId;
    //     $scope.receiver = $scope.sellerLoginId;
    //     var msg = { 
    //         text: $scope.words, 
    //         type: "normal", 
    //         from: $scope.nickname, 
    //         to: $scope.receiver,
    //         time: new Date()
    //     };
    //     var rec = $scope.receiver;
    //     if (rec) {  //私信
    //         if (!$scope.privateMessages[rec]) {
    //             $scope.privateMessages[rec] = [];
    //         }
    //         $scope.privateMessages[rec].push(msg);
    //     } else { //群聊
    //         $scope.publicMessages.push(msg);
    //     }
    //     $scope.words = "";
    //     if (rec !== $scope.nickname) { //排除给自己发的情况
    //         // socket.emit("addUser",{username: msg.to});
    //         $scope.messages = $scope.privateMessages[$scope.receiver];
    //         socket.emit("addMessage", msg);

    //         // var chatData = new chat({
    //         //     ChatProfileID_Sender: msg.from,
    //         //     ChatProfileID_Receiver: msg.to,
    //         //     TotalMessages: 1
    //         // });


    //         // chatData.$save(function (response) {
    //         //     if (response.result === 'success') {
    //         //         $('#myModal').modal('show');
    //         //     }
    //         // });
    //     }
    // };

    //$scope.messages = [];
    $scope.clickOnUserList = function (name, id){
        $window.localStorage.setItem("frnd_name", name);
        $window.localStorage.setItem("inbox_id", id);
        $scope.friendName = name;

        // Pass inbox_id to db
        socket.emit("get_messages", {inbox_id: $window.localStorage.getItem("inbox_id")});

        // Return inbox messages
        socket.on("all_messages", function(data){
            if(data[0].inbox_id == $window.localStorage.getItem("inbox_id")){
                $scope.messages = data;
            }
        });

        // New message
        socket.on("new_message", function(data){
            $scope.messages.push({
                user_name:data.user_name,
                Message:data.message,
                time:data.time,
                seen_time:data.seen_time,
                id:data.id
            });
        });
    };

    // $scope.setReceiver = function (receiver) {
    //     $scope.receiver = receiver;
    //     if (receiver) { //私信用户
    //         if (!$scope.privateMessages[receiver]) {
    //             $scope.privateMessages[receiver] = [];
    //         }
    //         $scope.messages = $scope.privateMessages[receiver];
    //     } else {//广播
    //         $scope.messages = $scope.publicMessages;
    //     }
    //     var user = userService.get($scope.users, receiver);
    //     if (user) {
    //         user.hasNewMessage = false;
    //     }
    // };

    //收到登录结果
    // socket.on('userAddingResult', function (data) {
    //     if (data.result) {
    //         $scope.userExisted = false;
    //         $scope.hasLogined = true;
    //     } else {//昵称被占用
    //         $scope.userExisted = true;
    //     }
    // });

    //接收到欢迎新用户消息
    // socket.on('userAdded', function (data) {
    //     //if (!$scope.hasLogined) return;
    //     //$scope.publicMessages.push({ text: data.nickname, type: "welcome" });
    //     $scope.users.push(data);
    // });

    //接收到在线用户消息
    // socket.on('allUser', function (data) {
    //     //if (!$scope.hasLogined) return;
    //     $scope.users = data;
    // });

    //接收到用户退出消息
    // socket.on('userRemoved', function (data) {
    //     if (!$scope.hasLogined) return;
    //     $scope.publicMessages.push({ text: data.nickname, type: "bye" });
    //     for (var i = 0; i < $scope.users.length; i++) {
    //         if ($scope.users[i].nickname === data.nickname) {
    //             $scope.users.splice(i, 1);
    //             return;
    //         }
    //     }
    // });

    //接收到新消息
    // socket.on('messageAdded', function (data) {
    //     //if (!$scope.hasLogined) return;
    //     if (data.to) { //私信
    //         if (!$scope.privateMessages[data.from]) {
    //             $scope.privateMessages[data.from] = [];
    //         }
    //         $scope.privateMessages[data.from].push(data);
    //         $scope.messages = $scope.privateMessages[data.from];
    //     } else {//群发
    //         $scope.publicMessages.push(data);
    //     }
        // var fromUser = userService.get($scope.users, data.from);
        // var toUser = userService.get($scope.users, data.to);
        // if ($scope.receiver !== data.to) {//与来信方不是正在聊天当中才提示新消息
        //     if (fromUser && toUser.nickname) {
        //         fromUser.hasNewMessage = true;//私信
        //     } else {
        //         toUser.hasNewMessage = true;//群发
        //     }
        // }
    // });
}]);

