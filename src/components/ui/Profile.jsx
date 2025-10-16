import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import useGetUserProfile from "@/hooks/useGetUserProfile";
import { useParams } from "next/navigation";
import { useSelector } from "react-redux";
import { Button } from "./button";
import { Badge } from "./badge";
import { AtSign, Heart, MessageCircle } from "lucide-react";
import Link from "next/link";
import useFollowUnfollow from "@/hooks/useFollowUnfollow";
function Profile() {
  const params = useParams();
  const userId = params.id;
  useGetUserProfile(userId);
  const [activeTab, setActiveTab] = useState("posts");
  const { userProfile, user } = useSelector((makeStore) => makeStore.auth);
  const isLoggedInUserProfile = user?._id === userProfile?._id;
  const { isFollowing, toggleFollow, isLoading } = useFollowUnfollow(
    userProfile?._id
  );

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };
  const displayedPost =
    activeTab === "posts" ? userProfile?.posts : userProfile?.bookmarks;
  return (
    <div className="flex max-w-5xl justify-center mx-auto pl-10">
      <div className="flex flex-col gap-20 p-8">
        <div className="grid grid-cols-2">
          <section className="flex items-center justify-center">
            <Avatar className="h-32 w-32">
              <AvatarImage
                src={userProfile?.avatar || null}
                alt="profile-photo"
              />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </section>
          <section>
            <div className="flex flex-col gap-5">
              <div className="flex items-center gap-2">
                <span>{userProfile?.username}</span>
                {isLoggedInUserProfile ? (
                  <>
                    <Link href="/account/edit">
                      <Button
                        variant="secondary"
                        className="hover:bg-gray-200 h-8 cursor-pointer"
                      >
                        Edit Profile
                      </Button>
                    </Link>
                  </>
                ) : isFollowing ? (
                  <>
                    <Button
                      onClick={toggleFollow}
                      disabled={isLoading}
                      variant="secondary"
                    >
                      Unfollow
                    </Button>
                    <Button variant="secondary">Message</Button>
                  </>
                ) : (
                  <Button
                    onClick={toggleFollow}
                    disabled={isLoading}
                    className="bg-[#0095F6] hover:bg-[#3192d2] h-8 cursor-pointer"
                  >
                    Follow
                  </Button>
                )}
              </div>
              <div className="flex items-center gap-4">
                <p>
                  <span className="font-semibold">
                    {userProfile?.posts.length}{" "}
                  </span>
                  posts
                </p>
                <p>
                  <span className="font-semibold">
                    {userProfile?.followers.length}{" "}
                  </span>
                  followers
                </p>
                <p>
                  <span className="font-semibold">
                    {userProfile?.following.length}{" "}
                  </span>
                  following
                </p>
              </div>
              <div className="flex flex-col gap-1">
                <span>{userProfile?.bio || "bio here..."}</span>
                <Badge className="w-fit" variant="secondary">
                  <AtSign />
                  <span className="pl-1">{userProfile?.username}</span>
                </Badge>
                <span></span>
              </div>
            </div>
          </section>
        </div>
        <div className="border-t border-t-gray-200">
          <div className="flex items-center justify-center gap-10 text-sm">
            <span
              className={`py-3 cursor-pointer ${
                activeTab === "posts" ? "font-bold" : ""
              }`}
              onClick={() => handleTabChange("posts")}
            >
              POSTS
            </span>
            <span
              className={`py-3 cursor-pointer ${
                activeTab === "saved" ? "font-bold" : ""
              }`}
              onClick={() => handleTabChange("saved")}
            >
              SAVED
            </span>
          </div>
          <div className="grid grid-cols-3 gap-1">
            {displayedPost &&
              displayedPost.map((post) => {
                return (
                  <div
                    key={post?._id}
                    className="relative group cursor-pointer"
                  >
                    <img
                      src={post.image}
                      alt="post-img"
                      className="rounded-sm my-2 w-full aspect-square object-cover "
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-50 transition-opacity duration-300">
                      <div className="flex items-center text-white space-x-4 ">
                        <button className="flex items-center gap-2">
                          <Heart />
                          <span>{post?.likes.length}</span>
                        </button>
                        <button className="flex items-center gap-2">
                          <MessageCircle />
                          <span>{post?.comments.length}</span>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
