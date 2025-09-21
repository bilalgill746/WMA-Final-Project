"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
export default function SignupPage() {
  const router = useRouter();
  const [user, setUser] = React.useState({
    username: "",
    email: "",
    password: "",
  });
  const [buttonDisabled, setButtonDisabled] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const onSignup = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/signup", user);
      console.log("Signup success", response.data);
      const { hashedToken } = response.data;
      router.push('/login');
    } catch (error) {
      console.log("signup failed", error.message);

      // toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    const isValid =
      user.email.length > 0 &&
      user.password.length > 0 &&
      user.username.length > 0 &&
      user.email.endsWith("@gmail.com");

    if (isValid) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);
  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <h1>{loading ? "Processing" : "Signup"}</h1>
        <hr />
        <label htmlFor="username">Username</label>
        <input
          className="border border-gray-300 p-2 rounded"
          type="text"
          id="username"
          value={user.username}
          onChange={(e) => setUser({ ...user, username: e.target.value })}
          placeholder="username"
        />

        <label htmlFor="email">Email</label>
        <input
          className="border border-gray-300 p-2 rounded"
          type="email"
          id="email"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          placeholder="email"
        />

        <label htmlFor="password">Password</label>
        <input
          className="border border-gray-300 p-2 m-2 rounded"
          type="password"
          id="password"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          placeholder="password"
        />
        <button
          className={`bg-blue-500 text-white p-2 rounded 
          `}
          onClick={onSignup}
        >
          {buttonDisabled ? "No Signup" : "Signup"}
        </button>
        <Link href="/login" className="text-blue-500">
          Already have an account? Login
        </Link>
      </div>
    </>
  );
}
