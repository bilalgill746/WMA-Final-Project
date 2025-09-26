"use client";
import Feed from "@/components/ui/feed";
import RightSideBar from "@/components/ui/rightsidebar";
import useGetAllPost from "@/hooks/userGetAllPost";
export default function HomePage() {
  useGetAllPost();
  return (
    <div className="flex ">
      <div className="flex-grow">
        <Feed />
      </div>
      <RightSideBar />
    </div>
  );
}
