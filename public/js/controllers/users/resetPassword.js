"use strict";

angular.module("mean.auth").controller("ResetPasswordController", [
  "$scope",
  "$stateParams",
  "Global",
  "$state",
  "ResetPassword",
  function($scope, $stateParams, Global, $state, ResetPassword) {
    $scope.global = Global;

    $scope.initUserProfile = function() {
      const token = $stateParams.token;

      ResetPassword.get(
        {
          token: token
        },
        function(user) {
          $scope.profile = user;
        }
      );
    };

    $scope.resetPassword = function() {
      const profile = $scope.profile;

      if (profile.password === this.newPassword) {
        $scope.passwordNotMatch = false;

        if (!profile.updated) {
          profile.updated = [];
        }

        profile.updated.push(new Date().getTime());
        profile.$update(function(res) {
          $state.go("login");
        });

      } else {
        $scope.passwordNotMatch = true;
      }
    };
  }
]);
