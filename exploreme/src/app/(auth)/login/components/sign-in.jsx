"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { loginUser } from "../../../services/api_services.js";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "js-cookie"; // Import js-cookie

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      const response = await loginUser(email, password); // Call the API
      const { token } = response.data;

      Cookies.set("token", token, { expires: 1 });
      router.push("/dashboard");
    } catch (error) {
      toast.error(error.message, {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  return (
    <div>
      <form
        className="flex justify-center min-h-full flex-col space-y-4 bg-purple-300 p-10 rounded-xl w-[500px]"
        onSubmit={onSubmitHandler}
      >
        <div className="space-y-4">
          <div className="flex flex-col space-y-2">
            <Label>Email</Label>
            <Input
              type="text"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              placeholder="Enter your email"
              required
              className="rounded-xl h-12"
            />
          </div>
          <div className="flex flex-col space-y-1">
            <Label>Password</Label>
            <Input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              placeholder="Enter your password"
              required
              className="rounded-xl h-12"
            />
          </div>
        </div>
        <div className="flex items-center justify-center gap-2">
          <p className="text-black text-sm">Don't have an account?</p>
          <p
            onClick={() => router.push("/signup")}
            className="text-purple-800 hover:text-black underline cursor-pointer"
          >
            Signup
          </p>
        </div>
        <div>
          <Button
            className="bg-purple-800 p-5 rounded-xl w-full hover:scale-x-105 hover:text-gray-200 hover:bg-purple-900 transition-all duration-500"
            type="submit"
          >
            Login
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Login;
