import { connect } from "@/utils/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import Post from "@/modals/postModal";
import isAuthenticated from "@/middlewares/isAuthenticated";

connect();

export async function GET(req) {
  try {
    const authResponse = await isAuthenticated(req);
    if (authResponse instanceof NextResponse) return authResponse;
    const authorId = authResponse;

    const posts = await Post.find({ author: authorId })
      .sort({ createdAt: -1 })
      .populate({ path: "author", select: "username , avatar" })
      .populate({
        path: "comments",
        sort: { createdAt: -1 },
        populate: { path: "author", select: "username , avatar" },
      });
    return NextResponse.json({ posts }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
