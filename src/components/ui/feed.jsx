import React from "react";
import dynamic from "next/dynamic";
const Posts = dynamic(() => import('./posts'), { ssr: false });

// import Posts from "./posts";
export default function Feed() {
  return (
    <div className="flex my-8 flex-col items-center pl-[20%]">
      <Posts />
    </div>
  );
}
