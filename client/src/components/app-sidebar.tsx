import { Calendar, Home, Inbox, Search, Bookmark ,CircleQuestionMark, LogOut, Ghost, Bell } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Button } from "./ui/button"

const items = [
  {
    title: "Dashboard",
    url: "/learner-dashboard",
    icon: Home,
  },
  {
    title: "My Questions",
    url: "/my-questions",
    icon: CircleQuestionMark,
  },
  {
    title: "Active Chats",
    url: "#",
    icon: Inbox,
  },
  {
    title: "Notifications",
    url: "/notifications",
    icon: Bell,
  },
  {
    title: "Bookmarks",
    url: "/bookmarks",
    icon: Bookmark,
  },

]

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent className="bg-white flex flex-col h-full justify-between">
        <SidebarGroup>
        <div>
          <h1 className="text-xl font-pt p-4 bg-gradient-to-r from-orange-500 via-red-400 to-orange-400 bg-clip-text text-transparent  px-5 rounded-full">Talkit</h1>
        </div>
          <SidebarGroupContent>
            <SidebarMenu className="p-4 space-y-2">
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton className="font-pt space-x-2" asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span className="font-normal">{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarFooter className="p-4">
              <Button variant={"ghost"} className="text-left w-fit"><LogOut/> logout</Button>
        </SidebarFooter>
      </SidebarContent>
    </Sidebar>
  )
}