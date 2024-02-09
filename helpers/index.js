const nodemailer = require("nodemailer");

exports.testEmailSyntax = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email);
};

exports.testPasswordSyntax = (password) => {
  const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,}$/
  return passwordRegex.test(password);
};

exports.generateOTP = () => {
  const otp = Math.floor(1000 + Math.random() * 9000);
  return otp.toString();
};

exports.generateEmail = async (subject, body, to) => {
  try {
    let testAccount = await nodemailer.createTestAccount();

    let transporter = await nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      auth: {
        // TODO: replace `user` and `pass` values from <https://forwardemail.net>
        user: process.env.SMTP_EMAIL,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    const info = await transporter.sendMail({
      from: `"WorkSpace-Boards 👻" <${process.env.SMTP_EMAIL}>`, // sender address
      to: to, // list of receivers
      subject: subject, // Subject line
      html: body, // html body
    });

    return "Email Sent Sucessfully";
  } catch (err) {
    console.log(err);
  }
};
