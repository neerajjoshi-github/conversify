import React from "react";
import {
  DialogFooter,
  DialogHeader,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "../ui/dialog";
import ProfileImage from "../dashboard/ProfileImage";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/lib/reduxStore/store";
import { toggleIsRemoveMemberModalOpen } from "@/lib/reduxStore/slices/dialogSlice";
import { removeFromGroup } from "@/lib/api-helpers/chats";
import { toast } from "../ui/use-toast";

const RemoveMemberDialog = () => {
  const dispatch = useDispatch();
  const { isRemoveMemberModalOpen } = useSelector(
    (state: RootState) => state.dialog
  );
  const { currentChat } = useSelector((state: RootState) => state.chats);

  const onMemberRemove = async (memberId: string, username: string) => {
    const response = await removeFromGroup({
      chatId: currentChat?._id!,
      memberId,
    });
    if (response.success) {
      toast({ description: `${username} has been removed successfully!!!!` });
      dispatch(toggleIsRemoveMemberModalOpen());
    } else {
      toast({ description: response.message });
    }
  };

  return (
    <Dialog
      open={isRemoveMemberModalOpen}
      onOpenChange={() => dispatch(toggleIsRemoveMemberModalOpen())}
    >
      <DialogContent className="sm:max-w-[525px] bg-secondary">
        <DialogHeader className="flex flex-col items-center">
          <DialogTitle className="text-3xl font-semibold">
            Remove Members!!
          </DialogTitle>
          <DialogDescription>Remove members from the group.</DialogDescription>
        </DialogHeader>
        <div className="w-full h-auto flex flex-col items-center justify-center gap-4">
          <ProfileImage imageURL={currentChat?.imageURL || ""} size="xl" />
          <h3 className="text-xl font-semibold min-h-[28px]">
            {currentChat?.chatName}
          </h3>
          <div className="flex gap-4 items-center justify-center flex-wrap">
            {currentChat?.members.map((member) => {
              return (
                <div
                  key={member._id}
                  className="flex flex-col items-center p-2 border border-gray-600 rounded-md"
                >
                  <ProfileImage imageURL={member.imageURL} />
                  <span className="text-xs mt-1 font-semibold">
                    {member.username}
                  </span>
                  <span className="text-xxs">{member.email}</span>
                  <Button
                    onClick={() => onMemberRemove(member._id, member.username)}
                    size="sm"
                    className="mt-2"
                  >
                    Remove
                  </Button>
                </div>
              );
            })}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RemoveMemberDialog;
