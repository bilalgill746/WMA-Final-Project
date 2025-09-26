import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    title: { type: String, required: false },
    content: { type: String, required: false },
    image: { type: String, default: "" },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
  },
  { timestamps: true }
);

const Post = mongoose.models.Post || mongoose.model("Post", postSchema);

export default Post;
