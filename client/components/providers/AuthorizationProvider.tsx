"use client";
import React from "react";
import { useRouter } from "next/navigation";

const AuthorizationProvider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const user = localStorage.getItem("userInfo");
  if (user) {
    return children;
  } else {
    router.replace("/login");
    return null;
  }
};

export default AuthorizationProvider;
