'use strict';

angular.module('mean.system')
  .controller('PostProductController', ['$scope', 'Global', '$stateParams', function($scope, Global){
    $scope.global = Global;

    $scope.dropzoneConfig = {
     'options': { // passed into the Dropzone constructor
       'url': 'uploadimage'
     },
     'eventHandlers': {
       'sending': function (file, xhr, formData) {
         console.log('Sending');
       },
       'success': function (file, response) {
         console.log('Success');
       }
     }
   };
}]);
