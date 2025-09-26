"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { useDispatch } from "react-redux";
import { setAuthUser } from "@/redux/slices/authSlice";
export default function LoginPage() {
  const router = useRouter();
  const [user, setUser] = React.useState({
    email: "",
    password: "",
  });
  const [buttonDisabled, setButtonDisabled] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const dispatch = useDispatch();
  const onLogin = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/login", user);
      console.log("Login success", response.data);
      dispatch(setAuthUser(response.data.user));
      router.push("/home");
      toast(response.data.message);
    } catch (error) {
      console.log("Login failed", error.message);
      toast(error.message);
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
      <div className="flex items-center w-screen h-screen justify-center">
        <span className="shadow-lg flex flex-col gap-5 p-8">
          <div className="my-4">
            <h1 className="text-center font-bold text-2xl">LOGIN</h1>
            <p className="text-sm text-center">
              {loading ? "Processing" : "Login to continue"}
            </p>
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
              className=" outline focus-visible:outline-black my-2"
              type="password"
              id="password"
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              // placeholder="password"
            />
          </div>

          <Button onClick={onLogin} disabled={buttonDisabled ? true : false}>
            Login
          </Button>
          <Link href="/signup" className="text-gray-800">
            Don&apos;t have an account? Signup
          </Link>
        </span>
      </div>
    </>
  );
}
