import { connect } from "@/utils/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import Post from "@/modals/postModal";
import User from "@/modals/userModal";
import Comment from "@/modals/commentModal";

connect();

export async function GET(req) {
  try {
    const posts = await Post.find()
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
