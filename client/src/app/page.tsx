import { Button } from "@/components/ui/button";
import Image from "next/image";
import { ArrowBigRight, ArrowRightFromLineIcon, ArrowUpRight } from "lucide-react";

export default function Home() {
  return (
    <div>
      <nav className="flex justify-between p-4 *:font-sans">
        <p className="text-2xl bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent text-shadow-xs">Talktit</p>

        <div className="flex"> 
        <Button variant={"ghost"} className="text-md">Sign in</Button>
        <Button className="rounded-sm text-md shadow-xs bg-gradient-to-r from-orange-400 to-red-500  text-white">Sign up</Button>
        </div>
      </nav>
      <main>
          <div className="mt-10">
          <h1 className=" mx-auto text-center text-black bg-red-500/5 w-fit py-2 px-4 rounded-4xl animate-bounce">
          Ask smarter. Learn faster. Never get stuck again.
          </h1>
          <div className="max-w-5xl mx-auto space-y-4">
          <p className="text-2xl capitalize font-medium text-center font-pt  text-orange-900">
          Whether you're debugging a tricky function, confused by async behavior, or just need a second brain this platform connects you with real people, in real time.</p>
          <p 
          className="text-[1.1rem]
           bg-gradient-to-br from-orange-600 via-red-400 to-orange-300  bg-clip-text text-transparent
         text-center">
          No more endless Googling. No more waiting for forum replies.<br/>
          Just ask, get matched instantly, and learn through live chat — one question at a time.<br/>
          </p>
        <p className=" text-center text-gray-500 text-[1.1rem] underline">Start learning the way you always wanted: <span className="text-red-500 ">fast</span>, <span className="text-red-500 ">focused</span>, and <span className="text-red-500 animate-in">human</span>.</p>


          </div>

        <div className="max-w-4xl mx-auto space-y-4 flex justify-center mt-4">
        <Button className="bg-red-500 text-md py-6 px-10 rounded-md shadow-lg hover:bg-red-500/80">
        Ask a Question & Get Help <ArrowUpRight/>
      </Button>
        </div>
          </div>
        
          
        
        
      </main>
    </div>
  );
}
