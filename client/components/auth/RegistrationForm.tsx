"use client";
import * as z from "zod";
import { useEffect, useMemo, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { registrationSchema } from "@/lib/zodSchemas/authSchema";
import { register } from "@/lib/api-helpers/user";
import { toast } from "../ui/use-toast";
import { useRouter } from "next/navigation";
// @ts-ignore
import { createAvatar, Result } from "@dicebear/core";
import { lorelei } from "@dicebear/collection";
import Image from "next/image";
import { uploadAvatar } from "@/lib/api-helpers/cloudinary";

const RegistrationForm = () => {
  const [userAvatar, setUserAvatar] = useState<Result | null>(null);

  const router = useRouter();
  const form = useForm<z.infer<typeof registrationSchema>>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof registrationSchema>) => {
    const imageURL = await uploadAvatar(userAvatar?.toString()!);
    console.log("Registration form values :", { ...values, imageURL });
    const response = await register({ ...values, imageURL });

    if (response.success) {
      toast({
        description: response.message,
      });
      localStorage.setItem("userInfo", JSON.stringify(response.data));
      form.reset();
      router.push("/login");
    } else {
      form.setError("password", { message: response.message });
    }
  };

  useEffect(() => {
    const avatar = createAvatar(lorelei, {
      seed: form.watch("username"),
      size: 128,
      scale: 110,
      translateY: 5,
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
    });

    setUserAvatar(avatar);
  }, [form.watch("username")]);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 max-w-[500px] w-full bg-secondary rounded-md p-4 shadow-2xl border-2 border-border"
      >
        <h1 className="text-4xl font-semibold font-dancing-script underline underline-offset-2">
          Register
        </h1>
        <div className="w-full flex justify-center">
          <div className="w-24 h-24 rounded-full flex items-center justify-center border border-gray-400 overflow-hidden">
            {userAvatar && (
              <Image
                src={userAvatar.toDataUriSync()}
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
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="abc123" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="abc@gmail.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="******" {...field} />
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
          Register
        </Button>

        <div className="text-center">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-primary hover:underline cursor-pointer font-medium"
          >
            Login
          </Link>
        </div>
      </form>
    </Form>
  );
};

export default RegistrationForm;
