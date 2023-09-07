"use client";

import * as z from "zod";
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

const RegistrationForm = () => {
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
    console.log("Registration form values :", values);
    const response = await register(values);

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

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 max-w-[500px] w-full bg-secondary rounded-md p-4 shadow-2xl border-2 border-border"
      >
        <h1 className="text-4xl font-semibold font-dancing-script underline underline-offset-2">
          Register
        </h1>
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
