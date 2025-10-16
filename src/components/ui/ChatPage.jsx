"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import { setSelectedUser } from "@/redux/slices/authSlice";
import { Button } from "./button";
import { MessageCircle, MessageCircleCode } from "lucide-react";
import Messages from "./Messages";
import { toast } from "sonner";
import axios from "axios";
import { setMessages } from "@/redux/slices/chatSlice";

function ChatPage() {
  const [textMessage, setTextMessage] = useState("");
  const { user, suggestedUsers, selectedUser } = useSelector(
    (makeStore) => makeStore.auth
  );
  const { onlineUsers, messages } = useSelector((makeStore) => makeStore.chat);
  const dispatch = useDispatch();
  const sendMessageHandler = async (recieverId) => {
    try {
      const res = await axios.post(
        `/api/chat/send/${recieverId}`,
        { textMessage },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        dispatch(setMessages([...messages, res.data.newMessage]));
        setTextMessage("");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  useEffect(() => {
    return () => {
      dispatch(setSelectedUser(null));
    };
  }, []);
  return (
    <div className="flex ml-[16%] h-screen">
      <section className="w-full md:w-1/4 my-8">
        <h1 className="font-bold mb-4 px-3 text-xl">{user?.username}</h1>
        <hr className="mb-4 border-gray-300" />
        <div className="overflow-y-auto h-[80vh]">
          {suggestedUsers.map((suggestedUser) => {
            const isOnline = user
              ? onlineUsers.includes(suggestedUser?._id)
              : false;
            return (
              <div
                key={suggestedUser._id}
                onClick={() => dispatch(setSelectedUser(suggestedUser))}
                className="flex gap-3 items-center p-3 hover:bg-gray-50 cursor-pointer"
              >
                <Avatar className="w-14 h-14">
                  <AvatarImage src={suggestedUser?.avatar} />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <span className="font-medium ">
                    {suggestedUser?.username}
                  </span>
                  <span
                    className={`text-xs font-bold ${
                      isOnline ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {isOnline ? "online" : "offline"}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </section>
      {selectedUser ? (
        <section className="flex-1 border-l border-l-gray-300 flex flex-col h-full">
          <div className="flex gap-3 items-center px-3 py-2 border-b border-gray-300 sticky top-0 bg-white z-10">
            <Avatar>
              <AvatarImage src={selectedUser?.avatar} alt="profile" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className="flex flex-col ">
              <span>{selectedUser?.username}</span>
            </div>
          </div>
          <div className="flex flex-col flex-1">
            <Messages selectedUser={selectedUser} />
            <div className="flex items-center p-4 border-t border-t-gray-300">
              <input
                value={textMessage}
                onChange={(e) => setTextMessage(e.target.value)}
                type="text"
                className="flex-1 mr-2 focus-visible:ring-transparent"
                placeholder="Messages..."
              />
              <Button onClick={() => sendMessageHandler(selectedUser?._id)}>
                Send
              </Button>
            </div>
          </div>
        </section>
      ) : (
        <div className="flex flex-col items-center justify-center mx-auto">
          <MessageCircleCode className="w-32 h-32 my-4 " />
          <h1 className="font-medium text-xl">Your Messages</h1>
          <span>Send a message to start a chat.</span>
        </div>
      )}
    </div>
  );
}

export default ChatPage;
