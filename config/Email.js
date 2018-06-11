const nodemailer = require('nodemailer');

transporter = nodemailer.createTransport({
    service: 'Mailgun',
    auth: {
        user: 'postmaster@sandboxXXXXXXXXXXXXXXXX.mailgun.org',
        pass: 'XXXXXXXXXXXXXXXX'
    }
});

module.export = transporter;