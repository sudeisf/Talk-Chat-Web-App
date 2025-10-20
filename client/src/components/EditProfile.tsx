'use client';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

import { Button } from './ui/button';
import {
  Briefcase,
  Cog,
  Edit3,
  LocationEdit,
  LockIcon,
  Plus,
  X,
} from 'lucide-react';
import { Form, FormDescription, FormMessage } from './ui/form';
import { array, z } from 'zod';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormControl, FormField, FormItem, FormLabel } from './ui/form';
import { Input } from './ui/input';
import { useSelector } from 'react-redux';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { SkillsInput } from './helper/skillsTagInput';



const formSchema = z
  .object({
    email: z.email(),
    currentRole: z.string().min(10, 'the field accepts at least 10 chars'),
    city: z
      .string()
      .min(2, 'City must be at least 2 characters')
      .max(50, 'City name is too long')
      .regex(/^[a-zA-Z\s\-']+$/, 'Please enter a valid city name'),
    country: z
      .string()
      .min(2, 'Country must be at least 2 characters')
      .max(50, 'Country name is too long')
      .regex(/^[a-zA-Z\s\-']+$/, 'Please enter a valid country name'),
    password: z
      .string()
      .min(8, 'Password must contain at least 8 characters.')
      .regex(/[A-Z]/, 'Password must contain at least one capital letter')
      .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
      .regex(/[0-9]/, 'Password must contain at least one number'),
    confirmPassword: z.string(),
    skills: z
      .string()
      .min(1, 'select at least one skill')
      .max(100, 'Skills list is too long.'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Password does not match',
    path: ['confirmPassword'],
  });

type FormData = z.infer<typeof formSchema>;

export function EditProfile() {
  const proTags = useAppSelector((state) => state.proTags);
  const dispatch = useAppDispatch();
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      currentRole: '',
      city: '',
      country: '',
      password: '',
      confirmPassword: '',
      skills: '',
    },
  });

  const onSubmit = (data: FormData) => {
    console.log(data);
  };

  return (
    <Dialog>
      <DialogTrigger className="bg-gradient-to-r text-sm font-pt bg-[#03624C] px-4 text-white  rounded-full mt-2 shadow-xs ">
        Edit Profile
      </DialogTrigger>
      <DialogContent>
        <DialogTitle className="text-sm font-sans font-medium flex gap-3">
          Edit Your Profile <Edit3 className="w-4 h-4" />
        </DialogTitle>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} autoComplete="off">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-2">
                  <FormLabel>E-mail</FormLabel>
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
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="currentRole"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-2 mt-3">
                  <FormLabel>
                    Current role <Briefcase className="w-4 h-4" />
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="senior backend developer"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="skills"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-2 mt-3">
                  <FormLabel>
                    Skills <Cog className="w-4 h-4" />
                  </FormLabel>
                  <FormControl>
                    <SkillsInput
                      value={[]}
                      onChange={function (skills: String[]): void {
                        throw new Error('Function not implemented.');
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="mt-4 space-y-3">
              <p className="text-sm font-medium flex gap-2">
                Adress <LocationEdit className="w-4 h-4" />
              </p>
              <div className="flex gap-3 py-2">
                <FormField
                  control={form.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem className="flex flex-col gap-2">
                      <FormLabel>City</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="Addis Abeba"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="country"
                  render={({ field }) => (
                    <FormItem className="flex flex-col gap-2">
                      <FormLabel>Country</FormLabel>
                      <FormControl>
                        <Input type="text" placeholder="Ethiopia" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div className="flex flex-col gap-2 mt-2">
              <p className="text-sm py-2  flex gap-3 font-medium">
                Change your Password
                <LockIcon className="w-4 h-4" />
              </p>
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="flex flex-col gap-2">
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="Password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem className="flex flex-col gap-2">
                    <FormLabel>Confirm password</FormLabel>
                    <FormControl>
                      <Input type="Password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Button className="rounded-sm mt-2 bg-[#03624C]">
              Update Information
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
