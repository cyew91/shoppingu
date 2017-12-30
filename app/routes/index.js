'use strict';

module.exports = function(app) {
// Home route
var index = require('../../app/controllers/index');
app.get('/', index.render);
};
// app.get('/', function(req, res){
//     res.send(req.session.passport.user);
// }, index.render);
// };

