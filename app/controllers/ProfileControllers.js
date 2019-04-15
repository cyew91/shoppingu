"use strict";

/**
 * Module dependencies.
 */
var db = require("../../config/sequelize"),
  config = require("../../config/config");

const postmark = require("postmark");

//var bcrypt = require('bcrypt');
const saltRounds = 10;

/**
 * Find profile by id
 * Note: This is called every time that the parameter :profileId is used in a URL.
 * Its purpose is to preload the profile on the req object then call the next function.
 */
// exports.getProfileId = function (req, res, next, ProfileID) {
//     console.log('id => ' + ProfileID);
//     db.t_profile.find({
//         where: {
//             ProfileID: ProfileID
//         }
//     }).then(function (profile) {
//         if (!profile) {
//             return next(new Error('Failed to load ProfileId ' + ProfileID));
//         } else {
//             req.profile = profile;
//             return next();
//         }
//     }).catch(function (err) {
//         return next(err);
//     });
// };

/**
 * Show a profile
 */
// exports.show = function (req, res) {
//     // Sending down the profile that was just preloaded by the profiles.getProfileId function
//     // and saves profile on the req object.
//     return res.jsonp(req.profile);
// };

/**
 * Create profile
 */
// exports.create = function (req, res, next) {
//     var message = null;
//     var profileDetail = {
//         FirstName: req.body.firstName,
//         LastName: req.body.lastName,
//         FullName: req.body.firstName + req.body.lastName,
//         Address: "",
//         Email: req.body.email,
//         ContactNo: req.body.phoneNumber,
//         Gender: 0,
//         DOB: Date.now(),
//         Remarks: "",
//         CreatedDate: Date.now(),
//         CreatedBy: "00000000-0000-0000-0000-000000000000",
//         LastUpdatedDate: Date.now(),
//         LastUpdatedBy: "00000000-0000-0000-0000-000000000000",
//         CountryID: req.body.countryID
//     };

//     if (req.body.password === req.body.confirmPassword) {
//         var profile = db.t_profile.build(profileDetail);
//         req.body.profileId = profile.ProfileID;

//         profile.save().then(function () {
//             return next();
//         }).catch(function (err) {
//             res.send({
//                 status: 'Exception',
//                 message: err
//             })
//         });
//     } else {
//         res.send({
//             status: 'Error',
//             message: 'Password is not same with confirm password'
//         })
//     }
// };

// Update Profile
// exports.updateProfile = function (req, res) {

//     // create a new variable to hold the article that was placed on the req object.
//     var profile = req.profile;

//     profile.updateAttributes({
//         FirstName: req.body.FirstName,
//         LastName: req.body.LastName,
//         Email: req.body.Email,
//         ContactNo: req.body.ContactNo,
//         Gender: req.body.Gender,
//         DOB: req.body.DOB
//     }).then(function (a) {
//         return res.jsonp(a);
//     }).catch(function (err) {
//         return res.send({
//             status: 'Exception',
//             message: err
//         });
//     });
// };

// exports.updateAddress = function (req, res) {

//     // create a new variable to hold the article that was placed on the req object.
//     var profile = req.profile;

//     profile.updateAttributes({
//         Address: req.body.Address
//     }).then(function (a) {
//         return res.jsonp(a);
//     }).catch(function (err) {
//         return res.send({
//             status: 'Exception',
//             message: err
//         });
//     });
// };

/**
 * Create profile account
 */
// exports.createProfileAccount = function (req, res, next) {
//     var message = null;
//     var profileAccountDetail = {
//         ProfileID: req.body.profileId,
//         LoginID: req.body.email,
//         RetryCount: 0,
//         IsActive: 1,
//         Remarks: "",
//         CreatedDate: Date.now(),
//         CreatedBy: "00000000-0000-0000-0000-000000000000",
//         LastUpdatedDate: Date.now(),
//         LastUpdatedBy: "00000000-0000-0000-0000-000000000000"
//     };

//     var profileAccount = db.t_profile_account.build(profileAccountDetail);
//     profileAccount.SaltPass = profileAccount.makeSalt();
//     profileAccount.HashPass = profileAccount.encryptPassword(req.body.password, profileAccount.SaltPass);

//     profileAccount.save().then(function () {
//         return res.jsonp({
//             "result": "success"
//         });
//     }).catch(function (err) {
//         res.send({
//             status: 'Exception',
//             message: err
//         });
//     });
// };

// exports.getProfileAccount = function (req, res, next, ProfileAccountID) {
//     console.log('id => ' + ProfileAccountID);
//     db.T_Profile_Account.find({
//         where: {
//             ProfileAccountID: ProfileAccountID
//         }
//     }).then(function (profileAccount) {
//         if (!profileAccount) {
//             return next(new Error('Failed to load ProfileAccountID ' + ProfileAccountID));
//         } else {
//             req.profileAccount = profileAccount;
//             return next();
//         }
//     }).catch(function (err) {
//         return next(err);
//     });
// };

/**
 * Show a profile account
 */
// exports.showProfileAccount = function (req, res) {
//     return res.jsonp(req.profileAccount);
// };

/**
 * New version 2.0
 */

