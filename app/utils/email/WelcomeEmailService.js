"use strict"

const postmark = require("postmark");
const config = require("../../../config/config");

const WelcomeEmailService = ({ name, username }) => {
   console.log("WelcomeEmailService ===> ", name, username);

  let client = new postmark.ServerClient(config.POSTMARK.TOKEN);
  let templateModel = {
    name: name,
    username: username
  };

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
      console.log("<=== Postmark: Welcome Email Sent ===> ");
      console.log(data);
      console.log("<=== Postmark: Welcome Email Sent ===> ");
    }
  );
};

module.exports = WelcomeEmailService;
