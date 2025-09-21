"use client";
import React from "react";
import axios from "axios";
import Link from "next/link";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";


export default function HomePage() {
  const router = useRouter();
  const [data, setData] = React.useState("nothing");

  const getUserDetails = async () => {
    try {
      const res = await axios.post("/api/users/me");
      console.log(res.data.data._id);

      setData(res.data.data._id);
    } catch (error) {
      toast.error("Error fetching user details");
    }
  };

  const logoutHandler = async () => {
    try {
      await axios.get("/api/users/logout");
      toast.success("Logged out successfully");
      router.push("/login");
    } catch (error) {
      toast.error("Error logging out");
    }
  };

  return (
    <>
      
    </>
  );
}
