'use client';

import { Dot } from 'lucide-react';
import { ScrollArea } from '../ui/scroll-area';
import ChatTabs from './chatTabs';
import SearchSessions from './sessionSearch';
import { useRouter } from 'next/navigation';

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

export default function ChatList() {
  const router = useRouter();
  return (
    <div className="w-[30%] border-r h-full">
      <div className="px-4 py-2 border-b">
        <h1 className="text-lg font-medium mb-4">Learning Sessions</h1>
        <SearchSessions />
      </div>
      <ChatTabs />
      <ScrollArea className="h-[calc(100vh-195px)]">
        {ConvoList.map((convo, index) => {
          return (
            <div
              onClick={() => router.push('/chat/1')}
              key={`convo-${index}`}
              className={`p-4 flex flex-col gap-2 border-b ${convo.Active ? 'bg-gray-50' : ''}`}
            >
              <div className="flex justify-between">
                <div className="flex gap-2">
                  {convo.tags.slice(0, 2).map((tag, index) => (
                    <span
                      key={`tag-${index}`}
                      className="bg-orange-500/5 text-orange-600 text-sm px-2 rounded-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <p className="text-xs text-gray-500">{convo.Date}</p>
              </div>
              <h1 className="text-md">{convo.title}</h1>
              <div className="truncate text-sm w-full flex items-center justify-between text-gray-600">
                {convo.lastMessage}{' '}
                <Dot className="w-10 h-10 strock-orange-500" />
              </div>
            </div>
          );
        })}
      </ScrollArea>
    </div>
  );
}
