"use client"
import Link from "next/link";
import Logo from "../../../public/svg/logo.svg";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { SearchBar } from "../learner/searchBar";
import { Bell, NotebookTabsIcon, Search, Settings } from "lucide-react";
import { Input } from "../ui/input";

const Pages = [
      {
            name : 'Dashboard',
            url : '#',
      },{
            name : 'Questions',
            url : '#',
      },{
            name : 'Sessions',
            url : '#',
      }
];

const userInfo = {
      name : "sudeis",
      avatar: "https://github.com/shadcn.png",
}





export default function Navbar(){

      return (
            <nav className="flex justify-between p-2">
                <div className="flex items-center gap-2 ">
                <Image alt="Logo" src={Logo} className="w-7 h-7" />
                <div className="flex gap-3 px-2 font-sans text-md font-light text-gray-600 ">
                              {Pages.map((page,index)=>(
                                    <Link href={page.url}>{page.name}</Link>
                              ))}
                        </div>
                </div>
                  <div className="flex items-center justify-center gap-2">
                  <div className={`relative w-52 `}>
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                        type="text"
                        placeholder="Search..."
                        className="pl-10 shadow-none border border-border/50 rounded-lg bg-background focus-visible:ring-0 focus-visible:ring-ring"
                        />
                        </div>
                       
                        <div className="flex gap-2 items-center">
                              <Avatar className="w-8 h-8">
                              <AvatarImage src={userInfo.avatar} />
                              <AvatarFallback>
                                    {userInfo.name.charAt(0)}
                              </AvatarFallback>
                        </Avatar>
                              <Bell className="w-5 h-5"/>
                        </div>
                        <div>

                        </div>

                        <div>
                        
                        </div>
                        <div>

                        </div>
                  </div>
            </nav>

      );
}