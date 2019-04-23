"use strict"

const postmark = require("postmark");
const config = require("../../../config/config");

const ForgetPasswordEmailService = ({ name, token }) => {
  let client = new postmark.ServerClient(config.POSTMARK.TOKEN);
  let templateModel = {
    name: name,
    action_url: `${config.app.rootURL}/resetpassword/token=${token}/verify`
  };

  client.sendEmailWithTemplate(
    {
      TemplateAlias: config.POSTMARK.FORGET_PASSWORD_TEMPLATE_ALIAS,
      TemplateModel: templateModel,
      InlineCss: true,
      From: config.POSTMARK.DEVELOPMENT_EMAIL,
      To: config.POSTMARK.DEVELOPMENT_EMAIL // In production should update to use user's email instead.
    },
    (err, data) => {
      if (err) {
        console.log(err);
      }
      console.log("<=== Postmark: Forget Password Email Sent ===> ");
      console.log(data);
      console.log("<=== Postmark: Forget Password Email Sent ===> ");
    }
  );
};

module.exports = ForgetPasswordEmailService;
