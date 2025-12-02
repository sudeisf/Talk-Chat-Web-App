'use client';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { ArrowBigLeft, ArrowBigRight, ArrowRight } from 'lucide-react';
import AuthLayoutContent from '@/app/components/AuthLayoutContent';
import { useRegisterMutation } from '@/query/authMutation';
import { error } from 'console';
import { parseDjangoError } from '@/lib/utils';
import { useState } from 'react';
import { SpinnerInfinity } from 'spinners-react';
const formSchema = z
  .object({
    email: z.email(),
    username: z
      .string()
      .min(6, { message: 'username must be at least 6 chars' }),
    password: z
      .string()
      .min(8, { message: 'your password should be at leaset 8 charachters' }),
    confirmPassword: z
      .string()
      .min(8, { message: 'your password should be at leaset 8 charachters' }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords must match',
    path: ['confirmPassword'],
  });
export default function Register() {
  const Register = useRegisterMutation();
  const [globalError, setGlobalError] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      username: '',
      password: '',
      confirmPassword: '',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const data = values;
    const { confirmPassword, ...payload } = values;
    Register.mutate(payload, {
      onError: (error) => {
        const err = parseDjangoError(error);

        if (err.global && err.global.length > 0) {
          setGlobalError(err.global.join(', '));
        }

        if (err.fieldErrors) {
          Object.entries(err.fieldErrors).forEach(([field, messages]) => {
            form.setError(field as keyof typeof values, {
              type: 'server',
              message: messages.join(', '),
            });
          });
        }
      },
    });
  }

  return (
    <AuthLayoutContent pageType="Register">
      {Register.isPending ? (
        <div className="flex items-center justify-center h-[60vh]">
          <SpinnerInfinity
            thickness={100}
            secondaryColor="#f0f0f0"
            color="#EA580C"
            size={90}
          />
        </div>
      ) : (
        <div className="  mx-auto mt-10">
          <div className="flex flex-col items-center">
            <h1 className="font-sans font-medium text-2xl text-shadow-2xs">
              Welcome to Talkit
            </h1>
            <p className="font-sans text-gray-500 text-md">
              Please enter your details to sign up your details
            </p>
          </div>
          {globalError && (
            <div className="text-red-600 text-sm font-medium capitalize  form-sans text-center mt-4">
              {globalError}
            </div>
          )}
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-4 max-w-[380px] mx-auto mt-2 flex flex-col justify-center"
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
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-sans text-md font-medium">
                      Username
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="jhonfs"
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
                    <FormLabel className="font-sans text-md font-medium ">
                      Password
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="*********"
                        className="py-5 text-lg placeholder:text-md"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-sans text-md font-medium ">
                      Confirm Password
                    </FormLabel>
                    <FormControl>
                      <Input
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
                className="w-full bg-gradient-to-r from-[#03624C] to-[#03624C]/80 font-sans text-white py-5 text-sm "
              >
                Sign up <ArrowRight />
              </Button>
            </form>
          </Form>
        </div>
      )}
    </AuthLayoutContent>
  );
}
