import LoginForm from "@/components/auth/LoginForm";
import React from "react";

const Login = () => {
  return (
    <div className="flex justify-center min-h-screen items-center p-4 bg-contain bg-center bg-[url('/images/patterns1.png')]">
      <LoginForm />
    </div>
  );
};

export default Login;
