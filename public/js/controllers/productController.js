'use strict'

angular.module('mean').controller('ProductController', ['$scope', '$state', '$stateParams', '$uibModal', 'GetProdCatAndSubCat', 'CreatePost', '$rootScope', function ($scope, $state, $stateParams, $uibModa, GetProdCatAndSubCat, CreatePost, $rootScope) {
    $scope.travelObj = $stateParams.travelObj;
    $scope.productImages = [];
    $scope.productList = [];
    var count = 0;
    $scope.currency = "MYR";
    //Dropzone.autoDiscover = false;

    $scope.init = function () {
        GetProdCatAndSubCat.query(function (list) {
            $scope.productCategoryList = list;
        });

        initDropZone();
    }

    var initDropZone = function() {
        $("#dropzoneProductImage").dropzone({
        url: '/uploadProductImage',
        addRemoveLinks: true,
        maxFiles: 4,
        acceptedFiles: ".jpeg,.jpg,.png,.gif",

        init: function() {
            console.log('init');
            this.on("maxfilesexceeded", function(file){
                 alert("No more files please!");
                 this.removeFile(file);
             });
        },

        sending: function(file, xhr, formdata){
            console.log('Sending');
            file.myName = file.name.split('.')[0] + '-' + Date.now() + '.jpg';

            var csrftoken = document.head.querySelector("[name=csrf-token]").content;
            formdata.append('_csrf', csrftoken);
            formdata.append('myFileName', file.myName);
        },
         // remove uploaded image after clicked remove
        removedfile: function(file) {
            var myName = file.myName; 
            $.ajax({
                type: 'POST',
                url: '/deleteProductImage',
                data: {myName: myName},
                success: function(data, response){
                console.log('success: ' + data);
                for (var x = 0; x <= $scope.productImages.length; x++){
                    if ($scope.productImages[x].imageName == data.message){
                        $scope.productImages.splice(x, 1);
                    }
                }
                }
            });
            var _ref;
            return (_ref = file.previewElement) != null ? _ref.parentNode.removeChild(file.previewElement) : void 0;
        },
        success: function(file, response){
            $scope.productImages.push({
                imageName: response.message[0].filename, 
                imagePath: response.message[0].path,
                imageURL: file.dataURL
            });
        },
        error: function(file, response){
            console.log(response);
        }
        });
    };

    $scope.addToProductList = function () {
        $scope.productList.push({
            productName: $scope.productName,
            productCategoryId: $scope.productCategoryName.id,
            productCategoryName: $scope.productCategoryName.productCategoryName,
            productSubCategoryId: $scope.productSubCategoryName.id,
            productSubCategoryName: $scope.productSubCategoryName.productSubCategoryName,
            quantity: $scope.quantity, 
            currency: $scope.currency,
            amount: $scope.amount,
            productDescription: $scope.productDescription,
            productImage: $scope.productImages
        });
        clearData();
        count++;
    };

    var clearData = function (){
        $scope.productName = null;
        $scope.productCategoryName.id = null;
        $scope.productCategoryName = null;
        $scope.productSubCategoryName.id = null;
        $scope.productSubCategoryName = null;
        $scope.quantity = null;
        $scope.amount = null;
        $scope.productDescription = null;
        $scope.productImages = [];

        //Initialize dropzone
        var element = document.getElementById("dropzoneProductImage");
        element.parentNode.removeChild(element);

        $("div#dropzoneContainer").append("<div id='dropzoneProductImage' class='dropzone'></div>");
        initDropZone();
        //Dropzone.forElement("div#dropzoneProductImage").removeAllFiles(true);
    };

    $scope.removeFromList = function (index) {
        $scope.productList.splice(index, 1);
    };
      
    $scope.continue = function (count) {
        $scope.productObj = $scope.travelObj;
        $scope.productObj.productList = $scope.productList;

        // $('#text' + count).css('display', 'none');
        // $('#textStep' + count).css('display', 'block');

        // $('#text' + (count - 1)).css('display', 'none');
        // $('#textStep' + (count - 1)).css('display', 'none');

        // $('#check' + (count - 1)).css('display', 'block');

        // var $bar = $(".ProgressBar");
        // if ($bar.children(".is-current").length > 0) {
        //     $bar.children(".is-current").removeClass("is-current").addClass("is-complete").next().addClass("is-current");
        // } else {
        //     $bar.children().first().addClass("is-current");
        // }

        //console.log($scope.productObj);

        // if (count == 2) {
        $state.go('postreview', { productObj: $scope.productObj });
        // } else if (count == 3) {
            // Temporary rhide Review page. For now direct save into DB.
            // $state.go('posttravel.review', { productObj: $scope.productObj });
            // Call the api here. To insert into DB. Should pass in '$scope.productObj' into the api to process.
        // }
    }

    $scope.back = function (count) {
        var count = 1;
        $('#text' + count).css('display', 'none');
        $('#textStep' + count).css('display', 'block');

        $('#text' + (count + 1)).css('display', 'block');
        $('#textStep' + (count + 1)).css('display', 'none');

        $('#check' + (count)).css('display', 'none');
        $('#check' + (count + 1)).css('display', 'none');

        var $bar = $(".ProgressBar");
        if ($bar.children(".is-current").length > 0) {
            $bar.children(".is-current").removeClass("is-current").prev().removeClass("is-complete").addClass("is-current");
        } else {
            $bar.children(".is-complete").last().removeClass("is-complete").addClass("is-current");
        }

        if (count == 2) {
            $state.go('posttravel.product', { productObj: $scope.productObj });
        } else if (count == 3) {
            $state.go('posttravel.review', { productObj: $scope.productObj });
        } else if (count == 1) {
            $state.go('posttravel.travel', { productObj: $scope.productObj });
        }
    }
}]);