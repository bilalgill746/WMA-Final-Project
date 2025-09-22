import { connect } from "@/utils/dbConfig";
import User from "@/modals/userModal";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

connect();

export async function POST(req = NextRequest, { params }) {
  try {
    const token = req.cookies.get("token")?.value;
    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
    const userId = decoded.id;
    const targetUserId = params.id;
    const followUserId = userId; // The authenticated user
    if (followUserId === targetUserId) {
      return NextResponse.json(
        { message: "You cannot follow/unfollow yourself" },
        { status: 400 }
      );
    }
    const user = await User.findById(followUserId);
    const targetUser = await User.findById(targetUserId);

    if (!user || !targetUser) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const isFollowing = user.following.includes(targetUserId);
    if (isFollowing) {
      await Promise.all([
        User.updateOne(
          { _id: followUserId },
          { $pull: { following: targetUserId } }
        ),
        User.updateOne(
          { _id: targetUserId },
          { $pull: { followers: followUserId } }
        ),
      ]);
      return NextResponse.json(
        { message: "unfollowed successfully" },
        { status: 200 }
      );
    } else {
      await Promise.all([
        User.updateOne(
          { _id: followUserId },
          { $push: { following: targetUserId } }
        ),
        User.updateOne(
          { _id: targetUserId },
          { $push: { followers: followUserId } }
        ),
      ]);
      return NextResponse.json(
        { message: "followed successfully" },
        { status: 200 }
      );
    }
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
