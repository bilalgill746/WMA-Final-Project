"use client";
import { socket } from "@/socket";
import { Heart } from "lucide-react";
import React, { useEffect, useState } from "react";

function Notification() {
  const [notifications, setNotifications] = useState([]);
  useEffect(() => {
    socket.on("getNotification", (data) => {
      setNotifications((prev) => [...prev, data]);
    });
  }, []);
  return (
    <div className="relative">
      <div className="flex items-center gap-3 relative hover:bg-gray-100 cursor-pointer rounded-lg p-3 my-3">
        <Heart />
        <span>Notifications</span>
      </div>
      <div className="absolute -right-full p-4 rounded-lg bg-white text-black flex flex-col gap-4 w-max">
        <h1 className="text-xl text-gray-600 ">Notifications</h1>
        {notifications.map((n) => (
          <div className="cursor-pointer">
            <b>{n.senderUsername}</b>
            {""}
            {n.type === "like"
              ? "liked your post"
              : n.type === "comment"
              ? "replied your post"
              : "followed you"}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Notification;
