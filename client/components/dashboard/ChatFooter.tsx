"use client";
import React, { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { AiOutlineSend } from "react-icons/ai";
import { BsEmojiSmile } from "react-icons/bs";
import { Input } from "@/components/ui/input";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { sendMessage } from "@/lib/api-helpers/messages";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/lib/reduxStore/store";
import { toast } from "../ui/use-toast";
import {
  setLatestMessage,
  setIsTyping,
} from "@/lib/reduxStore/slices/chatsSlice";

const messageSchema = z.object({
  content: z.string().min(1).max(300),
});

type ChatFooterProps = {
  refetchMessages: () => void;
};

const ChatFooter: React.FC<ChatFooterProps> = ({ refetchMessages }) => {
  const [typing, setTyping] = useState(false);
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const dispatch = useDispatch();
  const { currentChat } = useSelector((state: RootState) => state.chats);
  const { socket } = useSelector((state: RootState) => state.socket);
  const form = useForm<z.infer<typeof messageSchema>>({
    resolver: zodResolver(messageSchema),
    defaultValues: {
      content: "",
    },
  });

  useEffect(() => {
    if (!socket) return;
    socket.on("typing", () => {
      dispatch(setIsTyping(true));
    });
    socket.on("stopedTyping", () => {
      dispatch(setIsTyping(false));
    });

    return () => {
      socket.off("typing");
      socket.off("stopedTyping");
    };
  }, [socket]);

  useEffect(() => {
    const subscription = form.watch((value, { name, type }) => {
      if (!typing && value.content !== "") {
        setTyping(true);
        socket.emit("typing", currentChat?._id);
      }
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
      const timerLength = 3000;
      typingTimeoutRef.current = setTimeout(() => {
        socket.emit("stopedTyping", currentChat?._id);
        setTyping(false);
      }, timerLength);
    });
    return () => subscription.unsubscribe();
  }, [form.watch]);

  const onSubmit = async (values: z.infer<typeof messageSchema>) => {
    console.log("MESSAGE VALUE : ", values);
    socket.emit("stopedTyping", currentChat?._id);
    const newMessage = {
      content: values.content,
      chatId: currentChat?._id!,
    };
    const response = await sendMessage(newMessage);
    if (response.success) {
      form.reset();
      dispatch(setLatestMessage(response.data));
      refetchMessages();
      if (socket) {
        socket.emit("new message", response.data);
      }
    } else {
      toast({
        description: response.message,
      });
    }
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="z-10 w-full bg-secondary h-14 flex items-center gap-1"
      >
        <Button type="button" variant="ghost" size="icon">
          <BsEmojiSmile size={28} />
        </Button>
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormControl>
                <Input
                  {...field}
                  className="bg-background w-full"
                  placeholder="Type a message"
                />
              </FormControl>
            </FormItem>
          )}
        />
        <Button
          disabled={form.formState.isSubmitting}
          type="submit"
          variant="ghost"
          size="icon"
          title="Send"
        >
          <AiOutlineSend size={28} />
        </Button>
      </form>
    </Form>
  );
};

export default ChatFooter;
