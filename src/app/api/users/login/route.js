import { connect } from "@/utils/dbConfig";
import User from "@/modals/userModal";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import Post from "@/modals/postModal";

connect();

export async function POST(req = NextRequest) {
  try {
    const reqBody = await req.json();
    const { username, email, password } = reqBody;

    console.log(reqBody);

    let user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 400 });
    }
    console.log("user found", user);

    const validPassword = await bcryptjs.compare(password, user.password);

    if (!validPassword) {
      return NextResponse.json(
        { message: "Invalid password" },
        { status: 400 }
      );
    }

    const tokenData = {
      id: user._id,
      // username: user.username,
      // email: user.email,
    };

    const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET, {
      expiresIn: "1d",
    });

    const populatedPosts =
      user.posts && Array.isArray(user.posts)
        ? await Promise.all(
            user.posts.map(async (postId) => {
              const post = await Post.findById(postId);
              if (post && post.author.equals(user._id)) {
                return post;
              }
              return null;
            })
          )
        : [];

    user = {
      _id: user._id,
      username: user.username,
      email: user.email,
      avatar: user.avatar,
      bio: user.bio,
      followers: user.followers,
      following: user.following,
      posts: populatedPosts,
    };

    const response = NextResponse.json(
      { message: "Login successful", success: true, user },
      { status: 200 }
    );

    response.cookies.set("token", token, {
      httpOnly: true,
    });
    return response;
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
