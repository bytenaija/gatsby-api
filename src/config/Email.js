const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
  service: 'Mailgun',
  auth: {
    user: 'postmaster@sandboxXXXXXXXXXXXXXXXX.mailgun.org',
    pass: 'XXXXXXXXXXXXXXXX'
  }
})

module.export = transporter
