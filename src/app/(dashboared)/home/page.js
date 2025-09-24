import Feed from "@/components/ui/feed";
import RightSideBar from "@/components/ui/rightsidebar";
export default function HomePage() {
  return (
    <div className="flex ">
      <div className="flex-grow">
      <Feed/>
      </div>
      <RightSideBar/>
    </div>
  );
}
