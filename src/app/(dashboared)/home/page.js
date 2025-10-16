"use client";
// import Feed from "@/components/ui/feed";
import dynamic from "next/dynamic";
const Feed = dynamic(() => import("@/components/ui/feed"), {
  ssr: false,
});
const RightSideBar = dynamic(() => import("@/components/ui/rightsidebar"), {
  ssr: false,
});
// import RightSideBar from "@/components/ui/rightsidebar";
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
