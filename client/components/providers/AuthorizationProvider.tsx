"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { RootState } from "@/lib/reduxStore/store";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "@/lib/reduxStore/slices/userSlice";

const AuthorizationProvider = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const user = JSON.parse(localStorage.getItem("userInfo") as string) || null;
  dispatch(setUser(user));

  if (user) {
    return children;
  } else {
    router.replace("/login");
    return null;
  }
};

export default AuthorizationProvider;
