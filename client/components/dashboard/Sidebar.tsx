"use client";
import CurrentUserHader from "@/components/dashboard/CurrentUserHader";
import { Input } from "@/components/ui/input";
import React, { useEffect, useState } from "react";
import { BiSearch } from "react-icons/bi";
import { ScrollArea } from "@/components/ui/scroll-area";
import ChatCard from "@/components/dashboard/ChatCard";
import { UserFromDB, search } from "@/lib/api-helpers/user";
import { ChatType, getUserChats } from "@/lib/api-helpers/chats";
import UserCard from "@/components/dashboard/UserCard";
import { Button } from "@/components/ui/button";
import { IoMdAdd } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { toggleIsCreateGroupModalOpen } from "@/lib/reduxStore/slices/dialogSlice";
import { RootState } from "@/lib/reduxStore/store";
import { setUserChats } from "@/lib/reduxStore/slices/chatsSlice";
import ChatSkeleton from "./skeletons/ChatSkeleton";

const Sidebar = () => {
  const dispatch = useDispatch();
  const [searchedInput, setsearchedInput] = useState("");
  const [searchedUsers, setSearchedUsers] = useState<UserFromDB[] | null>(null);
  const { userChats } = useSelector((state: RootState) => state.chats);

  const searchUsers = async () => {
    const response = await search(searchedInput);
    if (response.success) {
      setSearchedUsers(response.data);
    }
  };

  const getChats = async () => {
    const response = await getUserChats();
    if (response.success) {
      dispatch(setUserChats(response.data));
    }
  };

  useEffect(() => {
    searchUsers();
  }, [searchedInput]);

  useEffect(() => {
    getChats();
  }, []);
  return (
    <div className="min-w-[350px] max-w-[350px] flex flex-col bg-secondary h-full border-r border-border">
      <CurrentUserHader />
      <div className="p-4 flex items-center gap-1">
        <div className="px-2 flex-1 flex items-center gap-[2px] focus-within:border-foreground border border-foreground rounded-md bg-background">
          <BiSearch size={20} className="" />
          <Input
            className="flex-1 border-none placeholder:text-zinc-300 focus-visible:ring-0"
            placeholder="search..."
            value={searchedInput}
            onChange={(e) => setsearchedInput(e.target.value)}
          />
        </div>
        <Button
          onClick={() => dispatch(toggleIsCreateGroupModalOpen())}
          variant="secondary"
          size="icon"
          title="Create new group"
          className="bg-foreground text-background hover:bg-foreground/90 "
        >
          <IoMdAdd size={22} />
        </Button>
      </div>
      <div className="w-full flex-grow  overflow-hidden">
        <ScrollArea className="h-full w-full">
          {/* {searchedUsers &&
            searchedUsers.map((user) => {
              return <UserCard user={user} key={user._id} />;
            })} */}

          {userChats ? (
            userChats.map((chat) => {
              return <ChatCard chatData={chat} key={chat._id} />;
            })
          ) : (
            <>
              <ChatSkeleton />
              <ChatSkeleton />
              <ChatSkeleton />
              <ChatSkeleton />
              <ChatSkeleton />
              <ChatSkeleton />
              <ChatSkeleton />
              <ChatSkeleton />
            </>
          )}
        </ScrollArea>
      </div>
    </div>
  );
};

export default Sidebar;
