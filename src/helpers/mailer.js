// import nodemailer from "nodemailer";
import User from "@/models/userModel";
import bcryptjs from "bcryptjs";
import { Resend } from "resend";
const resend = new Resend(process.env.RESEND_API_KEY);
export const sendEmail = async ({ email }) => {
  try {
    const verificationCode = Math.floor(
      100000 + Math.random() * 900000
    ).toString();
 
    // if (emailType === "VERIFY") {
    //   const updatedUser = await User.findByIdAndUpdate(userId, {
    //     $set: {
    //       verifyCode: hashedVerificationCode,
    //       verifyCodeExpiry: Date.now() + 3600000,
    //     },
    //   });
    // }
    const { data, error } = await resend.emails.send({
      from: "bilalgill@resend.dev",
      to: email,
      subject: "Verify Email with Code",
      html: `<p>Your Email verification code is ${verificationCode}</p>`,
    });

    if (error) {
      return error;
    }

    return { data, verificationCode };
  } catch (error) {
    return error;
  }

  //   try {
  //     const hashedToken = await bcryptjs.hash(userId.toString(), 10);
  //
  //
  //
  //       console.log("Updated User:", updatedUser);
  //       console.log("Verification Code:", verificationCode);
  //       console.log(typeof verificationCode);
  //       console.log("Updated User verifyCode:", updatedUser ? updatedUser.verifyCode : 'Update failed or user not found');

  //       // Additional check: fetch user after update to confirm
  //       const fetchedUser = await User.findById(userId);
  //       console.log("Fetched User after update:", fetchedUser);
  //       console.log("Fetched User verifyCode:", fetchedUser ? fetchedUser.verifyCode : 'Fetch failed');
  //     } else if (emailType === "RESET") {
  //       await User.findByIdAndUpdate(userId, {
  //         $set: {
  //           forgotPasswordToken: hashedToken,
  //           forgotPasswordTokenExpiry: Date.now() + 3600000,
  //         },
  //       });
  //     }

  //     // Looking to send emails in production? Check out our Email API/SMTP product!
  //     var transport = nodemailer.createTransport({
  //       host: "smtp.gmail.com",
  //       port: 587,
  //       auth: {
  //         user: "gillbilal932@gmail.com",
  //         pass: "pihq nylq yebk ivky",
  //       },
  //     });
  //     const mailOptions = {
  //       from: '"Bilal Gill" <gillbilal932@gmail.com>',
  //       to: email,
  //       subject:
  //         emailType === "VERIFY" ? "Verify your email" : "Reset your password",
  //       html: `<h1>Your verification Code is ${verificationCode}
  //       </h1>`,
  //     };

  //     const mailResponse = await transport.sendMail(mailOptions);

  //     return { mailResponse, hashedToken, verificationCode };
  //   } catch (error) {
  //     throw new Error(error.message);
  //   }
};
