import {
  Calendar,
  Home,
  Inbox,
  Search,
  Bookmark,
  CircleQuestionMark,
  LogOut,
  Ghost,
  Bell,
  Settings,
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
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
} from '@/components/ui/sidebar';
import { Button } from './ui/button';
import logo from './../../public/svg/logo.svg';
import Image from 'next/image';
import Link from 'next/link';
const items = [
  {
    title: 'Dashboard',
    url: '/learner-dashboard',
    icon: Home,
  },
  {
    title: 'My Questions',
    url: '/my-questions',
    icon: CircleQuestionMark,
  },
  {
    title: 'Active Chats',
    url: '/chat',
    icon: Inbox,
  },
  {
    title: 'Notifications',
    url: '/notifications',
    icon: Bell,
  },
  {
    title: 'Bookmarks',
    url: '/bookmarks',
    icon: Bookmark,
  },
];

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent className="bg-white flex flex-col h-full justify-between">
        <SidebarGroup>
          <div className="flex p-2 gap-2 pl-6">
            <Image src={logo} alt="" width={30} height={30} />
            <h1 className="text-2xl font-pt bg-gradient-to-r from-orange-500 via-red-400 to-orange-400 bg-clip-text text-transparent  rounded-full">
              Talkit
            </h1>
          </div>
          <SidebarGroupContent>
            <SidebarMenu className="p-4 space-y-2 mt-4">
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
        <SidebarFooter className="p-6 ml-2">
          <Link className="flex items-center gap-2" href={'/settings'}>
            <Settings className="w-4 h-4" />
            Settings
          </Link>
          <button className="flex items-center font-pt font-medium gap-2">
            <LogOut className="w-4 h-4" /> logout
          </button>
        </SidebarFooter>
      </SidebarContent>
    </Sidebar>
  );
}
