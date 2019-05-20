'use strict';

/**
 * Module dependencies.
 */
var profiles = require('../../app/controllers/ProfileControllers');

var filePath = 'public/profile-image/';
var multer = require('multer');
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, filePath);
    },
    filename: function (req, file, cb) {
        var id = Date.now() + '-' + file.originalname;
        cb(null, id);
    }
});
var maxSize = 32000000; // 4MB

var upload = multer({ 
    storage: storage, 
    limits: { 
        fileSize: maxSize 
    } 
}).any();

module.exports = function (app) {
    // User Profile Routes
    app.route('/profile/:id')
    .get(profiles.show)
    .put(profiles.updateProfile);

    app.route('/address/:id')
    .get(profiles.show)
    .put(profiles.updateAddress);

    app.route('/forgetpassword/:email')
    .get(profiles.triggerForgetPasswordEmail)

    app.route('/resetpassword/:token')
    .get(profiles.show)
    .put(profiles.resetPassword)

    app.route('/profile')
    .post(profiles.create);

    app.param('id', profiles.getProfileById);
    app.param('email', profiles.getProfileByEmail);
    app.param('token', profiles.getProfileByToken);

    // Upload profile picture
    app.post('/uploadProfileImage', function (req, res) {
        upload(req, res, function (err) {
          if (err) {
            return res.json({ success: false , err});
          }
          return res.json({ success: true, message: req.files});
          // Everything OK
        });
    });

};