"use client";
import React from "react";
import { RootState } from "@/lib/reduxStore/store";
import { useSelector } from "react-redux";
import Image from "next/image";

const CurrentUserHader = () => {
  const user = useSelector((state: RootState) => state.user.data);
  if (!user) return null;
  return (
    <div className="h-16 w-full border-b border-border flex items-center justify-between px-4">
      <div className="relative w-12 h-12 rounded-full overflow-hidden">
        <Image src={user.imageURL} fill alt="Profile" objectFit="cover" />
      </div>
      <div className="flex items-center gap-1">
        <Image src="/svgs/new-chat.svg" width={30} height={30} alt="New Chat" />
      </div>
    </div>
  );
};

export default CurrentUserHader;
