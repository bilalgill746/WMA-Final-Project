import { connect } from "@/utils/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import isAuthenticated from "@/middlewares/isAuthenticated";
import Post from "@/modals/postModal";
import User from "@/modals/userModal";

connect();

export async function POST(req, { params }) {
  try {
    const postId = params.id;
    const userId = await isAuthenticated(req);
    if (userId instanceof NextResponse) return userId;
    const authorId = userId;

    const post = await Post.findById(postId);
    if (!post) {
      return NextResponse.json({ message: "Post not found" }, { status: 404 });
    }

    const user = await User.findById(authorId);
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    if (user.bookmarks.includes(post._id)) {
      await user.updateOne({ $pull: { bookmarks: post._id } });
      await user.save();
      return NextResponse.json(
        { message: "Post removed from bookmarks", type: "unsaved" },
        { status: 200 }
      );
    } else {
      await user.updateOne({ $addToSet: { bookmarks: post._id } });
      await user.save();
      return NextResponse.json(
        { message: "Post added to bookmarks", type: "saved" },
        { status: 200 }
      );
    }
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
