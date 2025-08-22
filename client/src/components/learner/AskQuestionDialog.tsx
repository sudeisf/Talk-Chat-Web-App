"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "../ui/dialog"
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "../ui/form"
import { Input } from "../ui/input"
import { Textarea } from "../ui/textarea"
import { Button } from "../ui/button"
import { PlusCircle } from "lucide-react"
import { QuestionTags } from "./QuestionTags"

const questionFormSchema = z.object({
  title: z.string().min(1, "Title is required").max(100, "Title must be less than 100 characters"),
  tags: z.array(z.string().min(1, "Tag cannot be empty")).min(1, "At least one tag is required").max(5, "No more than 5 tags"),
  description: z.string().min(1, "Description is required").max(1000, "Description must be less than 1000 characters"),
})

type QuestionFormData = z.infer<typeof questionFormSchema>

export default function AskQuestion() {
  const [open, setOpen] = useState(false)
  const form = useForm<QuestionFormData>({
    resolver: zodResolver(questionFormSchema),
    defaultValues: {
      title: "",
      description: "",
      tags: [],
    },
  })

  const onSubmit = (data: QuestionFormData) => {
    console.log("Question submitted:", data)
    setOpen(false)
    form.reset()
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="rounded-lg px-4 py-2 flex items-center gap-2 border border-orange-500 text-orange-600 font-medium hover:bg-orange-50 transition"
        >
          <PlusCircle className="w-5 h-5" />
          Ask 
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[650px] rounded-xl shadow-lg p-6">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-gray-800">
            Ask a Question
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Title */}
            <FormField
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-gray-700">Title</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g. How do I optimize my React app?"
                      className="rounded-lg border-gray-300 focus:ring-2 focus:ring-orange-400"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription className="text-xs text-gray-500">
                    Enter a short, descriptive title.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Tags */}
            <FormField
              name="tags"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-gray-700">Tags</FormLabel>
                  <FormControl>
                    <QuestionTags value={field.value} onChange={field.onChange} />
                  </FormControl>
                  <FormDescription className="text-xs text-gray-500">
                    Add up to 5 tags to categorize your question.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Description */}
            <FormField
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-gray-700">Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Explain your question in detail..."
                      className="resize-none min-h-[120px] rounded-lg border-gray-300 focus:ring-2 focus:ring-orange-400"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription className="text-xs text-gray-500">
                    Provide as much detail as possible.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Footer */}
            <DialogFooter className="flex justify-end gap-2 pt-4 border-t">
              <Button
                type="button"
                variant="outline"
                className="rounded-lg"
                onClick={() => {
                  setOpen(false)
                  form.reset()
                }}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-orange-500 hover:bg-orange-600 text-white rounded-lg"
                disabled={form.formState.isSubmitting}
              >
                {form.formState.isSubmitting ? "Submitting..." : "Submit Question"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
