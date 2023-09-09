import * as z from "zod";

export const groupSchema = z.object({
  chatName: z.string().min(1, { message: "Chat name is required!!" }),
  members: z
    .array(z.string())
    .min(2, { message: "You at least need 2 members in a group!!" }),
});
