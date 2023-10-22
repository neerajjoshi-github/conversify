import { accessChat } from "@/lib/api-helpers/chats";
import { UserFromDB } from "@/lib/api-helpers/user";
import {
  addNewUserChat,
  setCurrentChat,
} from "@/lib/reduxStore/slices/chatsSlice";
import { RootState } from "@/lib/reduxStore/store";
import Image from "next/image";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

type UserCardProps = {
  user: UserFromDB;
  setSearchFocusedFalse: () => void;
};

const UserCard: React.FC<UserCardProps> = ({ user, setSearchFocusedFalse }) => {
  const dispatch = useDispatch();
  const { userChats } = useSelector((state: RootState) => state.chats);

  const accessChatHandler = async () => {
    const response = await accessChat(user._id);
    if (response.success) {
      dispatch(setCurrentChat(response.data));
      const isAlreadyAChat = !!userChats?.find(
        (chat) => chat._id === response.data._id
      );
      if (!isAlreadyAChat) {
        dispatch(addNewUserChat(response.data));
      }
      setSearchFocusedFalse();
    }
  };
  return (
    <div
      onClick={accessChatHandler}
      className="w-full px-4 py-2 flex items-center cursor-pointer hover:bg-foreground/10 transition duration-300 border-b border-border"
    >
      <div className="flex gap-2 w-full">
        <div className="relative w-14 h-14 rounded-full overflow-hidden bg-purple-400">
          <Image src={user.imageURL} fill alt="Profile" objectFit="cover" />
        </div>
        <div className="flex-1 flex flex-col justify-center">
          <span className="text-foreground font-semibold">{user.username}</span>
          <p className="text-xs truncate text-zinc-500">{user.email}</p>
        </div>
        <div className="flex items-end">
          <span className="text-zinc-500 text-xs">10:00pm</span>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
