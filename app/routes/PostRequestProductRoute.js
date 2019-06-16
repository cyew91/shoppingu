'use strict';

const postRequestProduct = require('../controllers/PostRequestProductController');

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

    // Create request product
    app.route('/postrequest')
    //.get(postTravel.getPostTravel)
    .post(postRequestProduct.createPostRequestProduct);

    // Get posted request product in Account - My Requests
    app.param('requestprofileId', postRequestProduct.getPostRequestProductByProfileId);
    app.route('/postrequestproduct/myrequest/:requestprofileId')
    .get(postRequestProduct.show)

    //Dropzone: Upload product image
    // app.post('/uploadProductImage', product.uploadProductImage);
    app.post('/uploadProductImage', function (req, res) {
        upload(req, res, function (err) {
          if (err) {
            return res.json({ success: false , message: 'Failed'});
          }
          return res.json({ success: true, message: req.files});
          // Everything OK
        });
    });
    
    app.post('/deleteProductImage', function (req, res) {
        //filePath = filePath + fileNameDateNow;
        fs.unlink(filePath + req.body.myName, function (err) {
            if (err) {
                return res.json({ success: false , message: 'Failed'});
            }
            return res.json({ success: true, message: req.body.myName});
            // Everything OK
        });
    });
};
