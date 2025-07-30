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
      email : z.email(),
      password : z.string().min(8,{message :"your password should be at leaset 8 charachters"})
})
export default function Login(){
      const form = useForm<z.infer<typeof formSchema>>({
            resolver : zodResolver(formSchema),
            defaultValues:{
                  email : "",
                  password : ""
            }
      });

      function onSubmit(values : z.infer<typeof formSchema>){
            console.log(values);
      }

      return (
            <AuthLayoutContent pageType="Login" >
            <div className="  mx-auto mt-20">
                  <div className="flex flex-col items-center">
                        <h1 className="font-sans font-medium text-2xl text-shadow-2xs">Welcome back to Talkit</h1>
                        <p className="font-sans text-gray-500 text-md">Please enter your details to sign in your details</p>
                  </div>
                  <Form {...form}>
                     <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 max-w-[380px] mx-auto mt-2 flex flex-col justify-center">
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

                         <Button type="submit" className="w-full bg-gradient-to-r from-orange-600 text-white font-sans to-red-700 py-5 text-sm ">Sign in <ArrowRight/></Button>
                        <Link href={"/forgot-password"} className="font-sans font-medium underline w-fit mx-auto">
                              Forget password?
                        </Link>
                     </form>
                  </Form>
            </div>
            </AuthLayoutContent>
      )
}