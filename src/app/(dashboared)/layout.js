"use client";
import useAuthCheck from "@/hooks/useAuthCheck";
import dynamic from "next/dynamic";
const LeftSideBar = dynamic(() => import("@/components/ui/leftsidebar"), {
  ssr: false,
});
import useGetSuggestedUsers from "@/hooks/useGetSuggestedUsers";
import Socket from "@/components/ui/Socket";
// import LeftSideBar from "@/components/ui/leftsidebar";
export default function DashboardLayout({ children }) {
  useAuthCheck();
  useGetSuggestedUsers();
  return (
    <div>
      <LeftSideBar />
      <Socket />
      {children}
    </div>
  );
}
