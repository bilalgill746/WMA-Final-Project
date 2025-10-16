import { connect } from "@/utils/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import Comment from "@/modals/commentModal";
connect();

export async function GET(req, { params }) {
  try {
    // const postId = params.id;
    const resolvedParams = await params;
    const postId = resolvedParams.id;

    const comments = await Comment.find({ post: postId }).populate({
      path: "author",
      select: "username  avatar",
    });

    if (!comments) {
      return NextResponse.json(
        { message: "No comments found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ comments }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
