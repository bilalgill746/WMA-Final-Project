"use client";
import axios from "axios";
import { useEffect } from "react";
import { setPosts } from "@/redux/slices/postSlice";
import { useDispatch } from "react-redux";
const useGetAllPost = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchAllPost = async () => {
      try {
        const res = await axios.get("/api/posts/all", {
          withCredentials: true,
        });
        if (res.data.success) {
          dispatch(setPosts(res.data.posts));
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchAllPost();
  }, []);
};

export default useGetAllPost;
