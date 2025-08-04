"use client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import AuthLayoutContent from "@/app/components/AuthLayoutContent";
import { useLoginMutation } from "@/query/authMutation";
import { SpinnerInfinity } from "spinners-react";
import { parseDjangoError } from "@/lib/utils";
import { useEffect, useState } from "react";
import GoogleLoginButton from "@/app/components/GoogleLoginButton";
import GitHubLoginButton from "@/components/GitHubLoginButton";

const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z
    .string()
    .min(8, { message: "Your password should be at least 8 characters" }),
});

export default function Login() {
  const Login = useLoginMutation();
  const [globalError, setGlobalError] = useState<string | null>(null); 

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setGlobalError(null); 
    Login.mutate(values, {
      onError: (error) => {
        const err = parseDjangoError(error);

        if (err.global && err.global.length > 0) {
          setGlobalError(err.global.join(", "));
        }

        if (err.fieldErrors) {
          Object.entries(err.fieldErrors).forEach(([field, messages]) => {
            form.setError(field as keyof typeof values, {
              type: "server",
              message: messages.join(", "),
            });
          });
        }
      },
    });
  }

  return (
    <AuthLayoutContent pageType="Login">
      {Login.isPending ? (
        <div className="flex items-center justify-center h-[60vh]">
          <SpinnerInfinity
            thickness={100}
            secondaryColor="#f0f0f0"
            color="#EA580C"
            size={90}
          />
        </div>
      ) : (
        <div className="mx-auto mt-20">
          <div className="flex flex-col items-center">
            <h1 className="font-sans font-medium text-2xl text-shadow-2xs">
              Welcome back to Talkit
            </h1>
            <p className="font-sans text-gray-500 text-md">
              Please enter your details to sign in
            </p>
          </div>

          <div className="w-fit mx-auto mt-2 space-y-4">
          <GoogleLoginButton/>
          <GitHubLoginButton/>
          </div>

          <div className="flex items-center my-4 max-w-[380px] mx-auto">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="mx-4 text-gray-500 text-md font-sans">Or sign in with</span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>

          {globalError && (
            <div className="text-red-600 text-sm font-medium capitalize  form-sans text-center mt-4">
              {globalError}
            </div>
          )}
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-6 max-w-[380px] mx-auto mt-2 flex flex-col justify-center"
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-sans text-md font-medium">
                      Email
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="jhondoe@gmail.com"
                        className="py-5 text-lg placeholder:capitalize"
                        {...field}
                      />
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
                    <FormLabel className="font-sans text-md font-medium">
                      Password
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="password" 
                        placeholder="*********"
                        className="py-5 text-lg placeholder:text-md"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage /> 
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-orange-600 text-white font-sans to-red-700 py-5 text-sm"
              >
                Sign in <ArrowRight />
              </Button>
              <Link
                href={"/forgot-password"}
                className="font-sans font-medium underline w-fit mx-auto"
              >
                Forget password?
              </Link>
            </form>
          </Form>
        </div>
      )}
    </AuthLayoutContent>
  );
}