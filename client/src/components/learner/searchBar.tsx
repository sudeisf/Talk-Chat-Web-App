"use client";

import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useRef, useState } from 'react';

const routeCommands = [
  {
    label: 'Dashboard',
    description: 'Go to learner dashboard',
    route: '/learner-dashboard',
    keywords: ['dashboard', 'home'],
  },
  {
    label: 'My Questions',
    description: 'Open your posted questions',
    route: '/my-questions',
    keywords: ['my questions', 'questions', 'question'],
  },
  {
    label: 'Chat',
    description: 'Open active chat sessions',
    route: '/chat',
    keywords: ['chat', 'chats', 'messages', 'inbox'],
  },
  {
    label: 'Bookmarks',
    description: 'View saved questions',
    route: '/bookmarks',
    keywords: ['bookmark', 'bookmarks', 'saved'],
  },
  {
    label: 'Notifications',
    description: 'View your notifications',
    route: '/notifications',
    keywords: ['notification', 'notifications', 'alerts'],
  },
  {
    label: 'Settings',
    description: 'Manage your account settings',
    route: '/settings',
    keywords: ['setting', 'settings', 'preferences'],
  },
  {
    label: 'Profile',
    description: 'Open your learner profile',
    route: '/profile',
    keywords: ['profile', 'account', 'me'],
  },
];

export function SearchBar({ className }: { className?: string }) {
  const router = useRouter();
  const [value, setValue] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement | null>(null);

  const trimmedQuery = value.trim();

  const filteredQuickActions = useMemo(() => {
    const query = trimmedQuery.toLowerCase();
    if (!query) return routeCommands;

    return routeCommands.filter((command) => {
      const inKeywords = command.keywords.some((keyword) => query.includes(keyword));
      const inLabel = command.label.toLowerCase().includes(query);
      const inDescription = command.description.toLowerCase().includes(query);
      const inRoute = command.route.toLowerCase().includes(query);
      return inKeywords || inLabel || inDescription || inRoute;
    });
  }, [trimmedQuery]);

  const resolveRoute = (query: string): string | null => {
    const normalizedQuery = query.toLowerCase();
    const commandMatch = routeCommands.find((command) =>
      command.keywords.some((keyword) => normalizedQuery.includes(keyword))
    );
    return commandMatch?.route ?? null;
  };

  const navigateAndCloseSearch = (url: string) => {
    router.push(url);
    setIsSearchOpen(false);
  };

  const handleSubmit = () => {
    const query = value.trim();
    if (!query) return;

    if (query.startsWith('/')) {
      navigateAndCloseSearch(query);
      return;
    }

    const tabRoute = resolveRoute(query);
    if (tabRoute) {
      navigateAndCloseSearch(tabRoute);
      return;
    }

    // Default to question search when command or route keywords do not match.
    navigateAndCloseSearch(`/my-questions?q=${encodeURIComponent(query)}`);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!searchContainerRef.current) return;
      if (searchContainerRef.current.contains(event.target as Node)) return;
      setIsSearchOpen(false);
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div ref={searchContainerRef} className={`relative w-[350px] ${className || ''}`}>
      <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        type="text"
        placeholder="Search questions, tabs, or type /route"
        value={value}
        onChange={(event) => {
          setValue(event.target.value);
          setIsSearchOpen(true);
        }}
        onFocus={() => setIsSearchOpen(true)}
        onClick={() => setIsSearchOpen(true)}
        onKeyDown={(event) => {
          if (event.key === 'Enter') {
            event.preventDefault();
            handleSubmit();
          }
          if (event.key === 'Escape') {
            setIsSearchOpen(false);
          }
        }}
        className="pl-10 shadow-none border border-border/50 rounded-lg bg-background focus-visible:ring-2 focus-visible:ring-ring"
      />

      {isSearchOpen && (
        <div className="absolute top-full mt-2 w-full rounded-md border border-border bg-popover text-popover-foreground shadow-md z-50 overflow-hidden">
          {filteredQuickActions.slice(0, 5).map((action) => (
            <button
              key={action.route}
              type="button"
              onClick={() => navigateAndCloseSearch(action.route)}
              className="w-full px-3 py-2 text-left hover:bg-accent transition-colors"
            >
              <p className="text-sm font-medium">{action.label}</p>
              <p className="text-xs text-muted-foreground">{action.description}</p>
            </button>
          ))}

          {trimmedQuery && (
            <button
              type="button"
              onClick={() =>
                navigateAndCloseSearch(`/my-questions?q=${encodeURIComponent(trimmedQuery)}`)
              }
              className="w-full border-t border-border px-3 py-2 text-left hover:bg-accent transition-colors"
            >
              <p className="text-sm font-medium">Search questions for "{trimmedQuery}"</p>
              <p className="text-xs text-muted-foreground">Open learner question results</p>
            </button>
          )}
        </div>
      )}
    </div>
  );
}
