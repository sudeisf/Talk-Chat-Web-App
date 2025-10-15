'use client';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

import { Button } from './ui/button';
import { Edit3, LockIcon, Plus, X } from 'lucide-react';
import { Form, FormDescription, FormMessage } from './ui/form';
import { array, z } from 'zod';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormControl, FormField, FormItem, FormLabel } from './ui/form';
import { Input } from './ui/input';

const formSchema = z
  .object({
    email: z.email(),
    password: z
      .string()
      .min(8, 'Password must contain at least 8 characters.')
      .regex(/[A-Z]/, 'Password must contain at least one capital letter')
      .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
      .regex(/[0-9]/, 'Password must contain at least one number'),
    confirmPassword: z.string(),
    skills: z
      .array(z.string())
      .min(1, 'select at least one skill')
      .max(5, 'You can select only maximum of 5 skills.'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Password does not match',
    path: ['confirmPassword'],
  });

type FormData = z.infer<typeof formSchema>;

export function EditProfile() {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
      skills: [],
    },
  });

  const onSubmit = (data: FormData) => {
    console.log(data);
  };

  return (
    <Dialog>
      <DialogTrigger>
        <Button className="bg-gradient-to-r text-md font-pt bg-[#03624C] p-5  rounded-full mt-2 shadow-xs ">
          Edit Profile
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle className="text-sm font-sans font-medium flex gap-3">
          Edit Your Profile <Edit3 className="w-4 h-4" />
        </DialogTitle>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className='flex flex-col gap-2'>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="sudeisfed@gmail.com"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    you can change your email here.
                  </FormDescription>
                  <FormMessage/>
                </FormItem>
              )}
            />
           <div className='flex flex-col gap-2 mt-2'>
            <p
             className='text-sm py-2  flex gap-3 font-medium'>
              Change your Password
              <LockIcon className='w-4 h-4'/>
               </p>
           <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className='flex flex-col gap-2'>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="Password" 
                     {...field} />
                  </FormControl>
                  <FormMessage/>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem className='flex flex-col gap-2'>
                  <FormLabel>Confirm password</FormLabel>
                  <FormControl>
                    <Input
                      type="Password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage/>
                </FormItem>
              )}
            />
           </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
