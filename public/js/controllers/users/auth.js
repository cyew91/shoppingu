'use strict';

angular.module('mean.auth').controller('socialAuth', ['$scope', 'Global', '$state', '$fblogin', 'SocialAuth', '$window', '$auth', function ($scope, Global, $state, $fblogin, SocialAuth, $window, $auth) {
    $scope.global = Global;

    $scope.menu = [{
        "title": "Articles",
        "state": "articles"
    }, {
        "title": "Create New Article",
        "state": "createArticle"
    }];

    $scope.isCollapsed = false;


}]);