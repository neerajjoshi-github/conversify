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
import { toggleIsAddMemberModalOpen } from "@/lib/reduxStore/slices/dialogSlice";
import { UserFromDB, search } from "@/lib/api-helpers/user";
import AsyncSelect from "react-select/async";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { CustomOption } from "./CreateNewGroupDialog";
import { addToGroup } from "@/lib/api-helpers/chats";
import { toast } from "../ui/use-toast";
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

export const AddMemeberSchema = z.object({
  memberToAdd: z.object({
    _id: z.string().min(4, { message: "Invalid values!!!" }),
    username: z.string().min(1, { message: "Invalid values!!!" }),
  }),
});

const AddMemberDialog = () => {
  const dispatch = useDispatch();
  const { isAddMemberModalOpen } = useSelector(
    (state: RootState) => state.dialog
  );
  const { currentChat } = useSelector((state: RootState) => state.chats);

  const form = useForm<z.infer<typeof AddMemeberSchema>>({
    resolver: zodResolver(AddMemeberSchema),
    defaultValues: {
      memberToAdd: {
        _id: "",
        username: "",
      },
    },
  });

  const onSubmit = async (values: z.infer<typeof AddMemeberSchema>) => {
    console.log("Add member form values : ", values);
    const response = await addToGroup({
      chatId: currentChat?._id!,
      memberId: values.memberToAdd._id,
    });
    if (response.success) {
      toast({
        description: `${values.memberToAdd.username} has been added to the group!!`,
      });
      dispatch(toggleIsAddMemberModalOpen());
    } else {
      toast({
        description: response.message,
      });
    }
  };
  return (
    <Dialog
      open={isAddMemberModalOpen}
      onOpenChange={() => dispatch(toggleIsAddMemberModalOpen())}
    >
      <DialogContent className="sm:max-w-[525px] bg-secondary">
        <DialogHeader className="flex flex-col items-center">
          <DialogTitle className="text-3xl font-semibold">
            Add new members!!
          </DialogTitle>
          <DialogDescription>
            Add new members to the group. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="w-full h-auto flex flex-col items-center justify-center gap-4">
          <ProfileImage imageURL={currentChat?.imageURL || ""} size="xl" />
          <h3 className="text-xl font-semibold min-h-[28px]">
            {currentChat?.chatName}
          </h3>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-full flex flex-col gap-4"
            >
              <FormField
                control={form.control}
                name="memberToAdd"
                render={({ field: { onChange, onBlur, name } }) => (
                  <FormItem>
                    <FormLabel>Add a new member</FormLabel>
                    <FormControl>
                      <AsyncSelect
                        components={{
                          Option: CustomOption,
                        }}
                        name={name}
                        onChange={(e) => {
                          onChange({ _id: e?._id, username: e?.username });
                        }}
                        placeholder="Select members...."
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
              <DialogFooter className="w-full">
                <Button type="submit" className="ml-auto min-w-[120px]">
                  Save changes
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddMemberDialog;
