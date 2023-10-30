import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toggleIsChangeGroupNameModalOpen } from "@/lib/reduxStore/slices/dialogSlice";
import { RootState } from "@/lib/reduxStore/store";
import { useSelector, useDispatch } from "react-redux";
import ProfileImage from "../dashboard/ProfileImage";
import { useEffect, useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  setCurrentChat,
  setUserChats,
} from "@/lib/reduxStore/slices/chatsSlice";
import { updateGroupName } from "@/lib/api-helpers/chats";

const ChangeGroupNameDialog = () => {
  const dispatch = useDispatch();
  const { isChangeGroupNameModalOpen } = useSelector(
    (state: RootState) => state.dialog
  );
  const { currentChat, userChats } = useSelector(
    (state: RootState) => state.chats
  );

  const updateGroupNameSchema = z.object({
    chatName: z.string().min(1, { message: "Group name is required!!" }),
  });
  const form = useForm<z.infer<typeof updateGroupNameSchema>>({
    resolver: zodResolver(updateGroupNameSchema),
    defaultValues: {
      chatName: "",
    },
  });

  useEffect(() => {
    form.setValue("chatName", currentChat?.chatName || "");
  }, [currentChat]);

  if (!currentChat) return;

  const onSubmit = async (values: z.infer<typeof updateGroupNameSchema>) => {
    console.log("On change groaup submit value : ", values);
    if (values.chatName === currentChat.chatName) {
      return form.setError("chatName", {
        message: "Set a new name to update!!",
      });
    }
    const response = await updateGroupName({
      chatId: currentChat._id,
      newChatName: values.chatName,
    });
    if (response.success) {
      dispatch(setCurrentChat(response.data));
      const chats = userChats?.map((chat) =>
        chat._id === currentChat._id
          ? { ...chat, chatName: response.data.chatName }
          : chat
      );
      dispatch(setUserChats(chats || []));
      dispatch(toggleIsChangeGroupNameModalOpen());
    }
  };

  return (
    <Dialog
      open={isChangeGroupNameModalOpen}
      onOpenChange={() => dispatch(toggleIsChangeGroupNameModalOpen())}
    >
      <DialogContent className="sm:max-w-[525px] bg-secondary">
        <DialogHeader className="flex flex-col items-center">
          <DialogTitle className="text-3xl font-semibold">
            Edit Group Name
          </DialogTitle>
          <DialogDescription>
            Make changes to the group name here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="w-full h-auto flex flex-col items-center justify-center gap-4">
          <ProfileImage imageURL={currentChat.imageURL!} size="xl" />
          <h3 className="text-xl font-semibold min-h-[28px]">
            {form.watch("chatName")}
          </h3>
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-4 w-full"
          >
            <FormField
              control={form.control}
              name="chatName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New group name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter className="w-full">
              <Button
                type="submit"
                isLoading={form.formState.isSubmitting}
                className="ml-auto min-w-[120px]"
              >
                Save changes
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default ChangeGroupNameDialog;
