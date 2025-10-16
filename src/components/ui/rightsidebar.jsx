"use client";
import React from "react";
import { useSelector } from "react-redux";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import Link from "next/link";
import SuggestedUsers from "./SuggestedUsers";

export default function RightSideBar() {
  const { user } = useSelector((makeStore) => makeStore.auth);
  if (!user) return null;
  return (
    <div className="w-fit my-10 pr-32">
      <div className="flex items-center gap-2">
        <Link href={`/profile/${user._id}`}>
          <Avatar>
            <AvatarImage src={user?.avatar} alt="post_img" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </Link>
        <div>
          <h1 className="font-semibold text-sm">
            <Link href={`/profile/${user._id}`}>{user?.username}</Link>
          </h1>
          <span className="text-gray-600 text-sm">
            {user?.bio || "Bio here..."}
          </span>
        </div>
      </div>
      <SuggestedUsers />
    </div>
  );
}
