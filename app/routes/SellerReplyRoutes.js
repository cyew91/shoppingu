'use strict';

/**
 * Module dependencies.
 */
var sellerReply = require('../../app/controllers/SellerReplyControllers');

module.exports = function (app) {
    // User Profile Routes
    app.route('/sellerreply/:sellerReplyId')
    .get(sellerReply.show)
    .put(sellerReply.updateSellerReply);

    app.route('/sellerreply')
    .post(sellerReply.createSellerReply)
    .get(sellerReply.all);

    app.param('sellerReplyId', sellerReply.getSellerReplyById);
};