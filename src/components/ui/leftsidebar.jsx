"use client";
import { Heart, Home, LogOut, MessageCircle } from "lucide-react";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Create, Leaderboard } from "@mui/icons-material";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

const sidebarItems = [
  {
    icon: <Home />,
    text: "Home",
  },
  {
    icon: <Leaderboard />,
    text: "Leaderboard",
  },
  {
    icon: <MessageCircle />,
    text: "Messages",
  },
  {
    icon: <Heart />,
    text: "Notifications",
  },
  {
    icon: <Create />,
    text: "Create",
  },
  {
    icon: (
      <Avatar className="w-6 h-6">
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
    ),
    text: "Profile",
  },
  {
    icon: <LogOut />,
    text: "Logout",
  },
];

export default function LeftSideBar() {
  const router = useRouter();
  const logoutHandler = async () => {
    try {
      await axios.get("/api/users/logout");
      toast.success("Logged out successfully");
      router.push("/login");
    } catch (error) {
      toast.error("Error logging out");
    }
  };
  const sidebarHandler = (textType) => {
    if (textType === "Logout") logoutHandler();
  };
  return (
    <div className="fixed top-0 left-0 z-10 px-4 border-r border-gray-300 w-[16%] h-screen">
      <div className="flex flex-col">
        <h1 className="my-8 pl-3 font-bold text-xl">LOGO</h1>
        <div>
          {sidebarItems.map((item, index) => {
            return (
              <div
                onClick={() => sidebarHandler(item.text)}
                key={index}
                className="flex items-center gap-3 relative hover:bg-gray-100 cursor-pointer rounded-lg p-3 my-3"
              >
                {item.icon}
                <span>{item.text}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
