"use client";

import { useEffect, useState, useRef } from "react";
import { socket } from "@/socket";
import { useDispatch, useSelector } from "react-redux";
// import { setSocket } from "@/redux/slices/socketSlice";
import { setOnlineUsers } from "@/redux/slices/chatSlice";
export default function Socket() {
  const [isConnected, setIsConnected] = useState(false);
  const [transport, setTransport] = useState("N/A");
  const { user } = useSelector((makeStore) => makeStore.auth);
  const dispatch = useDispatch();
  const registeredUserId = useRef(null);
  useEffect(() => {
    if (socket.connected) {
      onConnect();
    }

    function onConnect() {
      setIsConnected(true);
      setTransport(socket.io.engine.transport.name);

      socket.io.engine.on("upgrade", (transport) => {
        setTransport(transport.name);
      });
      if (user) {
        socket.emit("newUser", user.username);
      }
    }

    function onDisconnect() {
      setIsConnected(false);
      setTransport("N/A");
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("getOnlineUsers", (onlineUsers) => {
      dispatch(setOnlineUsers(onlineUsers));
    });

    // socket.on("notification", (notification) => {
    //   dispatch(setLikeNotification(notification));
    // });

    if (user && user._id !== registeredUserId.current) {
      if (registeredUserId.current) {
        socket.emit("unregisterUser", registeredUserId.current);
      }
      socket.emit("registerUser", user._id);
      registeredUserId.current = user._id;
    } else if (!user && registeredUserId.current) {
      socket.emit("unregisterUser", registeredUserId.current);
      registeredUserId.current = null;
    }

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      // dispatch(setSocket(false));
    };
  }, [user, dispatch]);

  return (
    <></>
    // <div>
    //   <p>Status: {isConnected ? "connected" : "disconnected"}</p>
    //   <p>Transport: {transport}</p>
    // </div>
  );
}
