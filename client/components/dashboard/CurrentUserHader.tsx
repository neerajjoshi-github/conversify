"use client";
import React from "react";
import { RootState } from "@/lib/reduxStore/store";
import { useSelector } from "react-redux";
import ProfileImage from "./ProfileImage";

const CurrentUserHader = () => {
  const user = useSelector((state: RootState) => state.user.data);
  if (!user) return null;
  return (
    <div className="h-16 w-full border-b border-border flex items-center justify-between px-4">
      <ProfileImage imageURL={user.imageURL} />
      <div className="flex flex-col gap-1">
        <span className="font-semibold">{user.username}</span>
        <span className="text-xs text-zinc-400">{user.email}</span>
      </div>
    </div>
  );
};

export default CurrentUserHader;
