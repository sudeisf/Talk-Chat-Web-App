'use client';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

import { Button } from './ui/button';
import { Edit3 } from 'lucide-react';
import { Form, FormDescription, FormMessage } from './ui/form';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormControl, FormField, FormItem, FormLabel } from './ui/form';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { getCurrentUser, updateCurrentUserProfile } from '@/lib/api/authApi';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { SkillsInput } from './helper/skillsTagInput';
import { useAppSelector } from '@/redux/hooks';

const formSchema = z
  .object({
    first_name: z.string().min(1, 'First name is required').max(50),
    last_name: z.string().min(1, 'Last name is required').max(50),
    profession: z.string().max(100).optional().or(z.literal('')),
    bio: z.string().max(500).optional().or(z.literal('')),
    phone_number: z.string().max(20).optional().or(z.literal('')),
    city: z
      .string()
      .min(1, 'City is required')
      .max(50, 'City name is too long')
      .regex(/^[a-zA-Z\s\-']+$/, 'Please enter a valid city name'),
    country: z
      .string()
      .min(1, 'Country is required')
      .max(50, 'Country name is too long')
      .regex(/^[a-zA-Z\s\-']+$/, 'Please enter a valid country name'),
  });

type FormData = z.infer<typeof formSchema>;

export function EditProfile() {
  const [open, setOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [profileTagMap, setProfileTagMap] = useState<Record<string, number>>({});

  const reduxTagMap = useAppSelector((state) => {
    const map: Record<string, number> = {};
    Object.values(state.proTags).forEach((container: any) => {
      container.forEach((tag: any) => {
        const parsedId = Number(tag?.id);
        if (!Number.isNaN(parsedId) && tag?.label) {
          map[String(tag.label)] = parsedId;
        }
      });
    });
    return map;
  });

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      first_name: '',
      last_name: '',
      profession: '',
      bio: '',
      phone_number: '',
      city: '',
      country: '',
    },
  });

  useEffect(() => {
    if (!open) return;

    getCurrentUser()
      .then((data) => {
        const incomingTags = Array.isArray(data?.tags) ? data.tags : [];
        const incomingTagMap: Record<string, number> = {};
        incomingTags.forEach((tag: any) => {
          if (tag?.name && tag?.id) {
            incomingTagMap[String(tag.name)] = Number(tag.id);
          }
        });

        setSelectedSkills(incomingTags.map((tag: any) => String(tag?.name)).filter(Boolean));
        setProfileTagMap(incomingTagMap);

        form.reset({
          first_name: data?.first_name || '',
          last_name: data?.last_name || '',
          profession: data?.profession || '',
          bio: data?.bio || '',
          phone_number: data?.phone_number || '',
          city: data?.city || '',
          country: data?.country || '',
        });
      })
      .catch((error) => {
        console.error(error?.response?.data || error);
        toast.error('Failed to load profile data');
      });
  }, [open, form]);

  const onSubmit = async (data: FormData) => {
    try {
      setIsSaving(true);

      const tagIds = selectedSkills
        .map((name) => reduxTagMap[name] || profileTagMap[name])
        .filter((id): id is number => typeof id === 'number' && !Number.isNaN(id));

      const updated = await updateCurrentUserProfile({
        ...data,
        tags_id: tagIds,
      });

      if (typeof window !== 'undefined') {
        window.dispatchEvent(
          new CustomEvent('profile-updated', {
            detail: { profile: updated },
          })
        );
      }
      toast.success('Profile updated successfully');
      setOpen(false);
    } catch (error: any) {
      console.error(error?.response?.data || error);
      toast.error('Failed to update profile');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="bg-gradient-to-r text-sm font-pt bg-[#03624C] px-4 text-white  rounded-full mt-2 shadow-xs ">
        Edit Profile
      </DialogTrigger>
      <DialogContent className="sm:max-w-4xl">
        <DialogTitle className="text-sm font-sans font-medium flex gap-3">
          Edit Your Profile <Edit3 className="w-4 h-4" />
        </DialogTitle>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            autoComplete="off"
            className="space-y-4"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="first_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input placeholder="First name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="last_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Last name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="profession"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Profession</FormLabel>
                    <FormControl>
                      <Input placeholder="Software engineer" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone_number"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input placeholder="+251..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>City</FormLabel>
                    <FormControl>
                      <Input placeholder="Addis Ababa" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="country"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Country</FormLabel>
                    <FormControl>
                      <Input placeholder="Ethiopia" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="md:col-span-2">
                <FormField
                  control={form.control}
                  name="bio"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Bio</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Tell us about yourself"
                          className="min-h-[110px]"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>Maximum 500 characters.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="md:col-span-2">
                <FormItem>
                  <FormLabel>Skills / Tags</FormLabel>
                  <FormControl>
                    <SkillsInput
                      value={selectedSkills}
                      onChange={(skills) => setSelectedSkills(skills as string[])}
                    />
                  </FormControl>
                  <FormDescription>
                    Add tags to update your profile skills.
                  </FormDescription>
                </FormItem>
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
                disabled={isSaving}
              >
                Cancel
              </Button>
              <Button type="submit" className="rounded-sm bg-[#03624C]" disabled={isSaving}>
                {isSaving ? 'Saving...' : 'Update Information'}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
