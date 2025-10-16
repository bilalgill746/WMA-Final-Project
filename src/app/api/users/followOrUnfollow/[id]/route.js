import { connect } from "@/utils/dbConfig";
import User from "@/modals/userModal";
import { NextRequest, NextResponse } from "next/server";
import isAuthenticated from "@/middlewares/isAuthenticated";

connect();

export async function GET(req, { params }) {
  try {
    const authResponse = await isAuthenticated(req);
    if (authResponse instanceof NextResponse) return authResponse;
    const userId = authResponse;
    const resolvedParams = await params;
    const targetUserId = resolvedParams.id;
    // const targetUserId = await params.id;
    const followUserId = userId; // The authenticated user

    console.log(targetUserId);
    console.log(followUserId);

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
        { message: "unfollowed successfully", success: true },
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
        { message: "followed successfully", success: true },
        { status: 200 }
      );
    }
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
