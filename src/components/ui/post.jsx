"use client";
import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import CommentDialog from "./commentdialog";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { Bookmark, MessageCircle, MoreHorizontal, Send } from "lucide-react";
function Post() {
  const [text, setText] = useState("");
  const [open, setOpen] = useState(false);
  const changeEventHandler = (e) => {
    const inputText = e.target.value;
    if (inputText.trim()) {
      setText(inputText);
    } else {
      setText("");
    }
  };
  return (
    <div className="my-8 w-full max-w-sm mx-auto">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Avatar>
            <AvatarImage src="" alt="" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <h1>username</h1>
        </div>
        <div>
          <Dialog>
            <DialogTrigger asChild>
              <MoreHorizontal className="cursor-pointer" />
            </DialogTrigger>
            <DialogTitle></DialogTitle>
            <DialogContent className="flex flex-col items-center text-sm text-center w-lg">
              <button
                variant="ghost"
                className="cursor-pointer w-fit text-[#ED4956] font-bold"
              >
                Unfollow
              </button>
              <button variant="ghost" className="cursor-pointer w-fit">
                Add to favourites
              </button>
              <button variant="ghost" className="cursor-pointer w-fit">
                Delete
              </button>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <img
        className="rounded-sm my-2 w-full aspect-square object-cover"
        src="https://images.unsplash.com/photo-1758640920659-0bb864175983?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="post_img"
      />

      <div className="flex items-center justify-between my-2">
        <div className="flex items-centre  gap-3">
          <FaRegHeart
            size={"22px"}
            className="cursor-pointer hover:text-red-600"
          />
          <MessageCircle
            onClick={() => setOpen(true)}
            className="cursor-pointer hover:text-gray-600"
          />
          <Send className="cursor-pointer hover:text-gray-600" />
        </div>
        <Bookmark className="cursor-pointer hover:text-gray-600" />
      </div>
      <span className="font-medium block mb-2">1k likes</span>
      <p>
        <span className="font-medium mr-2">username</span>
        caption
      </p>
      <span
        className="cursor-pointer text-sm text-gray-400"
        onClick={() => setOpen(true)}
      >
        view all 10 comments
      </span>
      <CommentDialog open={open} setOpen={setOpen} />
      <div className="flex items-center justify-between">
        <input
          type="text"
          placeholder="Add a comment..."
          value={text}
          onChange={changeEventHandler}
          className="outline-none text-sm w-full"
        />
        {text && <span className="text-[#3BADF8]">Post</span>}
      </div>
    </div>
  );
}

export default Post;
