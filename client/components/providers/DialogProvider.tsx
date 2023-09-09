"use client";
import React from "react";
import CreateNewGroupDialog from "../Dialogs/CreateNewGroupDialog";

const DialogProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <CreateNewGroupDialog />
      {children}
    </>
  );
};

export default DialogProvider;
