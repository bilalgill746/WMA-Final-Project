"use client";
import React from "react";
import dynamic from "next/dynamic";
const ChatPage = dynamic(() => import("@/components/ui/ChatPage"), {
  ssr: false,
});

function page() {
  return <ChatPage />;
}

export default page;
