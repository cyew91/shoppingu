'use strict'

angular.module('mean').controller('ProductController', ['$scope', '$state', '$stateParams', 'GetProdCatAndSubCat', '$rootScope', '$anchorScroll', function ($scope, $state, $stateParams, GetProdCatAndSubCat, $rootScope, $anchorScroll) {
    $scope.travelObj = $stateParams.travelObj;
    $scope.productImages = [];
    $scope.productList = [];
    var count = 0;
    $scope.currency = "MYR";
    var hasTravel = $rootScope.hasTravel;
    //Dropzone.autoDiscover = false;

    $scope.init = function () {
        if (!hasTravel){
            $state.go('travel');
            $window.location.reload();
        }
        else{
            GetProdCatAndSubCat.query(function (list) {
                $scope.productCategoryList = list;
            });
    
            initDropZone();
        }
    }

    var initDropZone = function() {
        $("#dropzoneProductImage").dropzone({
        url: '/uploadProductImage',
        addRemoveLinks: true,
        maxFiles: 4,
        acceptedFiles: ".jpeg,.jpg,.png,.gif",

        init: function() {
            //console.log('init');
            this.on("maxfilesexceeded", function(file){
                 alert("No more files please!");
                 this.removeFile(file);
             });
        },
        sending: function(file, xhr, formdata){
            //console.log('Sending');
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
                //console.log('success: ' + data);
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
                imagePath: response.message[0].path
                //imageURL: file.dataURL
            });
        },
        error: function(file, response){
            console.log(response);
        }
        });
    };

    $scope.addToProductList = function () {
        var valid = validation().result;
        var msg = validation().msg;
        if (!valid){
            $scope.response = valid;
            $scope.errorMsg = msg;
            // Scroll to top
            $anchorScroll();
        }
        else {
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
        }  
    };

    $scope.removeFromList = function (index) {
        $scope.productList.splice(index, 1);
    };
      
    $scope.continue = function (count) {
        if ($scope.productList.length < 1){
            $scope.response = false;
            $scope.errorMsg = "Fill in all columns";
        }
        else{
            $scope.productObj = $scope.travelObj;
            $scope.productObj.productList = $scope.productList;
            $state.go('postreview', { productObj: $scope.productObj });
            // Scroll to top
            $anchorScroll();
        }
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

    var validation = function() {
        var result = true;
        var msg = null;
        var returnObj = {};
        if (angular.isUndefined($scope.productName) || $scope.productName == null || $scope.productName == ""){
            result = false;
            msg = "Fill in Product Name";
        }
        else if (angular.isUndefined($scope.productCategoryName || $scope.productCategoryName == null || $scope.productCategoryName == "")){
            result = false;
            msg = "Select Product Category";
        }
        else if (angular.isUndefined($scope.productSubCategoryName || $scope.productSubCategoryName == null || $scope.productSubCategoryName == "")){
            result = false;
            msg = "Select Product Sub Category";
        }
        else if (angular.isUndefined($scope.productDescription || $scope.productDescription == null || $scope.productDescription == "")){
            result = false;
            msg = "Fill in Description";
        }
        else if (angular.isUndefined($scope.quantity || $scope.quantity == null || $scope.quantity == "")){
            result = false;
            msg = "Fill in Quantity";
        }
        else if (angular.isUndefined($scope.amount || $scope.amount == null || $scope.amount == "")){
            result = false;
            msg = "Fill in Amount";
        }
        else if ($scope.productImages < 1){
            result = false;
            msg = "Upload at least one Product Image";
        }
        returnObj = {result, msg};
        return returnObj;
    };
}]);