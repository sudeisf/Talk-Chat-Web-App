'use client';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

import { Button } from './ui/button';
import { Edit3 } from 'lucide-react';
import { Form } from 'react-hook-form';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { min } from 'lodash';

const formSchema = z
  .object({
    email: z.email(),
    password: z
      .string()
      .min(8, 'Password must contain at least 8 characters.')
      .regex(/[A-Z]/, 'Password must contain at least on capital letter')
      .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
      .regex(/[0-9]/, 'Password must contain at least one numbet'),
    confirmPassword: z.string(),
    skills: z
      .array(z.string())
      .min(1, 'select at least one skill')
      .max(5, 'You can select only maximum of of 5 skills.'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Password does not match',
    path: ['confirmPassword'],
  });

type FormData = z.infer<typeof formSchema>;

export function EditProfile() {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
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
          <form onSubmit={form.handleSubmit(onSubmit)}></form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
