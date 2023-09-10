"use client";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
import { UserFromDB, search } from "@/lib/api-helpers/user";
import { addNewUserChat } from "@/lib/reduxStore/slices/chatsSlice";

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
  const dispatch = useDispatch();
  const { isCreateGroupModalOpen } = useSelector(
    (state: RootState) => state.dialog
  );

  const form = useForm<z.infer<typeof groupSchema>>({
    resolver: zodResolver(groupSchema),
    defaultValues: {
      chatName: "",
      members: [],
    },
  });

  const onSubmit = async (values: z.infer<typeof groupSchema>) => {
    console.log("Create group form values :", values);
    const response = await createGroupChat(values);
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

export default CreateNewGroupDialog;
