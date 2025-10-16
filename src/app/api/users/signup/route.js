import { connect } from "@/utils/dbConfig";
import User from "@/modals/userModal";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import generateVerificationCode from "@/helpers/generateVerificationCode";
import sendVerificationEmail from "@/helpers/sendVerificationEmail";
connect();
export async function POST(req = NextRequest) {
  try {
    const reqBody = await req.json();
    const { username, email, password } = reqBody;

    console.log(reqBody);

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 400 }
      );
    }
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const verificationCode = generateVerificationCode();
    const codeExpires = new Date(Date.now() + 2 * 60 * 1000);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      isVerified: false,
      verificationCode: verificationCode,
      verificationCodeExpires: codeExpires,
    });

    const savedUser = await newUser.save();
    console.log(savedUser);

    await sendVerificationEmail(email, verificationCode);

    return NextResponse.json({
      message: "Verification code sent",
      success: true,
      savedUser,
    });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
