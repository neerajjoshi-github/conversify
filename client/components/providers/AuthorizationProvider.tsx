"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setUser } from "@/lib/reduxStore/slices/userSlice";

const AuthorizationProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<any | null>(null);
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userInfo") as string) || null;
    setCurrentUser(user);
  }, []);

  dispatch(setUser(currentUser));

  if (currentUser) {
    return children;
  } else {
    useEffect(() => {
      router.replace("/login");
    }, []);
    return null;
  }
};

export default AuthorizationProvider;
