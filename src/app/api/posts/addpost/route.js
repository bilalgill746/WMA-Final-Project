import { connect } from "@/utils/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import sharp from "sharp";
import cloudinary from "@/utils/cloudinary";
import Post from "@/modals/postModal";
import User from "@/modals/userModal";
import isAuthenticated from "@/middlewares/isAuthenticated";
connect();
export async function POST(req) {
  try {
    const authResponse = await isAuthenticated(req);
    if (authResponse instanceof NextResponse) return authResponse;
    const authorId = authResponse;

    const reqBody = await req.formData();
    const title = reqBody.get("title");
    const content = reqBody.get("content");
    const images = reqBody.getAll("image");
    if (images.length !== 1) {
      return NextResponse.json(
        { message: "Exactly one image is required" },
        { status: 400 }
      );
    }
    const image = images[0];

    const imageBuffer = Buffer.from(await image.arrayBuffer());
    const optimizedImageBuffer = await sharp(imageBuffer)
      .resize({ width: 800, height: 800, fit: "inside" })
      .toFormat("jpeg", { quality: 80 })
      .toBuffer();

    const fileUri = `data:image/jpeg;base64,${optimizedImageBuffer.toString(
      "base64"
    )}`;

    const cloudResponse = await cloudinary.uploader.upload(fileUri);
    const post = await Post.create({
      title,
      content,
      image: cloudResponse.secure_url,
      author: authorId,
    });

    const user = await User.findById(authorId);
    if (user) {
      user.posts.push(post._id);
      await user.save();
    }

    await post.populate({ path: "author", select: "-password" });

    return NextResponse.json(
      { message: "Post created successfully", post },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
