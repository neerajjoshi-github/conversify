"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

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
import Link from "next/link";
import { loginSchema } from "@/lib/zodSchemas/authSchema";
import { login } from "@/lib/api-helpers/user";
import { toast } from "../ui/use-toast";
import { useRouter } from "next/navigation";

const LoginForm = () => {
  const router = useRouter();
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof loginSchema>) => {
    console.log("Login form values :", values);
    const response = await login(values);
    if (response.success) {
      router.push("/dashboard");
      toast({
        description: response.message,
      });
      localStorage.setItem("userInfo", JSON.stringify(response.data));
      form.reset();
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
          Login
        </h1>
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
                <Input type="password" placeholder="*****" {...field} />
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
          Login
        </Button>
        <div className="text-center">
          Don't have an account?{" "}
          <Link
            href="/register"
            className="text-primary hover:underline cursor-pointer font-medium"
          >
            Register
          </Link>
        </div>
      </form>
    </Form>
  );
};

export default LoginForm;
