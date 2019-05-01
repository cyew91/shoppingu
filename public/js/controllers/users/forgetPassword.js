"use strict";

angular.module("mean.auth").controller("ForgetPasswordController", [
  "$scope",
  "Global",
  "$state",
  "ForgetPassword",
  function($scope, Global, $state, ForgetPassword) {
    $scope.global = Global;

    $scope.forgetPassword = function() {
      try {
        ForgetPassword.get(
          {
            email: this.email
          },
          function(res) {
            console.log("res: ", res);
            if(res.data != null) {
              $("#forget-password-validation-fail-text").hide();
              $("#forget-password-validation-success-text").show();
            } else {
              $("#forget-password-validation-fail-text").show();
              $("#forget-password-validation-success-text").hide();
            }
          }
        );
      } catch (err) {
        console.log("err:", err)
      }
    };
  }
]);
