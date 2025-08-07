import { Calendar, Home, Inbox, Search, Settings , Bookmark ,CircleQuestionMark } from "lucide-react"
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

const items = [
  {
    title: "Dashboard",
    url: "#",
    icon: Home,
  },
  {
    title: "My Questions",
    url: "#",
    icon: CircleQuestionMark,
  },
  {
    title: "Active Chats",
    url: "#",
    icon: Inbox,
  },
  {
    title: "Bookmarks",
    url: "#",
    icon: Bookmark,
  },
  {
    title: "Settings",
    url: "#",
    icon: Settings,
  },
]

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent className="bg-white flex flex-col h-full justify-between">
        <SidebarGroup>
        <div>
          <h1 className="text-xl font-pt p-4 bg-gradient-to-r from-orange-500 via-red-400 to-orange-400 bg-clip-text text-transparent">Talkit</h1>
        </div>
          <SidebarGroupContent>
            <SidebarMenu className="p-4">
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarFooter className="flex flex-row items-center p-2">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div>
          <h1 className="capitalize font-pt">sudies fedlu</h1>
          <p className="font-pt text-gray-500 text-sm">sudiesfed@gmail.com</p>
        </div>
        </SidebarFooter>
      </SidebarContent>
    </Sidebar>
  )
}