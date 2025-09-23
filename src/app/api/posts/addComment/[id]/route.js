import { connect } from "@/utils/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import Post from "@/modals/postModal";
import isAuthenticated from "@/middlewares/isAuthenticated";
import Comment from "@/modals/commentModal";
import User from "@/modals/userModal";

connect();

export async function POST(req, { params }) {
  try {
    const userId = await isAuthenticated(req);
    if (userId instanceof NextResponse) return userId;
    const postId = params.id;
    const userWhoCommentedId = userId;
    const { text } = await req.json();
    if (!text) {
      return NextResponse.json(
        { message: "Comment text is required" },
        { status: 400 }
      );
    }
    const post = await Post.findById(postId);
    if (!post) {
      return NextResponse.json({ message: "Post not found" }, { status: 404 });
    }
    const comment = await Comment.create({
      text,
      post: postId,
      author: userWhoCommentedId,
    });

    await comment.populate({
      path: "author",
      select: "username, avatar",
    });

    post.comments.push(comment._id);
    await post.save();

    return NextResponse.json(
      { message: "Comment added successfully", comment },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
