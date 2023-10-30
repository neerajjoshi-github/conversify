import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const SingleMessageBubbleSkeleton = ({ side }: { side: "left" | "right" }) => {
  const randomWidth = Math.floor(Math.random() * (150 - 96 + 1)) + 96;
  const randomHeight = Math.floor(Math.random() * (60 - 36 + 1)) + 36;
  return (
    <div className="relative mx-6">
      <div
        className={`${
          side === "right" ? "-right-[20px] flip" : " -left-[20px]"
        } absolute top-0 z-[1]`}
      >
        <svg
          viewBox="0 0 8 13"
          height="32.5"
          width="20"
          version="1.1"
          x="0px"
          y="0px"
          className="animate-pulse"
        >
          <path
            opacity="0.13"
            fill="#0000000"
            d="M1.533,3.568L8,12.193V1H2.812 C1.042,1,0.474,2.156,1.533,3.568z"
          ></path>
          <path
            className={`${
              side === "right" ? "fill-primary" : "fill-secondary"
            }`}
            d="M1.533,2.568L8,11.193V0L2.812,0C1.042,0,0.474,1.156,1.533,2.568z"
          ></path>
        </svg>
      </div>
      <Skeleton
        style={{
          width: randomWidth,
          height: randomHeight,
        }}
        className={`${
          side === "right"
            ? "bg-primary shadow-primary-message ml-auto rounded-tl-lg rounded-tr-none"
            : "bg-secondary shadow-message rounded-tr-lg rounded-tl-none"
        } relative z-[10]  rounded-b-lg`}
      />
    </div>
  );
};

const MessageBubbleSkeleton = () => {
  const arr = [0, 1, 2, 3, 4, 5, 6];
  return (
    <div className="w-full flex flex-col gap-2">
      {arr.map((index) => {
        const rand = Math.round(Math.random());
        return (
          <SingleMessageBubbleSkeleton
            key={index}
            side={rand === 0 ? "left" : "right"}
          />
        );
      })}
    </div>
  );
};

export default MessageBubbleSkeleton;
