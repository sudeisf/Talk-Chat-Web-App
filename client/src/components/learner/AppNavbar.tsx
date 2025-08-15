// components/app-navbar.tsx
"use client"

import { Menu, Bell, User, Settings } from "lucide-react"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { SearchBar } from "./searchBar"
import { useNotifications } from "@/contexts/NotificationContext"
import Link from "next/link"


export function AppNavbar() {
  const { unreadCount } = useNotifications()

  return (
    <header className="sticky top-0 z-30 flex h-14  items-center justify-between  bg-white px-4  dark:bg-gray-950">
      <div className="flex items-center gap-2">
        <SidebarTrigger>
          <Button variant="ghost" size="icon">
            <Menu className="h-8 w-8" />
          </Button>
        </SidebarTrigger>
        <SearchBar/>
      </div>

      <div className="flex items-center gap-2 max-w-4xl">
        <Button variant="ghost" asChild className="relative">
          <a href="/notifications">
            <Bell className="h-10 w-10 stroke-2 " />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {unreadCount > 9 ? '9+' : unreadCount}
              </span>
            )}
          </a>
        </Button>
        <Button variant="ghost" asChild>
          <a href="/settings">
            <Settings className="h-6 w-6 stroke-2" />
          </a>
        </Button>
        <div className="flex items-center gap-4 px-2">
          <Link href="/profile">
          <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
          </Link>
       
        {/* <div>
          <h1 className="capitalize text-sm font-pt">sudies fedlu</h1>
          <p className="font-sans font-light text-gray-400 text-sm">sudiesfed@gmail.com</p>
        </div>   */}
        </div>  
      </div>
    </header>
  )
}
