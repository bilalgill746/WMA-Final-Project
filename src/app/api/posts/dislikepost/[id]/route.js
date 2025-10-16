import { connect } from "@/utils/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import Post from "@/modals/postModal";
import isAuthenticated from "@/middlewares/isAuthenticated";
import User from "@/modals/userModal";
// import { getRecieverSocketId, io } from "../../../../../../server";
connect();

export async function GET(req, { params }) {
  try {
    const authResponse = await isAuthenticated(req);
    if (authResponse instanceof NextResponse) return authResponse;
    const userId = authResponse;
    const resolvedParams = await params;
    const postId = resolvedParams.id;
    // const postId = await params.id;
    const userWhoLikedId = userId;
    const post = await Post.findById(postId);
    if (!post) {
      return NextResponse.json({ message: "Post not found" }, { status: 404 });
    }
    await post.updateOne({ $pull: { likes: userWhoLikedId } });
    await post.save();

    // const user = await User.findById(userWhoLikedId).select("username avatar");
    // const postOwnerId = post.author.toString();
    // if (postOwnerId !== userWhoLikedId) {
    //   const notification = {
    //     type: "dislike",
    //     userId: userWhoLikedId,
    //     userDetails: user,
    //     postId,
    //     message: "Your post was disliked",
    //   };
    //   const postOwnerSocketId = getRecieverSocketId(postOwnerId);
    //   io.to(postOwnerSocketId).emit("notification", notification);
    // }

    return NextResponse.json(
      { message: "Post disliked successfully", success: true },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
