"use client";
import axios from "axios";
import { useEffect } from "react";
import { setPosts } from "@/redux/slices/postSlice";
import { useDispatch, useSelector } from "react-redux";
import { setMessages } from "@/redux/slices/chatSlice";
const useGetAllMessage = () => {
  const dispatch = useDispatch();
  const { selectedUser } = useSelector((makeStore) => makeStore.auth);
  useEffect(() => {
    const fetchAllMessage = async () => {
      try {
        const res = await axios.get(`/api/chat/all/${selectedUser?._id}`, {
          withCredentials: true,
        });
        if (res.data.success) {
          dispatch(setMessages(res.data.messages)); 
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchAllMessage();
  }, []);
};

export default useGetAllMessage;
