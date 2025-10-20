'use client';
import Link from 'next/link';
import Logo from '../../../public/svg/logo.svg';
import Image from 'next/image';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { SearchBar } from '../learner/searchBar';
import { Bell, NotebookTabsIcon, Search, Settings } from 'lucide-react';
import { Input } from '../ui/input';

const Pages = [
  {
    name: 'dashboard',
    url: '/dashboard',
  },
  {
    name: 'questions',
    url: '/questions',
  },
  {
    name: 'sessions',
    url: '/sessions',
  },
];

const userInfo = {
  name: 'sudeis',
  avatar: 'https://github.com/shadcn.png',
};

export default function Navbar() {
  return (
    <nav className="flex  justify-between px-4 py-2 ">
      <div className="flex items-center gap-2 ">
        <div className="flex gap-2 items-center">
          <Image alt="Logo" src={Logo} className="w-7 h-7" />
          <p className="font-plus-jakarta capitalize text-md">Talkit</p>
        </div>
      </div>

      <div className="flex gap-8 px-2 font-main capitalize text-md items-center  text-gray-600 ">
        {Pages.map((page, index) => (
          <Link key={`dash-${index}`} href={page.url}>
            {page.name}
          </Link>
        ))}
      </div>

      <div className="flex items-center justify-center gap-2">
        <div className={`relative max-w-64  `}>
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search..."
            className="pl-10 shadow-none border border-border/80 rounded-lg bg-background focus-visible:ring-0 focus-visible:ring-ring"
          />
        </div>

        <div className="flex gap-4 items-center">
          <Link href={'/helper-notfications'}>
            <Bell className="w-5 h-5 text-gray-500" />
          </Link>
          <Link href={'/helper-profile'}>
            <Avatar className="w-7 h-7">
              <AvatarImage src={userInfo.avatar} />
              <AvatarFallback>{userInfo.name.charAt(0)}</AvatarFallback>
            </Avatar>
          </Link>
        </div>
      </div>
    </nav>
  );
}
