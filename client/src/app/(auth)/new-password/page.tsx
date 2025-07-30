"use client"
import { 
      Form,
      FormControl,
      FormField,
      FormItem,
      FormLabel,
      FormMessage,
      FormDescription
 } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod"
import {z} from "zod";
import {useForm} from "react-hook-form"
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import AuthLayoutContent from "@/app/components/AuthLayoutContent";

const formSchema = z.object({
      password : z.string().min(8,{message :"your password should be at leaset 8 charachters"}),
      confirPassword : z.string().min(8,{message :"your password should be at leaset 8 charachters"})
})
export default function NewPassword(){
      const form = useForm<z.infer<typeof formSchema>>({
            resolver : zodResolver(formSchema),
            defaultValues:{
                  password : "",
                  confirPassword : ""
            }
      });

      function onSubmit(values : z.infer<typeof formSchema>){     ``
            console.log(values);
      }

      return (
        <>
           <div className="flex justify-center p-4">
                        <h1 className="bg-gradient-to-r from-orange-200 font-sans to-red-700 bg-clip-text text-transparent text-4xl">Talkit</h1>
                        </div>
            <div className="  mx-auto mt-10">
                  <div className="flex flex-col items-center">
                        <h1 className="font-sans font-medium text-2xl text-shadow-2xs">You can add your new password</h1>
                        <p className="font-sans text-gray-500 text-md">Please make sure the passwords match</p>
                  </div>
                  <Form {...form}>
                     <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 max-w-[380px] mx-auto mt-4 flex flex-col justify-center">
                     <FormField
                              control={form.control}
                              name="password"
                              render={({field})=>(
                                    <FormItem>
                                          <FormLabel className="font-sans text-md font-medium ">New password</FormLabel>
                                          <FormControl>
                                                <Input placeholder="*********" className="py-5 text-lg placeholder:text-md" {...field} />
                                          </FormControl>
                                    </FormItem>
                                    )}
                         />
                         <FormField
                              control={form.control}
                              name="confirPassword"
                              render={({field})=>(
                                    <FormItem>
                                          <FormLabel className="font-sans text-md font-medium ">Confirm password</FormLabel>
                                          <FormControl>
                                                <Input placeholder="*********" className="py-5 text-lg placeholder:text-md" {...field} />
                                          </FormControl>
                                    </FormItem>
                                    )}
                         />

                         <Button type="submit" className="w-full bg-gradient-to-r from-orange-600 text-white font-sans to-red-700 py-5 text-sm ">Confirm<ArrowRight/></Button>
                       
                     </form>
                  </Form>
            </div>
            </>
      )
}