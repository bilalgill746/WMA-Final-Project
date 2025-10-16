import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import { Button } from "./button";
import Link from "next/link";
import { setSelectedUser } from "@/redux/slices/authSlice";
import { useSelector } from "react-redux";
import useGetAllMessage from "@/hooks/useGetAllMessage";

function Messages({ selectedUser }) {
  useGetAllMessage();
  const { messages } = useSelector((makeStore) => makeStore.chat);
  return (
    <div className="overflow-y-auto flex-1 p-4">
      <div className="flex justify-center">
        <div className="flex flex-col items-center justify-center">
          <Avatar className="h-20 w-20">
            <AvatarImage src={selectedUser?.avatar} alt="profile" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <span>{selectedUser?.username}</span>
          <Link href={`/profile/${setSelectedUser?._id}`}>
            <Button className="h-8 my-2 " variant="secondary">
              View Profile
            </Button>
          </Link>
        </div>
      </div>
      <div className="flex flex-col gap-3 ">
        {messages &&
          messages.map((msg) => {
            return (
              <div key={msg._id} className={`flex `}>
                <div>{msg.message}</div>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default Messages;
