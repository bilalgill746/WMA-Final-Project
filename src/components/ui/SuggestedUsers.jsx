"use client";
import Link from "next/link";
import React from "react";
import { useSelector } from "react-redux";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import useFollowUnfollow from "@/hooks/useFollowUnfollow";

function SuggestedUsers() {
  const { suggestedUsers } = useSelector((makeStore) => makeStore.auth);
  return (
    <div className="my-10 ">
      <div>
        <h1 className="font-semibold items-center justify-between text-sm">
          Suggested for you{" "}
        </h1>
        <span className="font-medium cursor-pointer">See All</span>
      </div>
      {suggestedUsers.slice(0, 3).map((user) => {
        const { isFollowing, toggleFollow, isLoading } = useFollowUnfollow(
          user._id
        );
        return (
          <div
            key={user._id}
            className="flex items-center justify-between my-5"
          >
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
            <span
              onClick={toggleFollow}
              className={`text-[#3BADF8] text-xs font-bold hover:text-[#3495d6] cursor-pointer ${
                isLoading ? "opacity-50" : ""
              }`}
            >
              {isFollowing ? "Unfollow" : "Follow"}
            </span>
          </div>
        );
      })}
    </div>
  );
}

export default SuggestedUsers;
