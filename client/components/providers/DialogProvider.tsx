"use client";
import React from "react";
import CreateNewGroupDialog from "../Dialogs/CreateNewGroupDialog";
import ChangeGroupNameDialog from "../Dialogs/ChangeGroupNameDialog";
import UpdateGroupMenu from "../dashboard/UpdateGroupMenu";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/reduxStore/store";
import RemoveMemberDialog from "../Dialogs/RemoveMemberDialog";
import AddMemberDialog from "../Dialogs/AddMemberDialog";

const DialogProvider = ({ children }: { children: React.ReactNode }) => {
  const { currentChat } = useSelector((state: RootState) => state.chats);
  return (
    <>
      <CreateNewGroupDialog />
      {currentChat && (
        <>
          <ChangeGroupNameDialog />
          <UpdateGroupMenu />
          <AddMemberDialog />
          <RemoveMemberDialog />
        </>
      )}
      {children}
    </>
  );
};

export default DialogProvider;
