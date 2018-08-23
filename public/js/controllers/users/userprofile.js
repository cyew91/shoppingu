'use strict';

angular.module('mean.articles')
  .controller('UserProfileController', ['$scope', 'Global', '$stateParams', '$state', 'GetUser', '$rootScope', function($scope, Global, $stateParams, $state, GetUser, $rootScope){
    $scope.global = Global;
    // $scope.profileId = $stateParams.profileId;
    // $scope.profileId = $rootScope.currentUser.ProfileID;

    // const init = function() {
    //   GetUser.get({
    //     profileId: $scope.profileId
    //   }, function(result) {
    //       $scope.profile = result;
    //       if ($scope.profile.Gender == 0){
    //         $scope.checkFemale = "active";
    //         $scope.checkMale = "inactive";
    //       }
    //       else{
    //         $scope.checkMale = "active";
    //         $scope.checkFemale = "inactive";
    //       }

    //   });
    // };
    
    // init();

    // $scope.accountMenu = [{accId: 'a1',accName: 'Profiles'}, {accId: 'a2',accName: 'Addresses'}];

    // $('.input-daterange').datepicker({
    //   autoclose: true,
    //   keepEmptyValues: true,
    //   format: 'dd-mm-yyyy',
    //   clearBtn: true
    // });

    // $('#datepickerFrom').on('changeDate', function() {
    //   $scope.productObj.startDate = $('#datepickerFrom').datepicker('getFormattedDate');
    // });

    // $scope.updateProfile = function() {
    //   var profile = $scope.profile;
    //   if (!profile.updated) {
    //       profile.updated = [];
    //   }
    //   profile.updated.push(new Date().getTime());
    //   //profile.$update(function() {
    //     //$state.go('home');
    //   profile.$update();
    //   //});
    // };

    

  }]);

