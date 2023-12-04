"use client";
import { useState } from "react";
import Login from "./login";
import Register from "./register";

const Auth: React.FC = () => {
  const [form, setForm] = useState<"Login" | "Register">("Register");

  const showLoginForm = () => {
    setForm("Login");
  };

  const showRegisterForm = () => {
    setForm("Register");
  };

  return (
    <div className="bg-slate-100 h-screen w-full flex items-center justify-center px-4 sm:px-8 md:px-16 lg:px-32 py-16 sm:py-20 md:py-24 lg:py-32">
      <div className="w-full h-full bg-white rounded shadow-md flex sm:flex-row">
        <div className="w-full md:w-1/2 flex items-center justify-center">
          {form === "Register" ? (
            <Register showLoginForm={showLoginForm} />
          ) : (
            <Login showRegisterForm={showRegisterForm} />
          )}
        </div>
        <div className="hidden md:inline md:w-1/2 bg-red-300"></div>
      </div>
    </div>
  );
};
export default Auth;
