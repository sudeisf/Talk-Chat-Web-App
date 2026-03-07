'use client';

import { Dot } from 'lucide-react';
import { ScrollArea } from '../ui/scroll-area';
import SearchSessions from './sessionsSearch';
import { useRouter } from 'next/navigation';
import SessionTabs from './sessionTabs';

const ConvoList = [
  {
    title: 'How to integrate payment gateway in React?',
    lastMessage: 'Thanks for the detailed explanation...',
    Date: '2h ago',
    tags: ['Js', 'Stripe'],
    Active: true,
  },
  {
    title: 'Best practices for structuring a Next.js project',
    lastMessage: 'Folder-by-feature seems cleaner for me too.',
    Date: '5h ago',
    tags: ['Next.js', 'Architecture'],
  },
  {
    title: 'Django vs Laravel for e-commerce backend?',
    lastMessage: 'I think Django is more scalable long term.',
    Date: '1d ago',
    tags: ['Django', 'Laravel', 'Backend'],
  },
  {
    title: 'Optimizing MongoDB queries in MERN stack',
    lastMessage: 'Use indexes on frequently queried fields.',
    Date: '3d ago',
    tags: ['MongoDB', 'MERN'],
  },
  {
    title: 'How to set up WebSocket with Next.js?',
    lastMessage: 'Socket.io with a custom server worked perfectly.',
    Date: '5d ago',
    tags: ['Next.js', 'WebSockets', 'Real-time'],
  },
  {
    title: 'State management: Redux Toolkit vs React Query',
    lastMessage: 'I usually mix them: Redux for UI, Query for data.',
    Date: '1w ago',
    tags: ['React', 'Redux', 'React Query'],
  },
];

export default function SessionsList() {
  const router = useRouter();
  return (
    <div className="w-[35%] px-2  m-4 h-[calc(100vh-100px)] overflow-hidden">
      <div className="py-2 ">
        <h1 className="text-lg font-medium mb-4">Sessions</h1>
        <SearchSessions />
      </div>
      <SessionTabs />
      <ScrollArea className="h-[calc(100vh-195px)] border border-border rounded-lg mt-4 bg-background">
        {ConvoList.map((convo, index) => {
          return (
            <div
              onClick={() => router.push('/sessions/1')}
              key={`convo-${index}`}
              className={`p-4 flex cursor-pointer flex-col gap-2 border-b border-border transition-colors ${
                convo.Active
                  ? 'bg-card dark:bg-neutral-900/90 border-l-2 border-l-[#03624C]'
                  : 'bg-background hover:bg-muted/40'
              }`}
            >
              <div className="flex justify-between">
                <div className="flex gap-2">
                  {convo.tags.slice(0, 2).map((tag, index) => (
                    <span
                      key={`tag-${index}`}
                      className="bg-[#03624C]/12 text-[#03624C] text-sm px-2 rounded-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground">{convo.Date}</p>
              </div>
              <h1 className="text-md text-foreground">{convo.title}</h1>
              <div className="truncate text-sm w-full flex items-center justify-between text-muted-foreground">
                {convo.lastMessage}{' '}
                <Dot className="w-8 h-8 text-muted-foreground" />
              </div>
            </div>
          );
        })}
      </ScrollArea>
    </div>
  );
}
