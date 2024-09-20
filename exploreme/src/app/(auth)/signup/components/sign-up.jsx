"use client"
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const SignUp = () => {
    const [fullname, setFullname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setconfirmPassword] = useState("");
    const router = useRouter();

    const onSubmitHandler = async (e) => {
        e.preventDefault();
      };

  return (
    <div>
<form className="flex justify-center min-h-full flex-col space-y-6 bg-slate-50 p-14 rounded-xl w-[600px]">
      <div className="space-y-4">
      <div className="flex flex-col space-y-2">
            <Label>Fullname</Label>
              <Input
                type="text"
                onChange={(e) => setFullname(e.target.fullname)}
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
                onChange={(e) => setEmail(e.target.email)}
                value={email}
                placeholder="Enter your email"
                required
                className="rounded-xl h-12"
              />
            </div>
            <div className="flex flex-col space-y-2">
              <Label>Password</Label>
              <Input
                type="password"
                onChange={(e) => setPassword(e.target.password)}
                value={password}
                placeholder="Enter your password"
                required
                className="rounded-xl h-12"
              />
            </div>
            <div className="flex flex-col space-y-2">
              <Label>Confirm Password</Label>
              <Input
                type="password"
                onChange={(e) => setconfirmPassword(e.target.confirmPassword)}
                value={confirmPassword}
                placeholder="confirm your password"
                required
                className="rounded-xl h-12"
              />
            </div>
        </div>
        <div className="flex items-center justify-center gap-2">
          <p className="text-black text-sm">
            Already have an account?
          </p>
          <p
              onClick={() => router.push("/login")}
              className="text-blue-800 hover:text-black underline cursor-pointer"
            >
              login
            </p>
        </div>
        <div>
          <Button 
            className="bg-blue-500 p-5 text-base rounded-xl w-full hover:scale-x-105 hover:text-gray-200 hover:bg-blue-700 transition-all duration-500"
            type="submit"
          >
            Signup
          </Button>
        </div>
      </form>
    </div>
  )
}

export default SignUp
