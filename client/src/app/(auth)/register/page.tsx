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
import { ArrowBigLeft, ArrowBigRight, ArrowRight } from "lucide-react";
import AuthLayoutContent from "@/app/components/AuthLayoutContent";
const formSchema = z.object({
      email : z.email(),
      username : z.string().min(6 ,{message: "username must be at least 6 chars"}),
      firstName: z.string().min(6 ,{message: "firstname must be at least 6 chars"}),
      lastName: z.string().min(6 ,{message: "lastname must be at least 6 chars"}),
      password : z.string().min(8,{message :"your password should be at leaset 8 charachters"}),
      confirmPassword: z.string().min(8,{message :"your password should be at leaset 8 charachters"})
})
export default function Register(){
      const form = useForm<z.infer<typeof formSchema>>({
            resolver : zodResolver(formSchema),
            defaultValues:{
                  email : "",
                  username: "",
                  password : "",
                  confirmPassword : ""
            }
      });

      function onSubmit(values : z.infer<typeof formSchema>){
            console.log(values);
      }

      return (
            <AuthLayoutContent pageType="Register">
            <div className="  mx-auto mt-10">
                  <div className="flex flex-col items-center">
                        <h1 className="font-sans font-medium text-2xl text-shadow-2xs">Welcome to Talkit</h1>
                        <p className="font-sans text-gray-500 text-md">Please enter your details to sign up your details</p>
                  </div>
                  <Form {...form}>
                     <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 max-w-[380px] mx-auto mt-2 flex flex-col justify-center">
                        <FormField
                              control={form.control}
                              name="email"
                              render={({field})=>(
                                    <FormItem>
                                          <FormLabel className="font-sans text-md font-medium">Email</FormLabel>
                                          <FormControl>
                                                <Input placeholder="jhondoe@gmail.com" className="py-5 text-lg placeholder:capitalize" {...field} />
                                          </FormControl>
                                    </FormItem>
                                    )}
                         />
                         <FormField
                              control={form.control}
                              name="username"
                              render={({field})=>(
                                    <FormItem>
                                          <FormLabel className="font-sans text-md font-medium">Username</FormLabel>
                                          <FormControl>
                                                <Input placeholder="jhonfs" className="py-5 text-lg placeholder:capitalize" {...field} />
                                          </FormControl>
                                    </FormItem>
                                    )}
                         />
                          <FormField
                              control={form.control}
                              name="password"
                              render={({field})=>(
                                    <FormItem>
                                          <FormLabel className="font-sans text-md font-medium ">Password</FormLabel>
                                          <FormControl>
                                                <Input placeholder="*********" className="py-5 text-lg placeholder:text-md" {...field} />
                                          </FormControl>
                                    </FormItem>
                                    )}
                         />
                         <FormField
                              control={form.control}
                              name="confirmPassword"
                              render={({field})=>(
                                    <FormItem>
                                          <FormLabel className="font-sans text-md font-medium ">Confirm Password</FormLabel>
                                          <FormControl>
                                                <Input placeholder="*********" className="py-5 text-lg placeholder:text-md" {...field} />
                                          </FormControl>
                                    </FormItem>
                                    )}
                         />

                         <Button type="submit" className="w-full bg-gradient-to-r from-orange-600 text-white font-sans to-red-700 py-5 text-sm ">Sign up <ArrowRight/></Button>
                     </form>
                  </Form>
            </div>
            </AuthLayoutContent>
      )
}