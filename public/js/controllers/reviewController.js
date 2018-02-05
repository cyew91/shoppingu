'use strict'

angular.module('mean').controller('ReviewController', ['$scope', '$state', '$stateParams', 'CreatePost', function ($scope, $state, $stateParams, CreatePost) {
    $scope.productObj = $stateParams.productObj;

    $scope.createPost = function(){
        
        var createPost = new CreatePost({
            // Create Travel
            countryID: this.productObj.countryID,
            travelDescription: this.productObj.firstName,
            travelStartDate: this.productObj.startDate,
            travelEndDate: this.productObj.toDate,

            // Create Product
            productDescription: this.productObj.productDescription,
            productAmount: this.productObj.productAmount,

            // Create Product Detail
            productList: this.productObj.productList,

        });

        createPost.$save(function (response) {
            if (response.result === 'success') {
                $('#myModal').modal('show');
            }
        });
    };

    $scope.continue = function (count) {
        $('#text' + count).css('display', 'none');
        $('#textStep' + count).css('display', 'block');

        $('#text' + (count - 1)).css('display', 'none');
        $('#textStep' + (count - 1)).css('display', 'none');

        $('#check' + (count - 1)).css('display', 'block');

        var $bar = $(".ProgressBar");
        if ($bar.children(".is-current").length > 0) {
            $bar.children(".is-current").removeClass("is-current").addClass("is-complete").next().addClass("is-current");
        } else {
            $bar.children().first().addClass("is-current");
        }

        if (count == 2) {
            console.log($scope.productObj);
            $state.go('posttravel.product', {productObj: $scope.productObj});
        } else if (count == 3) {
            console.log($scope.productObj);
            $state.go('posttravel.review', {productObj: $scope.productObj});
        }
    }

    $scope.back = function (count) {
        $('#text' + count).css('display', 'none');
        $('#textStep' + count).css('display', 'block');

        $('#text' + (count + 1)).css('display', 'block');
        $('#textStep' + (count + 1)).css('display', 'none');

        $('#check' + (count)).css('display', 'none');
        $('#check' + (count + 1)).css('display', 'none');

        console.log('#text' + count);

        var $bar = $(".ProgressBar");
        if ($bar.children(".is-current").length > 0) {
            $bar.children(".is-current").removeClass("is-current").prev().removeClass("is-complete").addClass("is-current");
        } else {
            $bar.children(".is-complete").last().removeClass("is-complete").addClass("is-current");
        }

        console.log($scope.productObj);

        if (count == 2) {
            $state.go('posttravel.product', {productObj: $scope.productObj});
        } else if (count == 3) {
            $state.go('posttravel.review', {productObj: $scope.productObj});
        } else if (count == 1) {
            $state.go('posttravel.travel', {productObj: $scope.productObj});
        }
    }
}]);