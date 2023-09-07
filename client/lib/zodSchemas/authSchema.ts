import * as z from "zod";

export const loginSchema = z.object({
  email: z.string().email().min(1, { message: "Email is required!!" }),
  password: z.string().min(1, { message: "Password is required!!" }),
});

export const registrationSchema = z.object({
  username: z
    .string()
    .min(2, { message: "Username can be between 3 to 20 characters!!" })
    .max(20, { message: "Username can be between 3 to 20 characters!!" }),
  email: z.string().email().min(1, { message: "Email is required!!" }),
  password: z
    .string()
    .min(6, { message: "Password must at least 6 characters!!" }),
  imageURL: z.string().optional(),
});
