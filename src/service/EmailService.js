var nodemailer = require('nodemailer')
var transporter = require('../config/Email')
// send mail with password confirmation

exports.sendMail = (from, to, subject, html) => {
  var mailOpts = {
    from: from,
    to: to,
    subject: subject,
    html: html
  }
  transporter.sendMail(mailOpts, function(err, response) {
    if (err) {
      return false
    } else {
      return true
    }
  })
}
