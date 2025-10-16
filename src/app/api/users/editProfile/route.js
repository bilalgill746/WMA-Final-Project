import { connect } from "@/utils/dbConfig";
import User from "@/modals/userModal";
import { NextRequest, NextResponse } from "next/server";
import cloudinary from "@/utils/cloudinary";
import jwt from "jsonwebtoken";
import getDataUri from "@/utils/datauri";
import isAuthenticated from "@/middlewares/isAuthenticated";
import dotenv from "dotenv";

dotenv.config();
connect();

export async function POST(req) {
  try {
    const authResponse = await isAuthenticated(req);
    if (authResponse instanceof NextResponse) return authResponse;
    const userId = authResponse;

    const formData = await req.formData();
    const bio = formData.get("bio");
    const gender = formData.get("gender");
    const avatarFile = formData.get("avatar");
    let cloudResponse;

    if (avatarFile) {
      const fileUri = await getDataUri(avatarFile);
      cloudResponse = await cloudinary.uploader.upload(fileUri);
    }

    const user = await User.findById(userId).select("-password");
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
    if (bio) user.bio = bio;
    if (gender) user.gender = gender;
    if (avatarFile) user.avatar = cloudResponse.secure_url;

    await user.save();
    return NextResponse.json(
      { message: "Profile updated successfully", user, success: true },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
