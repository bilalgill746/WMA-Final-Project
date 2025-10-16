import { Resend } from "resend";
import { connect } from "@/utils/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import User from "@/modals/userModal";

connect();
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
  try {
    const reqBody = await req.json();
    const { email, code } = reqBody;

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ message: "Email mismatch" }, { status: 400 });
    }
    if (user.isVerified) {
      return NextResponse.json(
        { message: "Email already verified" },
        { status: 400 }
      );
    }
    if (user.verificationCode !== code) {
      return NextResponse.json(
        { message: "Invalid verification code" },
        { status: 400 }
      );
    }
    if (user.verificationCodeExpires < new Date()) {
      return NextResponse.json(
        { message: "Verification code expired" },
        { status: 400 }
      );
    }
    user.isVerified = true;
    user.verificationCode = null;
    user.verificationCodeExpires = null;
    user.verifiedAt = new Date();

    await user.save();

    return NextResponse.json({
      message: "Email verified successfully",
      success: true,
    });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}

// export async function POST(req = NextRequest) {
//   try {
//     const reqBody = await req.json();
//     const { email, code } = reqBody;
//     console.log(email, code);

//     const user = await User.findOne({ email });
//     if (!user) {
//       return NextResponse.json({ message: "User not found" }, { status: 400 });
//     }

//     if (!user.verifyCode || !user.verifyCodeExpiry) {
//       return NextResponse.json(
//         { message: "Verification code not found or expired" },
//         { status: 400 }
//       );
//     }

//     if (user.verifyCodeExpiry < Date.now()) {
//       return NextResponse.json(
//         { message: "Verification code expired" },
//         { status: 400 }
//       );
//     }

//     const isCodeValid = await bcryptjs.compare(code, user.verifyCode);
//     if (!isCodeValid) {
//       return NextResponse.json(
//         { message: "Invalid verification code" },
//         { status: 400 }
//       );
//     }

//     console.log(user);

//     user.isVerified = true;
//     user.verifyCode = undefined;
//     user.verifyCodeExpiry = undefined;
//     user.verifyToken = undefined;
//     user.verifyTokenExpiry = undefined;
//     await user.save();

//     return NextResponse.json(
//       { message: "Email verified successfully", success: true },
//       { status: 200 }
//     );
//   } catch (error) {
//     return NextResponse.json({ message: error.message }, { status: 500 });
//   }
// }
