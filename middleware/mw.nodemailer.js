const nodemailer = require('nodemailer');
require('dotenv').config({ path: __dirname + '/mailer.env' })

let sendEmail = (username, toAddress, fromAddress, html) => {

  let transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    secure: false,
    service: process.env.MAIL_SERVICE,
    auth: {
      user: process.env.AUTH_USER,
      pass: process.env.AUTH_PW
    },
    logger: true
  })

  try {
    let info = await.transporter.sendMail({
      from: fromEmail,
      to: toEmail,
      html: html
    })

    console.log(`Message sent: ${info.accepted}`)
    console.log(`Preview URL is: ${nodemail.getTestMessageUrl(info)}`)
  }

}
