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
  return otherMember?.username || "";
}
export function getSingleChatImage(
  members: UserFromDB[],
  currentUserId: string
) {
  const otherMember = members.find((member) => member._id !== currentUserId);
  return otherMember?.imageURL || "";
}
