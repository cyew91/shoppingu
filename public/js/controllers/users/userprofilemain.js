'use strict';

angular.module('mean.articles')
  .controller('UserProfileMainController', ['$scope', 'Global', '$stateParams', '$state', function($scope, Global, $stateParams, $state){
    $scope.global = Global;
    
    $scope.accountMenu = [{accId: 'a1',accName: 'Profiles', accLink: "userprofile", accIcon: "icon-head"}, 
                          {accId: 'a2',accName: 'Addresses', accLink: "address", accIcon: "icon-map"}, 
                          {accId: 'a3',accName: 'Orders', accLink: "order", accIcon: "icon-bag"}, 
                          {accId: 'a4',accName: 'Posts', accLink: "post", accIcon: "icon-bag"}];

    $scope.selectedMenu = function (index) {
      
      $('#' + $scope.accountMenu[index].accId).addClass("active");
    };
    

  }]);

