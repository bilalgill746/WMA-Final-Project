"use client";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setAuthUser } from "@/redux/slices/authSlice";
import axios from "axios";

const useAuthCheck = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axios.post("/api/users/me", {}, { withCredentials: true });
        if (res.data.data) {
          dispatch(setAuthUser(res.data.data));  // Set the actual user from server
        } else {
          dispatch(setAuthUser(null));  // Clear if no valid user
        }
      } catch (error) {
        dispatch(setAuthUser(null));  // Clear on error (e.g., invalid/expired token)
      }
    };

    checkAuth();
  }, [dispatch]);
};

export default useAuthCheck;
