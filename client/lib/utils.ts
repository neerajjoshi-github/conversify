import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { UserFromDB } from "./api-helpers/user";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getSingleChatName(
  members: UserFromDB[],
  currentUserId: string
) {
  const otherMember = members.find((member) => member._id !== currentUserId);
  console.log("CURRENT USER ID : ", currentUserId, "MEMEBER : ", members);
  return otherMember?.username || "";
}
