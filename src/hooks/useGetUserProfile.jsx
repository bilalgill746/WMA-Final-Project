"use client";
import axios from "axios";
import { useEffect } from "react";
import { setUserProfile } from "@/redux/slices/authSlice";
import { useDispatch } from "react-redux";
const useGetUserProfile = (userId) => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const res = await axios.get(`/api/users/${userId}/getProfile`, {
          withCredentials: true,
        });
        if (res.data.success) {
          dispatch(setUserProfile(res.data.user));
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchUserProfile();
  }, [userId]);
};

export default useGetUserProfile;
