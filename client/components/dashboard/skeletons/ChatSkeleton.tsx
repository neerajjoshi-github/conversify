import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const ChatSkeleton = () => {
  return (
    <div className="flex items-center gap-2 px-4 h-16 py-2 border-b border-border">
      <Skeleton className="w-12 h-12 rounded-full" />
      <div className="flex flex-col gap-1 flex-1 h-full">
        <Skeleton className="w-full h-4 " />
        <Skeleton className="w-full flex-1" />
      </div>
    </div>
  );
};

export default ChatSkeleton;
