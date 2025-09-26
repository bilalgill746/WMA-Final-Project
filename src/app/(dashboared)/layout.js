"use client";
import useAuthCheck from "@/hooks/useAuthCheck";
import LeftSideBar from "@/components/ui/leftsidebar";
export default function DashboardLayout({ children }) {
  useAuthCheck();
  return (
    <div>
      <LeftSideBar />
      {children}
    </div>
  );
}
