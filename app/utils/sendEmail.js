const sgMail = require('@sendgrid/mail');
const config = require('config');

sgMail.setApiKey(config.get('sendGrid').apiKey);
module.exports = (to, from, subject, text, html) => {
  sgMail.send({
    to,
    from,
    subject,
    text,
    html,
  });
};
