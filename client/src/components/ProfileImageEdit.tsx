'use client';

import { useState, useCallback } from 'react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './ui/form';
import { Input } from './ui/input';
import { useDroppable } from '@dnd-kit/core';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Camera, Edit, File as FileIcon, User, X } from 'lucide-react';
import Image from 'next/image';
import { Button } from './ui/button';
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar';

// Define the form schema with proper typing
const formSchema = z.object({
  coverImage: z
    .instanceof(File, { message: 'No file provided' })
    .refine(
      (file) => ['image/jpeg', 'image/png', 'image/jpg'].includes(file.type),
      'Only JPEG or PNG images are allowed'
    )
    .refine(
      (file) => file.size <= 2 * 1024 * 1024,
      'File size must be less than 2MB'
    ),
});

type FormData = z.infer<typeof formSchema>;

export default function UploadProfileImage() {
  const [droppedFile, setDroppedFile] = useState<File | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const { setNodeRef, isOver } = useDroppable({
    id: 'dropzone',
  });

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const handleDrop = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      setIsDragOver(false);
      const file = event.dataTransfer.files?.[0];
      if (file) {
        try {
          form.setValue('coverImage', file);
          const imageUrl = URL.createObjectURL(file);
          setPreviewUrl(imageUrl);
          setDroppedFile(file);
          form.trigger('coverImage'); // Validate immediately
        } catch (error) {
          console.error('Error handling dropped file:', error);
        }
      }
    },
    [form]
  );

  const handleDragOver = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      setIsDragOver(true);
    },
    []
  );

  const handleDragLeave = useCallback(() => {
    setIsDragOver(false);
  }, []);

  const handleFileInputChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (file) {
        try {
          form.setValue('coverImage', file);
          const imageUrl = URL.createObjectURL(file);
          setPreviewUrl(imageUrl);
          setDroppedFile(file);
          form.trigger('coverImage');
        } catch (error) {
          console.error('Error handling file input:', error);
        }
      }
    },
    [form]
  );

  const onSubmit = (data: FormData) => {
    console.log('Form submitted with data:', data);
    // Handle form submission, e.g., upload the file
  };

  return (
    <Dialog>
      <DialogTrigger 
        className="absolute -bottom-2 -right-2 h-10 w-10 rounded-full p-0 bg-white shadow-md hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700 dark:border-gray-600 flex items-center justify-center"
      >
        <Camera className="h-5 w-5" />
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-center">
            Change Profile Picture
          </DialogTitle>
          <DialogDescription className="text-center text-gray-500">
            Upload a new profile picture. Supported formats: JPG, PNG, GIF, WebP
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              name="coverImage"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div
                      ref={setNodeRef}
                      onDrop={handleDrop}
                      onDragOver={handleDragOver}
                      onDragLeave={handleDragLeave}
                      className={`rounded-lg p-6 text-center cursor-pointer transition-all duration-200 border-2 border-dashed ${
                        isDragOver || isOver
                          ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 dark:border-blue-400'
                          : 'border-gray-300 hover:border-gray-400 dark:border-gray-600 dark:hover:border-gray-500 bg-gray-50 dark:bg-gray-800/50'
                      }`}
                      onClick={() =>
                        document.getElementById('file-input')?.click()
                      }
                    >
                      <Input
                        id="file-input"
                        type="file"
                        accept="image/jpeg,image/png,image/jpg,image/gif,image/webp"
                        onChange={handleFileInputChange}
                        className="hidden"
                      />
                      {droppedFile ? (
                        <div className="flex flex-col items-center space-y-4">
                          <Avatar className="w-32 h-32 mx-auto border-4 border-white dark:border-gray-800 shadow-lg">
                            <AvatarImage
                              src={previewUrl || undefined}
                              className="object-cover"
                              alt="Profile preview"
                            />
                            <AvatarFallback className="bg-gray-200 dark:bg-gray-600">
                              <User className="h-8 w-8 text-gray-500 dark:text-gray-400" />
                            </AvatarFallback>
                          </Avatar>
                          <p className="text-sm text-gray-600 dark:text-gray-300">
                            {droppedFile.name}
                          </p>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center space-y-4">
                          <div className="w-20 h-20 rounded-full bg-gray-200 dark:bg-gray-600 flex items-center justify-center">
                            <User className="h-10 w-10 text-gray-500 dark:text-gray-400" />
                          </div>
                          <div className="space-y-2">
                            <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                              Drag and drop or click to upload
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              Max file size: 2MB
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex w-full justify-end gap-2">
              <Button
                variant="outline"
                type="button"
                className=""
                onClick={() => {
                  setDroppedFile(null);
                  setPreviewUrl(null);
                  form.reset();
                }}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className=" bg-[#03624C] text-white rounded-md hover:bg-[#03624C]/90 disabled:opacity-50 dark:bg-[#03624C] dark:hover:bg-[#03624C]/80"
                disabled={!droppedFile || !form.formState.isValid}
              >
                Save Changes
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
