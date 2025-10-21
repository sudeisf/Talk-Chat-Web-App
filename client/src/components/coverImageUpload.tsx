"use client";

import { useState, useCallback } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { Input } from "./ui/input";
import { useDroppable } from "@dnd-kit/core";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { Edit } from "lucide-react";

// Define the form schema with proper typing
const formSchema = z.object({
  coverImage: z
    .instanceof(File, { message: "No file provided" })
    .refine(
      (file) => ["image/jpeg", "image/png", "image/jpg"].includes(file.type),
      "Only JPEG or PNG images are allowed"
    )
    .refine(
      (file) => file.size <= 2 * 1024 * 1024,
      "File size must be less than 2MB"
    ),
});

type FormData = z.infer<typeof formSchema>;

export default function UploadCoverImage() {
  const [droppedFile, setDroppedFile] = useState<File | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);

  const { setNodeRef, isOver } = useDroppable({
    id: "dropzone",
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
          form.setValue("coverImage", file);
          setDroppedFile(file);
          form.trigger("coverImage"); // Validate immediately
        } catch (error) {
          console.error("Error handling dropped file:", error);
        }
      }
    },
    [form]
  );

  const handleDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback(() => {
    setIsDragOver(false);
  }, []);

  const handleFileInputChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (file) {
        try {
          form.setValue("coverImage", file);
          setDroppedFile(file);
          form.trigger("coverImage");
        } catch (error) {
          console.error("Error handling file input:", error);
        }
      }
    },
    [form]
  );

  const onSubmit = (data: FormData) => {
    console.log("Form submitted with data:", data);
    // Handle form submission, e.g., upload the file
  };

  return (
    <Dialog>
        <DialogTrigger className="flex itesm-center">
        <div className="flex items-center justify-center bg-white hover:bg-gray-100 rounded-full w-10 h-10">
          <Edit className="w-4 h-4 text-black" />
        </div>
        </DialogTrigger>
        <DialogContent>
            <DialogTitle></DialogTitle>
            <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            name="coverImage"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Upload Cover Image</FormLabel>
                <FormControl>
                  <div
                    ref={setNodeRef}
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
                      isDragOver || isOver
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-300 hover:border-gray-400"
                    }`}
                    onClick={() => document.getElementById("file-input")?.click()}
                  >
                    <Input
                      id="file-input"
                      type="file"
                      accept="image/jpeg,image/png,image/jpg"
                      onChange={handleFileInputChange}
                      className="hidden"
                    />
                    {droppedFile ? (
                      <div>
                        <p className="text-sm text-gray-600">Selected: {droppedFile.name}</p>
                        <p className="text-xs text-gray-500">
                          Size: {(droppedFile.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </div>
                    ) : (
                      <div>
                        <p className="text-gray-600">
                          Drag and drop an image here, or click to select
                        </p>
                        <p className="text-sm text-gray-500 mt-2">
                          JPEG, PNG up to 2MB
                        </p>
                      </div>
                    )}
                  </div>
                </FormControl>
                <FormDescription>
                  Select or drag and drop your cover image file.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <button
            type="submit"
            className="w-full bg-[#03624C] text-white py-2 px-4 rounded hover:bg-[#03624C]/90 disabled:opacity-50"
            disabled={!droppedFile || !form.formState.isValid}
          >
            Upload
          </button>
        </form>
      </Form>
        </DialogContent>
    </Dialog>
  );
}