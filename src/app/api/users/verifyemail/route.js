import { connect } from "@/utils/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";

connect();

export async function POST(req = NextRequest) {
  try {
    const reqBody = await req.json();
    const { email, code } = reqBody;
    console.log(email, code);

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 400 });
    }

    if (!user.verifyCode || !user.verifyCodeExpiry) {
      return NextResponse.json(
        { message: "Verification code not found or expired" },
        { status: 400 }
      );
    }

    if (user.verifyCodeExpiry < Date.now()) {
      return NextResponse.json(
        { message: "Verification code expired" },
        { status: 400 }
      );
    }

    const isCodeValid = await bcryptjs.compare(code, user.verifyCode);
    if (!isCodeValid) {
      return NextResponse.json(
        { message: "Invalid verification code" },
        { status: 400 }
      );
    }

    console.log(user);

    user.isVerified = true;
    user.verifyCode = undefined;
    user.verifyCodeExpiry = undefined;
    user.verifyToken = undefined;
    user.verifyTokenExpiry = undefined;
    await user.save();

    return NextResponse.json(
      { message: "Email verified successfully", success: true },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
