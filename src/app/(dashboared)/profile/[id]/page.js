"use client";
import React from "react";
import dynamic from "next/dynamic";
const Profile = dynamic(() => import("@/components/ui/Profile"), {
  ssr: false,
});
function Page() {
  return <Profile />;
}

export default Page;
