"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import  axios  from "axios";
export default function LoginPage() {
  const router = useRouter();
  const [user, setUser] = React.useState({
    email: "",
    password: "",
  });
  const [buttonDisabled, setButtonDisabled] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const onLogin = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/login", user);
      console.log("Login success", response.data);
      router.push("/");
    } catch (error) {
      console.log("Login failed", error.message);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    const isValid =
      user.email.length > 0 &&
      user.password.length > 0 &&
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
        <h1>{loading ? "Processing" : "Login"}</h1>
        <hr />
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
          className="bg-blue-500 text-white p-2 rounded"
          onClick={onLogin}
        >
          {buttonDisabled ? "No Login" : "Login"}
        </button>
        <Link href="/forgotpassword" className="text-blue-500">
          Forgot Password?
        </Link>
        <Link href="/signup" className="text-blue-500">
          Don&apos;t have an account? Signup
        </Link>
      </div>
    </>
  );
}
