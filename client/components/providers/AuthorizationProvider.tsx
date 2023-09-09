"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { RootState } from "@/lib/reduxStore/store";
import { useSelector } from "react-redux";

const AuthorizationProvider = ({ children }: { children: React.ReactNode }) => {
  const user = useSelector((state: RootState) => state.user.data);
  console.log("USER FROM STATE : ", user);
  const router = useRouter();
  if (user) {
    return children;
  } else {
    router.replace("/login");
    return null;
  }
};

export default AuthorizationProvider;
