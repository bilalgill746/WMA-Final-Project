"use client";
import React, { useState, useEffect } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import axios from "axios";
import { addPost, setPosts, setSelectedPost } from "@/redux/slices/postSlice";
import { Badge } from "./badge";
import Link from "next/link";
import {
  addBookmark,
  removeBookmark,
  followUser,
  unfollowUser,
} from "@/redux/slices/authSlice";
import useFollowUnfollow from "@/hooks/useFollowUnfollow";
function Post({ post }) {
  const [text, setText] = useState("");
  const [open, setOpen] = useState(false);
  const { user } = useSelector((makeStore) => makeStore.auth);
  const { posts } = useSelector((makeStore) => makeStore.post);
  // const [liked, setLiked] = useState(post.likes.includes(user?._id) || false);
  const [liked, setLiked] = useState(false);
  const [postLike, setPostLike] = useState(post.likes.length);
  const [comment, setComment] = useState(post.comments);
  const [bookmark, setBookmark] = useState(false);
  const { isFollowing, toggleFollow, isLoading } = useFollowUnfollow(
    post.author?._id
  );
  const dispatch = useDispatch();
  useEffect(() => {
    // Set liked and postLike based on user after mount
    if (user) {
      setLiked(post.likes.includes(user._id));
      setPostLike(post.likes.length);
    }
  }, [user, post.likes]);
  useEffect(() => {
    setComment(post.comments);
  }, [post.comments]);
  useEffect(() => {
    if (user) {
      setBookmark(user.bookmarks.includes(post._id));
    }
  }, [user, post._id]);
  const changeEventHandler = (e) => {
    const inputText = e.target.value;
    if (inputText.trim()) {
      setText(inputText);
    } else {
      setText("");
    }
  };

  const commentHandler = async () => {
    try {
      const res = await axios.post(
        `api/posts/addcomment/${post._id}`,
        { text },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        const updatedCommentData = [...comment, res.data.comment];
        setComment(updatedCommentData);
        const updatedPostData = posts.map((p) =>
          p._id === post._id ? { ...p, comments: updatedCommentData } : p
        );
        dispatch(setPosts(updatedPostData));
        toast.success(res.data.message);
        setText("");
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const likeOrDislikeHandler = async () => {
    try {
      const action = liked ? "dislikepost" : "likepost";
      const res = await axios.get(`api/posts/${action}/${post?._id}`, {
        withCredentials: true,
      });
      if (res.data.success) {
        const updatedLikes = liked ? postLike - 1 : postLike + 1;
        setPostLike(updatedLikes);
        setLiked(!liked);
        const updatedPostdata = posts.map((p) =>
          p._id === post._id
            ? {
                ...p,
                likes: liked
                  ? p.likes.filter((id) => id !== user._id)
                  : [...p.likes, user._id],
              }
            : p
        );
        dispatch(setPosts(updatedPostdata));
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  const bookmarkHandler = async () => {
    try {
      const res = await axios.get(`/api/posts/bookmark/${post?._id}`, {
        withCredentials: true,
      });
      if (res.data.success) {
        if (bookmark) {
          dispatch(removeBookmark(post._id));
        } else {
          dispatch(addBookmark(post._id));
        }
        setBookmark(!bookmark);
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const deletePostHandler = async () => {
    try {
      const res = await axios.delete(`api/posts/delete/${post?._id}`, {
        withCredentials: true,
      });
      if (res.data.success) {
        const updatedPostData = posts.filter(
          (postItem) => postItem?._id !== post?._id
        );
        dispatch(setPosts(updatedPostData));
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  return (
    <div className="my-8 w-full max-w-sm mx-auto">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href={`/profile/${post.author?._id}`}>
            <Avatar>
              <AvatarImage
                src={
                  post.author.avatar && post.author.avatar.trim()
                    ? post.author.avatar
                    : undefined
                }
              />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </Link>

          <div className="flex items-center gap-3">
            <h1>{post.author?.username}</h1>
            {user._id === post.author._id && (
              <Badge variant="secondary">Author</Badge>
            )}
          </div>
        </div>
        <div>
          <Dialog>
            <DialogTrigger asChild>
              <MoreHorizontal className="cursor-pointer" />
            </DialogTrigger>
            <DialogTitle></DialogTitle>
            <DialogContent className="flex flex-col items-center text-sm text-center w-lg">
              {post &&
                user?._id !== post.author?._id &&
                (isFollowing ? (
                  <button
                    onClick={toggleFollow}
                    disabled={isLoading}
                    variant="ghost"
                    className="cursor-pointer w-fit text-[#ED4956] font-bold"
                  >
                    unfollow
                  </button>
                ) : (
                  <button
                    onClick={toggleFollow}
                    disabled={isLoading}
                    variant="ghost"
                    className="cursor-pointer w-fit text-[#ED4956] font-bold"
                  >
                    follow
                  </button>
                ))}
              <button
                onClick={bookmarkHandler}
                variant="ghost"
                className="cursor-pointer w-fit"
              >
                Add to favourites
              </button>
              {user && user?._id === post.author?._id && (
                <button
                  onClick={deletePostHandler}
                  variant="ghost"
                  className="cursor-pointer w-fit"
                >
                  Delete
                </button>
              )}
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <h1>{post?.title}</h1>
      {/* <img
        className="rounded-sm my-2 w-full aspect-square object-cover"
        src={post.image}
        alt="post_img"
      /> */}
      {/* {post.image ? (
        <img src={post.image} alt="post_img" />
      ) : (
        <div className="placeholder">No image available</div> // Or a default image
      )} */}
      {post.image && post.image.trim() ? (
        <img src={post.image} alt="post_img" />
      ) : (
        <div>No image</div> // Placeholder
      )}
      <div className="flex items-center justify-between my-2">
        <div className="flex items-center  gap-3">
          {liked ? (
            <FaHeart
              onClick={likeOrDislikeHandler}
              size={"22px"}
              className="cursor-pointer text-red-600"
            />
          ) : (
            <FaRegHeart
              onClick={likeOrDislikeHandler}
              size={"22px"}
              className="cursor-pointer hover:text-gray-600"
            />
          )}
          <MessageCircle
            onClick={() => {
              dispatch(setSelectedPost(post));
              setOpen(true);
            }}
            className="cursor-pointer hover:text-gray-600"
          />
          <Send className="cursor-pointer hover:text-gray-600" />
        </div>
        {bookmark ? (
          <Bookmark
            onClick={bookmarkHandler}
            color="#FFD700"
            fill={"#FFD700"}
            className="cursor-pointer hover:text-gray-600 "
          />
        ) : (
          <Bookmark
            onClick={bookmarkHandler}
            className="cursor-pointer hover:text-gray-600 "
          />
        )}
      </div>
      <span className="font-medium block mb-2">{postLike} likes</span>
      <p>
        <span className="font-medium mr-2">{post.author?.username}</span>
        {post.content}
      </p>
      {comment.length > 0 && (
        <span
          className="cursor-pointer text-sm text-gray-400"
          onClick={() => {
            dispatch(setSelectedPost(post));
            setOpen(true);
          }}
        >
          view all {comment.length} comments
        </span>
      )}

      <CommentDialog open={open} setOpen={setOpen} />
      <div className="flex items-center justify-between">
        <input
          type="text"
          placeholder="Add a comment..."
          value={text}
          onChange={changeEventHandler}
          className="outline-none text-sm w-full"
        />
        {text && (
          <span
            onClick={commentHandler}
            className="text-[#3BADF8] cursor-pointer"
          >
            Post
          </span>
        )}
      </div>
    </div>
  );
}

export default Post;
