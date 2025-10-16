const nodemailer = require("nodemailer");
export default async function sendVerificationEmail(email, verificationCode) {
  try {
    const message = {
      from: `Bilal Gill <${process.env.EMAIL_FROM}`,
      to: email,
      subject: "Verify Your Email Address",

      html: ` <h2>Verify Your Email Address</h2>
     <p>Your verification code is: <strong>${verificationCode}</strong></p>
     <p>This code will expire in 2 minutes.</p>
     <p>If you didn't request this, please ignore this email.</p>`,
      headers: { "X-Entity-Ref-ID": "newemail" },
    };
    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_FROM,
        pass: process.env.PASS,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });
    await transporter.sendMail(message);
    console.log("Email sent successfully:");
  } catch (error) {
    console.log(error);
    throw error;
  }
}
