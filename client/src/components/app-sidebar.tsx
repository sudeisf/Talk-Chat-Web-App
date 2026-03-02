'use client';

import {
  Home,
  Inbox,
  Bookmark,
  CircleQuestionMark,
  LogOut,
  Bell,
  Settings,
} from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import logo from './../../public/svg/logo.svg';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { logoutUser } from '@/lib/api/authApi';
import { useAppDispatch } from '@/redux/hooks';
import { action as authAction } from '@/redux/slice/authSlice';
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
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    if (isLoggingOut) return;

    setIsLoggingOut(true);
    try {
      await logoutUser();
      dispatch(authAction.clearAuth());
      dispatch(authAction.clearEmail());
      router.replace('/login');
      router.refresh();
    } catch (error) {
      console.error('Logout failed', error);
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <Sidebar>
      <SidebarContent className="bg-sidebar text-sidebar-foreground flex h-full flex-col justify-between">
        <SidebarGroup>
          <div className="flex p-2 gap-2 pl-6">
            <Image
              src={logo}
              alt=""
              width={25}
              height={25}
              className="dark:brightness-0 dark:invert"
            />
            <h1 className="text-lg font-pt text-sidebar-foreground rounded-full">
              Talkit
            </h1>
          </div>
          <SidebarGroupContent>
            <SidebarMenu className="p-4 space-y-2 mt-4">
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton className="font-pt space-x-2" asChild>
                    <Link href={item.url}>
                      <item.icon />
                      <span className="font-normal">{item.title}</span>
                    </Link>
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
          <button
            type="button"
            onClick={handleLogout}
            disabled={isLoggingOut}
            className="flex items-center font-pt font-medium gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            <LogOut className="w-4 h-4" />
            {isLoggingOut ? 'logging out...' : 'logout'}
          </button>
        </SidebarFooter>
      </SidebarContent>
    </Sidebar>
  );
}
