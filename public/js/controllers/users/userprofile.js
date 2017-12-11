'use strict';

angular.module('mean.articles')
  .controller('UserProfileController', ['$scope', 'Global', '$stateParams', '$state', 'GetUser', function($scope, Global, $stateParams, $state, GetUser){
    $scope.global = Global;
    $scope.profileId = $stateParams.profileId;

    const init = function() {
      GetUser.get({
        profileId: $scope.global.user.ProfileID
      }, function(result) {
          $scope.profile = result;
      });
    };
    
    init();

    $scope.updateProfile = function() {
      var profile = $scope.profile;
      if (!profile.updated) {
          profile.updated = [];
      }
      profile.updated.push(new Date().getTime());
      //profile.$update(function() {
        //$state.go('home');
      profile.$update();
      //});
    };

    

  }]);