/**
 * Find profile by id
 * Note: This is called every time that the parameter :profileId is used in a URL.
 * Its purpose is to preload the profile on the req object then call the next function.
 */
exports.getProfileById = function(req, res, next, id) {
  //console.log('id => ' + ProfileID);
  db.profile
    .find({
      where: {
        id: id
      }
    })
    .then(function(profile) {
      if (!profile) {
        return next(new Error("Failed to load ProfileId " + id));
      } else {
        req.profile = profile;
        return next();
      }
    })
    .catch(function(err) {
      return next(err);
    });
};

// Update Profile
exports.updateProfile = function(req, res) {
  // create a new variable to hold the article that was placed on the req object.
  var profile = req.profile;

  profile
    .updateAttributes({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      // email: req.body.email,
      contactNo: req.body.contactNo
      // gender: req.body.gender,
      // dateOfBirth: req.body.dateOfBirth
    })
    .then(function(a) {
      return res.jsonp(a);
    })
    .catch(function(err) {
      return res.send({
        status: "Exception",
        message: err
      });
    });
};

// Update Address
exports.updateAddress = function(req, res) {
  // create a new variable to hold the article that was placed on the req object.
  var profile = req.profile;

  profile
    .updateAttributes({
      address: req.body.address
    })
    .then(function(a) {
      return res.jsonp(a);
    })
    .catch(function(err) {
      return res.send({
        status: "Exception",
        message: err
      });
    });
};

/**
 * Show a profile
 */
exports.show = function(req, res) {
  // Sending down the profile that was just preloaded by the profiles.getProfileId function
  // and saves profile on the req object.
  return res.jsonp(req.profile);
};

/**
 * Create profile
 * 1. Check duplicate email
 * 2. Check duplicate loginId
 * 3. Check password and confirm password must be equal
 */
exports.create = function(req, res) {
  //if(typeof req.body.facebookLogin == 'undefined'){ // Register from web
  db.profile
    .findAndCount({
      where: {
        email: req.body.email
      }
    })
    .then(function(data) {
      if (data.count == 0) {
        // No duplicate email
        db.profile
          .findAndCount({
            where: {
              loginId: req.body.loginId
            }
          })
          .then(function(data) {
            if (data.count == 0) {
              // No duplicate LoginId
              var profileDetail = {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                contactNo: req.body.contactNo,
                loginId: req.body.loginId,
                password: req.body.password,
                confirmPassword: req.body.confirmPassword
              };

              if (req.body.password === req.body.confirmPassword) {
                var profile = db.profile.build(profileDetail);
                req.body.id = profile.id;
                profile.saltPassword = profile.makeSalt();
                profile.hashPassword = profile.encryptPassword(
                  req.body.password,
                  profile.saltPassword
                );

                profile
                  .save()
                  .then(function() {

                    let client = new postmark.ServerClient(config.POSTMARK.TOKEN);
                    let templateModel = {
                      name: req.body.firstName + req.body.lastName,
                      username: req.body.loginId,
                    }

                    client.sendEmailWithTemplate(
                      {
                        TemplateAlias: config.POSTMARK.WELCOME_TEMPLATE_ALIAS,
                        TemplateModel: templateModel,
                        InlineCss: true,
                        From: config.POSTMARK.DEVELOPMENT_EMAIL,
                        To: config.POSTMARK.DEVELOPMENT_EMAIL // In production should update to use user's email instead.
                      },
                      (err, data) => {
                        if (err) {
                          console.log(err);
                        }
                        console.log("<=== POSTMARK Welcome Email Sent ===> ");
                        console.log(data)
                        console.log("<=== POSTMARK Welcome Email Sent ===> ");
                      }
                    );

                    return res.jsonp({
                      result: "success"
                    });
                  })
                  .catch(function(err) {
                    res.send({
                      status: "Exception",
                      message: err
                    });
                  });
              } else {
                res.send({
                  status: "Error",
                  message: "Password and confirm password must be match"
                });
              }
            } else {
              // Return duplicate loginId error message
              res.send({
                status: "Error",
                message: "User Name already exists"
              });
            }
          });
      } else {
        // Return duplicate email error message
        res.send({
          status: "Error",
          message: "Email already exists"
        });
      }
    });
  //}
  // else{ // Login and register from facebook API
  //     db.profile.findAndCount({
  //         where: {
  //             email: req.body.facebookLogin.email
  //         }
  //     }).then(function (data){
  //         if(data.count == 0){ // If not yet register to db
  //             var profileDetail = {
  //                 firstName: req.body.facebookLogin.first_name,
  //                 lastName: req.body.facebookLogin.last_name,
  //                 email: req.body.facebookLogin.email,
  //                 facebookUserId: req.body.facebookLogin.id
  //             };

  //             var profile = db.profile.build(profileDetail);
  //             req.body.id = profile.id;

  //             profile.save().then(function () {
  //                 return res.jsonp({
  //                     "result": "success"
  //                 });
  //             }).catch(function (err) {
  //                 res.send({
  //                     status: 'Exception',
  //                     message: err
  //                 });
  //             });

  //         }
  //     }).then(function(){
  //         return res.jsonp({
  //             "result": "success"
  //         });
  //     });
  // }
};
