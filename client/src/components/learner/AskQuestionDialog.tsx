"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "../ui/dialog"
import { Form, FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "../ui/form"
import { Input } from "../ui/input"
import { Textarea } from "../ui/textarea"
import { Button } from "../ui/button"
import { PlusCircle } from "lucide-react"
import { useState } from "react"
import { QuestionTags } from "./QuestionTags"

// Define the form schema with Zod for validation
const questionFormSchema = z.object({
  title: z.string().min(1, "Title is required").max(100, "Title must be less than 100 characters"),
  tags: z.array(z.string().min(1, "Tag cannot be empty")).min(1, "At least one tag is required").max(5, "No more than 5 tags"),
  description: z.string().min(1, "Description is required").max(1000, "Description must be less than 1000 characters"),
})

// Define the form data type
type QuestionFormData = z.infer<typeof questionFormSchema>

export default function AskQuestion() {
  const [open, setOpen] = useState(false)
  const form = useForm<QuestionFormData>({
    resolver: zodResolver(questionFormSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  })

  const onSubmit = (data: QuestionFormData) => {
    // Handle form submission
    console.log("Question submitted:", data)
    // Here you would typically send the data to your API
    // For now, we'll just close the dialog
    setOpen(false)
    form.reset()
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant={"outline"}
          className="rounded-sm shadow-sm flex border border-orange-600 text-orange-600 hover:bg-orange-50"
        >
          <PlusCircle className="w-4 h-4 mr-2" />
          Ask 
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Ask a Question</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your question title here..."
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Enter a concise title for your question.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField 
                  name="tags"
                  render={({field})=>(
                        <FormItem>
                              <FormLabel>Tags</FormLabel>
                              <FormControl>
                              <QuestionTags value={field.value} onChange={field.onChange} />
                              </FormControl>
                        </FormItem>
                        )}
                  />


            <FormField
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Describe your question in detail..."
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Provide a detailed description of your question.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />



            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setOpen(false)
                  form.reset()
                }}
              >
                Cancel
              </Button>
              <Button
                type="submit"
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