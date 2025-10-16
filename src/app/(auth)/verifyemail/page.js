"use client";
import { Button } from "@/components/ui/button";
import React, { useEffect } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import axios from "axios";
function Page() {
  const router = useRouter();
  const [user, setUser] = React.useState({
    email: "",
    code: "",
  });
  const [buttonDisabled, setButtonDisabled] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [message, setMessage] = React.useState("");
  const [isExpired, setIsExpired] = React.useState(false);
  const onVerify = async () => {
    try {
      const response = await axios.post("/api/users/verifyemail", user);
      setMessage(response.data.message);
      setOpen(response.data.message === "Verification code expired");
      toast.success(response.data.message);
      router.push("/login");
    } catch (error) {
      setMessage(error.response.data.message);
      toast.error(error.response.data.message);
    }
  };
  const resendCode = async () => {
    try {
      const response = await axios.post(
        "/api/users/resendverificationcode",
        user
      );
      setMessage(response.data.message);
      toast.success(response.data.message);
    } catch (error) {
      setMessage(error.response.data.message);
      toast.error(error.response.data.message);
    }
  };
  useEffect(() => {
    const isValid =
      user.email.length > 0 &&
      user.code.length > 0 &&
      user.code.length < 7 &&
      user.email.endsWith("@gmail.com");

    if (isValid) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsExpired(true);
      setOpen(true);
      setMessage("Verification code expired");
      // Optionally disable verify button on expiration
      setButtonDisabled(true);
    }, 120000); // 2 minutes in milliseconds

    return () => clearTimeout(timer); // Cleanup on unmount
  }, []); // Empty dependency array: runs once on mount
  return (
    <div className="flex items-center w-screen h-screen justify-center">
      <span className="shadow-lg flex flex-col gap-5 p-8">
        <div className="my-4">
          <h1 className="text-center font-bold text-2xl">VERIFY EMAIL</h1>
          <p className="text-center">{message}</p>
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
          />
        </div>
        <div className="flex flex-col">
          <label className="font-medium">Verification Code</label>
          <input
            className=" outline focus-visible:outline-black my-2"
            type="text"
            id="code"
            value={user.code}
            onChange={(e) => setUser({ ...user, code: e.target.value })}
          />
          <p className="text-xs">Code will expire in 2 min.</p>
        </div>
        <Button onClick={onVerify} disabled={buttonDisabled ? true : false}>
          Verify
        </Button>
        {open && <Button onClick={resendCode}>Resend Code</Button>}
      </span>
    </div>
  );
}

export default Page;
