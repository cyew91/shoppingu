'use strict'

angular.module('mean').controller('ProductController', ['$scope', '$state', '$stateParams', '$uibModal', 'GetProdCatAndSubCat', 'CreatePost', '$rootScope', function ($scope, $state, $stateParams, $uibModa, GetProdCatAndSubCat, CreatePost, $rootScope) {
    // $scope.profileId = $rootScope.currentUser.ProfileID;
    $scope.profileId = '7c4be0de-c943-11e7-84e9-90bbf6a2477f'
    $scope.productCategoryList = [];
    $scope.productSubCategoryList = [];
    $scope.productImages = [];

    Dropzone.autoDiscover = false;

    const init = function () {
        $scope.productObj = $stateParams.productObj;

        if ($scope.productObj.productList == null) {
            $scope.productObj.productList = [];
        }

        GetProdCatAndSubCat.query(function (list) {
            $scope.productCategoryList = list;
        });

        // Allow search in the dropdownlist.
        // $('#selectMainCategory').select2();
        // $('#selectSubCategory').select2();
    }

    init();

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
                if ($scope.productImages[x] == data.message){
                    $scope.productImages.splice(x, 1);
                }
              }
             }
            });
            var _ref;
            return (_ref = file.previewElement) != null ? _ref.parentNode.removeChild(file.previewElement) : void 0;
           },
         success: function(file, response){
            //console.log(response.message[0].filename);
            $scope.productImages.push(response.message[0].filename);
         },
         error: function(file, response){
            console.log(response);
         }
    });

    $scope.addProductToList = function () {
        $scope.product.productImages = $scope.productImages;
        $scope.productObj.productList.push($scope.product);

        $scope.product = null;
        $scope.productImages = [];

        //console.log($scope.productObj.productList);

        Dropzone.forElement("div#dropzoneProductImage").removeAllFiles(true);
    }

    $scope.removeFromList = function (index) {
        $scope.productObj.productList.splice(index, 1);
    }

    $scope.onRowSelect = function (product) {
        $scope.seletedProduct = Object.create(product);
        $('#modal-product').modal('show');
    }
    
    $scope.open = function (product) {
        var modalInstance = $uibModal.open({
          //scope: $scope,
          //animation: $scope.animationsEnabled,
          templateUrl: 'views/editProductDetail.html',
          controller: 'EditProductDetailController',
          //size: size,
          resolve: {
            addProductToList: function() {
              return $scope.addProductToList;
              //$('#modal-product').modal('show');
            }
          }
        })
      };

      $scope.createPost = function(){
        
        var createPost = new CreatePost({
            // Create Travel
            countryID: $scope.productObj.countryID,
            profileId: $scope.profileId,
            travelDescription: $scope.productObj.countryName,
            travelStartDate: $scope.productObj.startDate,
            travelEndDate: $scope.productObj.toDate,
            isRequest: $scope.productObj.buyer,
            isExpired: 0,
            remarks: "",
            createdDate: Date.now(),
            createdBy: 'ks',
            lastUpdatedDate: Date.now(),
            lastUpdatedBy: 'ks',

            // Create Product
            productDescription: $scope.productObj.productDescription,
            productAmount: $scope.productObj.productAmount,

            // Create Product Detail
            productList: $scope.productObj.productList,

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

        console.log($scope.productObj);

        if (count == 2) {
            $state.go('posttravel.product', { productObj: $scope.productObj });
        } else if (count == 3) {
            // Temporary rhide Review page. For now direct save into DB.
            // $state.go('posttravel.review', { productObj: $scope.productObj });
            // Call the api here. To insert into DB. Should pass in '$scope.productObj' into the api to process.
        }
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