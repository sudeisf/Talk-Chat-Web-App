"use client"
import { 
      Form,
      FormControl,
      FormField,
      FormItem,
      FormLabel,
 } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod"
import {z} from "zod";
import {useForm} from "react-hook-form"
import Link from "next/link";
import { ArrowBigLeft, ArrowLeft, ArrowRight } from "lucide-react";
import AuthLayoutContent from "@/app/components/AuthLayoutContent";
import { useRouter } from "next/navigation";
const formSchema = z.object({
      email : z.email()
})
export default function ForgotPassword(){
      const form = useForm<z.infer<typeof formSchema>>({
            resolver : zodResolver(formSchema),
            defaultValues:{
                  email : "",
            }
      });

      function onSubmit(values : z.infer<typeof formSchema>){
            console.log(values);
      }
      const router = useRouter();

      return (
            <div>
                   <div className="flex justify-between p-4">
                        <h1 className="bg-gradient-to-r from-orange-200 font-sans to-red-700 bg-clip-text text-transparent text-xl">Talkit</h1>
                              <div className="flex space-x-0.5 text-md">
                              </div>
                        </div>
          
            <div className="  mx-auto mt-20 max-w-[400px]">
                  <div className="flex flex-col items-left space-y-2">
                        <h1 className="font-sans font-medium text-2xl text-shadow-2xs">Verify your email first</h1>     
                        <p className="font-sans text-gray-500 text-md">One time pass code will be sent to your email after confirmation</p>
                  </div>
                  <Form {...form}>
                     <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6  mx-auto mt-2 flex flex-col justify-center">
                        <FormField
                              control={form.control}
                              name="email"
                              render={({field})=>(
                                    <FormItem>
                                          <FormControl>
                                                <Input placeholder="jhondoe@gmail.com" className="py-5 text-lg placeholder:capitalize" {...field} />
                                          </FormControl>
                                    </FormItem>
                                    )}
                         />

                         <Button type="submit" className="w-full bg-gradient-to-r from-orange-600 text-white font-sans to-red-700 py-5 text-sm ">Verify email <ArrowRight/></Button>
                         <Button onClick={()=> router.replace("/login")} variant={"ghost"} className="font-sans  items-center flex justify-center text-md hover:bg-white">
                              <ArrowLeft/> <span>Remembered Password</span>
                        </Button>
                     </form>
                  </Form>
            </div>
            </div>
            

       
      )
}