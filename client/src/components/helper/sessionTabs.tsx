'use client';

import { Archive, BookOpen, Star, User } from 'lucide-react';
import { Button } from '../ui/button';

const tabs = [
  {
    title: 'Active ',
    icon: BookOpen,
    count: 3,
    active: true,
  },
  {
    title: 'All ',
    icon: User,
    count: 5,
    active: false,
  },
  {
    title: 'Favorites',
    icon: Star,
    count: 0,
    active: false,
  },
  {
    title: 'Archived',
    icon: Archive,
    count: 0,
    active: false,
  },
];

export default function SessionTabs() {
  return (
    <div
      className="flex border rounded-lg mt-4 overflow-x-auto items-center gap-4 border-b px-2"
      style={{
        scrollbarWidth: 'none',
        msOverflowStyle: 'none',
      }}
    >
      <style jsx>{`
        div::-webkit-scrollbar {
          display: none;
        }
      `}</style>
      {tabs.map((tab, index) => {
        const Icon = tab.icon;
        return (
          <Button
            key={`tab-${index}`}
            variant="ghost"
            className={`relative flex items-center gap-2 rounded-none border-b-2 px-4 py-3 text-sm font-medium transition-colors
              ${
                tab.active
                  ? 'border-[#03624C] text-[#03624C]'
                  : 'border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300'
              }`}
          >
            <Icon className="w-5 h-5" />
            {tab.title}
            {tab.count > 0 && (
              <span
                className={`ml-1 rounded-full px-2 py-0.5 text-xs font-medium ${
                  tab.active
                    ? 'bg-[#03624C]/10 text-[#03624C]'
                    : 'bg-gray-200 text-gray-700'
                }`}
              >
                {tab.count}
              </span>
            )}
          </Button>
        );
      })}
    </div>
  );
}
