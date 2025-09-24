"use client";
import React, { useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Link from "next/link";
export default function VerifyEmailPage() {
  // const router = useRouter();

  const [token, setToken] = React.useState("");
  const [verified, setVerified] = React.useState(false);
  const [error, setError] = React.useState(false);

  const verifyUserEmail = async () => {
    try {
      await axios.post("/api/users/verifyemail", { token });
      console.log("Email verified successfully", token);
      
      setVerified(true);
      setError(false);
    } catch (error) {
      setError(true);
      console.log(error.response.data);
    }
  };

  useEffect(() => {
    setError(false);
    const urlParams = new URLSearchParams(window.location.search);
    const urlToken = urlParams.get('token');
    setToken(urlToken || "");

    // const {query} = router;
    // const urlTokenTwo = query.token;
  }, []);

  useEffect(() => {
    setError(false);
    if (token.length > 0) {
      verifyUserEmail();
    }
  }, [token]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen  py-2">
     <h1 className="text-4xl ">Verify Email</h1>
     <h2 className="p-2 bg-amber-400 text-black">
      {token ? `${token}` : "No token found"}
     </h2>
     {verified && (
      <div>
        <h2>Verified</h2>
        <Link href="/login" className="text-blue-500 underline">
          Login
        </Link>
      </div>
     )}
      {error && (
      <div>
        <h2>Error</h2>
      </div>
     )}
    </div>
  );
}
