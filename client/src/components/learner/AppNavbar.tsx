// components/app-navbar.tsx
"use client"

import { Menu, Bell, User } from "lucide-react"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { SearchBar } from "./searchBar"


export function AppNavbar() {
  return (
    <header className="sticky top-0 z-30 flex h-16  items-center justify-between  bg-white px-4  dark:bg-gray-950">
      <div className="flex items-center gap-2">
        <SidebarTrigger>
          <Button variant="ghost" size="icon">
            <Menu className="h-8 w-8" />
          </Button>
        </SidebarTrigger>
        <div className="flex flex-col p-2">
        <h1 className="text-md font-medium text-gray-600 dark:text-white">Greetings,sudeis!</h1>
        <p className="text-sm text-gray-500">7 May,2025</p>
        </div>
      </div>

      <div className="flex items-center gap-2">
            <SearchBar/>
        <Button variant="ghost">
          <Bell className="h-10 w-10 stroke-2 " />
        </Button>
        <div className="flex items-center gap-4 px-2">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        {/* <div>
          <h1 className="capitalize text-sm font-pt">sudies fedlu</h1>
          <p className="font-sans font-light text-gray-400 text-sm">sudiesfed@gmail.com</p>
        </div>   */}
        </div>  
      </div>
    </header>
  )
}
