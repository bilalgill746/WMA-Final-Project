"use client";
import React from "react";
import dynamic from "next/dynamic";
const EditProfile = dynamic(() => import("@/components/ui/EditProfile"), {
  ssr: false,
});
function EditPage() {
  return <EditProfile />;
}

export default EditPage;
