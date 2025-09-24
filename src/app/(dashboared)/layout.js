import LeftSideBar from "@/components/ui/leftsidebar";
export default function DashboardLayout({ children }) {
  return (
    <div>
      <LeftSideBar />
      {children}
    </div>
  );
}
