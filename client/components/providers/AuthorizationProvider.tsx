"use client";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setUser } from "@/lib/reduxStore/slices/userSlice";

const AuthorizationProvider = ({ children }: { children: React.ReactNode }) => {
  const user = JSON.parse(localStorage.getItem("userInfo") as string) || null;
  const dispatch = useDispatch();
  const router = useRouter();

  if (!user) {
    router.replace("/login");
  } else {
    dispatch(setUser(user));
  }

  return user ? <>{children}</> : null;
};

export default AuthorizationProvider;
