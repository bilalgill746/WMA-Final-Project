import { connect } from "@/utils/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import User from "@/modals/userModal";
import generateVerificationCode from "@/helpers/generateVerificationCode";
import sendVerificationEmail from "@/helpers/sendVerificationEmail";

connect();

export async function POST(req) {
  try {
    const reqBody = await req.json();
    const { email, code } = reqBody;
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 400 });
    }
    if (user.isVerified) {
      return NextResponse.json(
        { message: "Email already verified" },
        { status: 400 }
      );
    }
    const newCode = generateVerificationCode();
    user.verificationCode = newCode;
    user.verificationCodeExpires = new Date(Date.now() + 2 * 60 * 1000);

    await user.save();
    await sendVerificationEmail(email, newCode);
    console.log("sendVerificationEmail called for:", email);
    return NextResponse.json({
      message: "Verification code resent",
      success: true,
      newCode,
    });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
