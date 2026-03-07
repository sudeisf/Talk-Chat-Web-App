"use client";

import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const routeCommands = [
  { route: '/learner-dashboard', keywords: ['dashboard', 'home'] },
  { route: '/my-questions', keywords: ['my questions', 'questions', 'question'] },
  { route: '/chat', keywords: ['chat', 'chats', 'messages', 'inbox'] },
  { route: '/bookmarks', keywords: ['bookmark', 'bookmarks', 'saved'] },
  {
    route: '/notifications',
    keywords: ['notification', 'notifications', 'alerts'],
  },
  { route: '/settings', keywords: ['setting', 'settings', 'preferences'] },
  { route: '/profile', keywords: ['profile', 'account', 'me'] },
];

export function SearchBar({ className }: { className?: string }) {
  const router = useRouter();
  const [value, setValue] = useState('');

  const resolveRoute = (query: string): string | null => {
    const normalizedQuery = query.toLowerCase();
    const commandMatch = routeCommands.find((command) =>
      command.keywords.some((keyword) => normalizedQuery.includes(keyword))
    );
    return commandMatch?.route ?? null;
  };

  const handleSubmit = () => {
    const query = value.trim();
    if (!query) return;

    if (query.startsWith('/')) {
      router.push(query);
      return;
    }

    const tabRoute = resolveRoute(query);
    if (tabRoute) {
      router.push(tabRoute);
      return;
    }

    // Default to question search when command or route keywords do not match.
    router.push(`/my-questions?q=${encodeURIComponent(query)}`);
  };

  return (
    <div className={`relative w-[350px] ${className || ''}`}>
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        type="text"
        placeholder="Search questions, tabs, or type /route"
        value={value}
        onChange={(event) => setValue(event.target.value)}
        onKeyDown={(event) => {
          if (event.key === 'Enter') {
            event.preventDefault();
            handleSubmit();
          }
        }}
        className="pl-10 shadow-none border border-border/50 rounded-lg bg-background focus-visible:ring-2 focus-visible:ring-ring"
      />
    </div>
  );
}
