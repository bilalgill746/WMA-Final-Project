import { connect } from "@/utils/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import Post from "@/modals/postModal";
import isAuthenticated from "@/middlewares/isAuthenticated";
connect();

export async function POST(req, { params }) {
  try {
    const authResponse = await isAuthenticated(req);
    if (authResponse instanceof NextResponse) return authResponse;
    const userId = authResponse;
    const postId = params.id;
    const userWhoLikedId = userId;
    const post = await Post.findById(postId);
    if (!post) {
      return NextResponse.json({ message: "Post not found" }, { status: 404 });
    }
    await post.updateOne({ $pull: { likes: userWhoLikedId } });
    await post.save();

    return NextResponse.json(
      { message: "Post disliked successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
