'use strict';

const postTravelProduct = require('../controllers/PostTravelProductController');

var filePath = 'public/uploads/';
var multer = require('multer');
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, filePath);
    },
    filename: function (req, file, cb) {
      cb(null, req.body.myFileName);
    }
});
var upload = multer({ storage: storage }).any();

const fs = require('fs');

module.exports = function (app) {

    app.param('postTravelProductId', postTravelProduct.getPostTravelProductById);

    // Get posted product in Account - My Trips
    app.param('postTravelId', postTravelProduct.getPostTravelProductByTravelId);
    app.route('/posttravelproduct/:postTravelId')
    .get(postTravelProduct.show)

    app.route('/posttravelproduct/:postTravelProductId')
        .get(postTravelProduct.show)
        .put(postTravelProduct.updateProduct);

    // Get features product in home page
    app.route('/posttravelproduct')
        .get(postTravelProduct.all);
        //.post(postTravelProduct.createProduct, postTravelProduct.createProductDocument);

    app.route('/posttravelproduct/productcategory')
        .get(postTravelProduct.getPostTravelProductByProductCategoryId);

    app.route('/posttravelproduct/profile')
        .get(postTravelProduct.getPostTravelByProfileId);


    //Dropzone: Upload product image
    // app.post('/uploadProductImage', product.uploadProductImage);
    app.post('/uploadProductImage', function (req, res) {
        upload(req, res, function (err) {
          if (err) {
            return res.json({ success: false , message: 'Great'});
          }
          return res.json({ success: true, message: req.files});
          // Everything OK
        });
    });
    
    app.post('/deleteProductImage', function (req, res) {
        //filePath = filePath + fileNameDateNow;
        fs.unlink(filePath + req.body.myName, function (err) {
            if (err) {
                return res.json({ success: false , message: 'Great'});
            }
            return res.json({ success: true, message: req.body.myName});
            // Everything OK
        });
    });
};
