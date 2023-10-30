"use client";
import React, { useEffect, useMemo, useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useDispatch, useSelector } from "react-redux";
import { toggleIsCreateGroupModalOpen } from "@/lib/reduxStore/slices/dialogSlice";
import { RootState } from "@/lib/reduxStore/store";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { groupSchema } from "@/lib/zodSchemas/groupSchema";
import * as z from "zod";
import { createGroupChat } from "@/lib/api-helpers/chats";
import { toast } from "../ui/use-toast";
import AsyncSelect from "react-select/async";
import { MultiValue, PropsValue } from "react-select";
import { UserFromDB, search } from "@/lib/api-helpers/user";
import { addNewUserChat } from "@/lib/reduxStore/slices/chatsSlice";
import { Result, createAvatar } from "@dicebear/core";
import Image from "next/image";
import { thumbs } from "@dicebear/collection";
import { uploadAvatar } from "@/lib/api-helpers/cloudinary";
import ProfileImage from "../dashboard/ProfileImage";

const searchUsers = async (inputValue: string) => {
  const response = await search(inputValue);
  if (response.success) {
    return response.data;
  } else {
    return [];
  }
};

const options = (inputValue: string) =>
  new Promise<UserFromDB[]>((resolve) => {
    resolve(searchUsers(inputValue));
  });

const CreateNewGroupDialog = () => {
  const [groupAvatar, setGroupAvatar] = useState<Result | null>(null);
  const dispatch = useDispatch();
  const { isCreateGroupModalOpen } = useSelector(
    (state: RootState) => state.dialog
  );

  useEffect(() => {
    if (!isCreateGroupModalOpen) return;
    const avatar = createAvatar(thumbs, {
      seed: crypto.randomUUID(),
      backgroundColor: [
        "b6e3f4",
        "c0aede",
        "d1d4f9",
        "F875AA",
        "FFDFDF",
        "98E4FF",
        "176B87",
      ],
      backgroundType: ["gradientLinear", "solid"],
      shapeColor: ["4D4C7D", "005B41", "713ABE", "FF6969", "79155B", "001C30"],
    });
    setGroupAvatar(avatar);
  }, [isCreateGroupModalOpen]);

  const form = useForm<z.infer<typeof groupSchema>>({
    resolver: zodResolver(groupSchema),
    defaultValues: {
      chatName: "",
      members: [],
    },
  });

  const onSubmit = async (values: z.infer<typeof groupSchema>) => {
    const imageURL = await uploadAvatar(groupAvatar?.toString()!);
    console.log("Create group form values :", { ...values, imageURL });
    const response = await createGroupChat({ ...values, imageURL });
    if (response.success) {
      toast({
        description: response.message,
      });
      dispatch(addNewUserChat(response.data));
      form.reset();
      return dispatch(toggleIsCreateGroupModalOpen());
    } else {
      form.setError("chatName", { message: response.message });
    }
  };
  return (
    <Dialog
      open={isCreateGroupModalOpen}
      onOpenChange={() => dispatch(toggleIsCreateGroupModalOpen())}
    >
      <DialogContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6 max-w-[500px] w-full bg-secondary rounded-md p-4 border-2 border-border mt-2"
          >
            <h1 className="text-4xl font-semibold font-dancing-script underline underline-offset-2">
              Create a new group
            </h1>
            <div className="flex justify-center">
              <div className="w-24 h-24 rounded-full flex items-center justify-center border border-gray-400 overflow-hidden">
                {groupAvatar && (
                  <Image
                    src={groupAvatar.toDataUriSync()}
                    alt=""
                    width={96}
                    height={96}
                    className="object-contain"
                  />
                )}
              </div>
            </div>
            <FormField
              control={form.control}
              name="chatName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Group Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="members"
              render={({ field: { onChange, onBlur, value, ref } }) => (
                <FormItem>
                  <FormLabel>Members</FormLabel>
                  <FormControl>
                    <AsyncSelect
                      components={{
                        Option: CustomOption,
                      }}
                      placeholder="Select members...."
                      ref={ref}
                      onChange={(e) => {
                        const members = e.map((user) => user._id);
                        onChange(members);
                      }}
                      onBlur={onBlur}
                      isMulti
                      cacheOptions
                      loadOptions={options}
                      defaultOptions
                      getOptionLabel={(option) => option.username}
                      getOptionValue={(option) => option._id}
                      theme={(theme) => ({
                        ...theme,
                        borderRadius: 4,
                        colors: {
                          ...theme.colors,
                          primary: "hsl(var(--primary))",
                          primary25: "hsl(var(--card))",
                          primary50: "hsl(var(--card))",
                          primary75: "hsl(var(--card))",
                          neutral0: "hsl(var(--secondary))",
                          neutral10: "hsl(var(--card))",
                        },
                      })}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              isLoading={form.formState.isSubmitting}
              className="w-full"
              type="submit"
            >
              Create
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export const CustomOption = ({ data, innerProps, innerRef }: any) => {
  return (
    <div
      {...innerProps}
      ref={innerRef}
      className="flex items-center gap-6 p-2 cursor-pointer hover:bg-background/80"
    >
      <ProfileImage imageURL={data.imageURL} size="sm" />
      <div className="font-semibold flex flex-col">
        <span className="text-sm">{data.username}</span>
        <span className="text-xs">{data.email}</span>
      </div>
    </div>
  );
};

export default CreateNewGroupDialog;
