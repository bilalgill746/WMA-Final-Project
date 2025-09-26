import { connect } from "@/utils/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import Comment from "@/modals/commentModal";
import isAuthenticated from "@/middlewares/isAuthenticated";
import Post from "@/modals/postModal";
import User from "@/modals/userModal";
connect();

export async function DELETE(req, { params }) {
  try {
    const postId = params.id;
    const userId = await isAuthenticated(req);
    if (userId instanceof NextResponse) return userId;
    const authorId = userId;
    const post = await Post.findById(postId);
    if (!post) {
      return NextResponse.json({ message: "Post not found" }, { status: 404 });
    }
    if (post.author.toString() !== authorId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 403 });
    }
    await Post.findByIdAndDelete(postId);
    let user = await User.findById(authorId);
    user.posts = user.posts.filter((id) => id.toString() !== postId);
    await user.save();

    await Comment.deleteMany({ post: postId });

    return NextResponse.json(
      { message: "Post deleted successfully", success: true },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
