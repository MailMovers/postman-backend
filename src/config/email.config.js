const nodemailer = require('nodemailer');

const smtpTransport = nodemailer.createTransport({
    pool: true,
    service: 'naver',
    host: 'smtp.naver.com',
    port: 587,
    secure: false,
    requireTLS: true,
    auth: {
        user: process.env.NODEMAILER_USER,
        pass: process.env.NODEMAILER_PASS,
    },
    tls: {
        rejectUnauthorized: false,
    },
});

module.exports = smtpTransport;
