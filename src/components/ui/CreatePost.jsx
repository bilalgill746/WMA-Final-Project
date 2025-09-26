"use client";
import React, { useRef, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./dialog";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import { Textarea } from "./textarea";
import { Button } from "./button";
import { readFileAsDataURL } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addPost, setPosts } from "@/redux/slices/postSlice";

export default function CreatePost({ open, setOpen }) {
  const imageRef = useRef();
  const [file, setFile] = useState("");
  const [caption, setCaption] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const dispatch = useDispatch();
  const { user } = useSelector((makeStore) => makeStore.auth);
  const { posts } = useSelector((makeStore) => makeStore.post);

  const fileChangeHandler = async (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setFile(file);
      const dataUrl = await readFileAsDataURL(file);
      setImagePreview(dataUrl);
    }
  };
  const createPostHandler = async (e) => {
    const formData = new FormData();
    formData.append("content", caption);
    formData.append("title", title);
    if (imagePreview) formData.append("image", file);
    try {
      setLoading(true);
      console.log(formData);

      const res = await axios.post("/api/posts/addpost", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });
      console.log("api response", res.data);

      if (res.data.message) {
        toast.success(res.data.message);
        dispatch(addPost(res.data.post));
        setCaption("");
        setFile("");
        setImagePreview("");
        setOpen(false);
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        toast.error(error.response.data.message);
      } else {
        toast.error("An error occurred");
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <Dialog open={open}>
      <DialogTitle></DialogTitle>
      <DialogContent onInteractOutside={() => setOpen(false)} className="w-lg">
        <DialogHeader className="text-center font-semibold">
          Create New Post
        </DialogHeader>
        <div className="flex gap-3 items-center">
          <Avatar>
            <AvatarImage src={user?.avatar} alt="" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div>
            <h1 className="font-semibold text-xs">{user?.username}</h1>
            <span className="text-gray-600 text-xs">Bio here...</span>
          </div>
        </div>
        <label className="font-semibold">Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border-b border-gray-300  focus:outline-none transition-all duration-200"
          placeholder="title..."
        />
        <Textarea
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          className="focus-visible:ring-transparent border-none"
          placeholder="Write a caption..."
        />
        {imagePreview && (
          <div className="w-full h-64 flex items-center justify-center">
            <img
              src={imagePreview}
              alt="preview_img"
              className="object-cover h-full w-full rounded-md"
            />
          </div>
        )}
        <input
          type="file"
          className="hidden "
          ref={imageRef}
          onChange={fileChangeHandler}
        />
        <Button
          onClick={() => {
            imageRef.current.click();
          }}
          className="w-fit mx-auto bg-[#0095F6]  hover:bg-[#258bcf]"
        >
          Select from computer
        </Button>
        {imagePreview &&
          (loading ? (
            <Button>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Please wait
            </Button>
          ) : (
            <Button onClick={createPostHandler}>Post</Button>
          ))}
      </DialogContent>
    </Dialog>
  );
}
