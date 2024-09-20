"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signUpUser } from "../../../services/api_services"; // Import the signup service
import { toast } from "react-toastify"; // Import Toastify
import "react-toastify/dist/ReactToastify.css";

const SignUp = () => {
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const router = useRouter();

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    // Check if passwords match
    if (password !== confirmPassword) {
      toast.error("Passwords do not match", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }

    try {
      const response = await signUpUser(
        fullname,
        email,
        password,
        confirmPassword
      );
      // Handle successful signup
      toast.success("Signup successful!", {
        position: "top-right",
        autoClose: 3000,
      });
      router.push("/login");
    } catch (error) {
      console.log(error);
      const errorMessage = error.response?.message || "Signup failed";
      console.log(errorMessage);
      toast.error(errorMessage, {
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
            <Label>Fullname</Label>
            <Input
              type="text"
              onChange={(e) => setFullname(e.target.value)}
              value={fullname}
              placeholder="Enter your fullname"
              required
              className="rounded-xl h-12"
            />
          </div>
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
          <div className="flex flex-col space-y-1">
            <Label>Confirm Password</Label>
            <Input
              type="password"
              onChange={(e) => setConfirmPassword(e.target.value)}
              value={confirmPassword}
              placeholder="Confirm your password"
              required
              className="rounded-xl h-12"
            />
          </div>
        </div>
        <div className="flex items-center justify-center gap-2">
          <p className="text-black text-sm">Already have an account?</p>
          <p
            onClick={() => router.push("/login")}
            className="text-purple-800 hover:text-black underline cursor-pointer"
          >
            Login
          </p>
        </div>
        <div>
          <Button
            className="bg-purple-800 p-5 rounded-xl w-full hover:scale-x-105 hover:text-gray-200 hover:bg-purple-900 transition-all duration-500"
            type="submit"
          >
            Signup
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
