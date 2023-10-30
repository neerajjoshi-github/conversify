import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { useDispatch, useSelector } from "react-redux";
import {
  toggleIsAddMemberModalOpen,
  toggleIsChangeGroupNameModalOpen,
  toggleIsRemoveMemberModalOpen,
  toggleIsUpdateGroupMenuOpen,
} from "@/lib/reduxStore/slices/dialogSlice";
import { RootState } from "@/lib/reduxStore/store";

const UpdateGroupMenu = () => {
  const dispatch = useDispatch();
  const { isUpdateGroupMenuOpen } = useSelector(
    (state: RootState) => state.dialog
  );

  return (
    <DropdownMenu
      open={isUpdateGroupMenuOpen}
      onOpenChange={() => dispatch(toggleIsUpdateGroupMenuOpen())}
    >
      <DropdownMenuTrigger className="fixed top-16 right-[100px]"></DropdownMenuTrigger>
      <DropdownMenuContent className="min-w-max">
        <DropdownMenuLabel>Update Group</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => {
            dispatch(toggleIsUpdateGroupMenuOpen());
            dispatch(toggleIsAddMemberModalOpen());
          }}
        >
          Add new member
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => {
            dispatch(toggleIsUpdateGroupMenuOpen());
            dispatch(toggleIsRemoveMemberModalOpen());
          }}
        >
          Remove a member
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => {
            dispatch(toggleIsUpdateGroupMenuOpen());
            dispatch(toggleIsChangeGroupNameModalOpen());
          }}
        >
          Change name
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UpdateGroupMenu;
