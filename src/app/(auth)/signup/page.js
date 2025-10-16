"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
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
      // console.log("Signup success", response.data);
      toast.success(response.data.message);
      router.push("/verifyemail");
    } catch (error) {
      // console.log("signup failed", error.message);
      toast.error(error.response.data.message);
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
      <div className="flex items-center w-screen h-screen justify-center">
        <span className="shadow-lg flex flex-col gap-5 p-8">
          <div className="my-4">
            <h1 className="text-center font-bold text-2xl">SIGN UP</h1>
            <p className="text-sm text-center">
              {loading ? "Processing" : "Signup to continue"}
            </p>
          </div>
          <div className="flex flex-col">
            <label htmlFor="username" className="font-medium">
              Username
            </label>
            <input
              className="outline focus-visible:outline-black my-2"
              type="text"
              id="username"
              value={user.username}
              onChange={(e) => setUser({ ...user, username: e.target.value })}
              // placeholder="username"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="email" className="font-medium">
              Email
            </label>
            <input
              className=" outline focus-visible:outline-black my-2"
              type="email"
              id="email"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              // placeholder="email"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="password" className="font-medium">
              Password
            </label>
            <input
              className="outline focus-visible:outline-black my-2"
              type="password"
              id="password"
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              // placeholder="password"
            />
          </div>
          <Button onClick={onSignup} disabled={buttonDisabled ? true : false}>
            Signup
          </Button>
          <Link href="/login" className="text-gray-800">
            Already have an account? Login
          </Link>
        </span>
      </div>
    </>
  );
}
