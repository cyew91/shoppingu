'use strict';

/**
* Module dependencies.
*/
var T_Profile = require('../../app/controllers/T_Profile');

module.exports = function(app) {
// ProfileID Routes
// app.route('/T_Profile')
//     .get(T_Profile.all)
//     .post(users.requiresLogin, articles.create);
app.route('/T_Profile/:ProfileID')
    .get(T_Profile.T_Profile);

// Finish with setting up the ProfileID param
// Note: the articles.article function will be called everytime then it will call the next function.
app.param('ProfileID', T_Profile.T_Profile);
};

