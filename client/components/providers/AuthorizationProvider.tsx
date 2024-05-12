"use client";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setUser } from "@/lib/reduxStore/slices/userSlice";
import { useEffect } from "react";

const AuthorizationProvider = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    let user: any = null;
    if (typeof window !== "undefined") {
      user = JSON.parse(localStorage.getItem("userInfo") as string) || null;
    }
    if (!user) {
      router.replace("/login");
    } else {
      dispatch(setUser(user));
    }
  }, []);

  return <>{children}</>;
};

export default AuthorizationProvider;
