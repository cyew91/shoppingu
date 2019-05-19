'use strict';

angular.module('mean.articles')
  .controller('UserProfileController', ['$scope', 'Global', '$stateParams', '$state', '$http', 'GetUserProfileById', '$rootScope', '$window', 
  function($scope, Global, $stateParams, $state, $http, GetUserProfileById, $rootScope, $window){
    $scope.global = Global;
    var userId = $window.sessionStorage.getItem("id");

    $scope.initUserProfie = function() {
      GetUserProfileById.get({
        id: userId
      }, function(result) {
          $scope.profile = result;
          $scope.lastName = $scope.profile.lastName;
          $scope.firstName = $scope.profile.firstName;
      });
    };

    $scope.updateUserProfile = function() {
        var profile = $scope.profile;
        if (!profile.updated) {
            profile.updated = [];
        }
        profile.updated.push(new Date().getTime());

        profile.$update(function(response){
            if (response.result === "success") {
                $("#myModal").modal("show");
            } else {
                $scope.errorMsg = response.message;
            }
        });
    };
    
    $("#myModal").on("hidden.bs.modal", function (e) {
        location.reload();
    });

    $scope.goToMyOrder = function () {
      $state.go('order', {profile: $scope.profile});
    };

    $scope.goToMyRequest = function () {
      $state.go('request', {profile: $scope.profile});
    };

    $scope.goToMyAddress = function () {
      $state.go('address', {profile: $scope.profile});
    };

    $scope.goToMyPost = function () {
      $state.go('post', {profile: $scope.profile});
    };

    $scope.onChanges = function(image){
        var formdata = new FormData();
        angular.forEach(image.files, function (value, key) {
            formdata.append(key, value);
            
        });
        //formdata.append('myFileName', $scope.profileImageName);

        var uploadUrl = "/uploadProfileImage";
        $http.post(uploadUrl,formdata, {
            transformRequest: angular.identity,
            headers: {'Content-Type': undefined}
        })
        .then(function (response){
            if(!response.data.success){
                $scope.errorMsg = response.data.err.message;
            }
            else{
                updateUserProfileImage(response.data.message[0].filename, response.data.message[0].path);
            }            
        });
    }

    var updateUserProfileImage = function(filename, path){
        $scope.profile.imageName = filename;
        $scope.profile.imagePath = path;
        var profile = $scope.profile;
        if (!profile.updated) {
            profile.updated = [];
        }
    
        profile.updated.push(new Date().getTime());
        profile.$update(function(response){
            if (response.result === "success") {
                $("#myModal").modal("show");
            } else {
                $scope.errorMsg = response.message;
            }
        });
    };


    // $scope.$on("fileProgress", function(e, progress) {
    //   $scope.progress = progress.loaded / progress.total;
    // });

    // $('.input-daterange').datepicker({
    //   autoclose: true,
    //   keepEmptyValues: true,
    //   format: 'dd-mm-yyyy',
    //   clearBtn: true
    // });

    // $('#datepickerFrom').on('changeDate', function() {
    //   $scope.productObj.startDate = $('#datepickerFrom').datepicker('getFormattedDate');
    // });

  }]);

