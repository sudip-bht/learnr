import React from "react";
import Login from "./components/sign-in";

const LoginPage = () => {
  return (
    <div className="flex flex-col space-y-5 items-center min-h-screen py-32">
      <h1 className="text-3xl font-semibold text-blue-600">Login to Learnr</h1>
      <Login />
    </div>
  );
};

export default LoginPage;
