"use client";
import React from "react";
import dynamic from "next/dynamic";
const Post = dynamic(() => import("./post"), { ssr: false });
// import Post from "./post";
import { useSelector } from "react-redux";

export default function Posts() {
  const { posts } = useSelector((makeStore) => makeStore.post);
  return (
    <div>
      {posts.map((post) => (
        <Post key={post._id} post={post} />
      ))}
    </div>
  );
}
