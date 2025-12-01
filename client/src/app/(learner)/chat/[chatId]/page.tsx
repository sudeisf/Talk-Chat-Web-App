'use client';

import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { BookOpen, MoreVertical } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';
import { MessageInput } from '@/components/helper/inputBox';
import Memebers from '@/components/learner/Memebers';

const userInfo = {
  name: 'Sudeis Fedlu',
  email: 'sudeisfed@gmail.com',
  avatar: 'https://github.com/shadcn.png',
  bio: 'Passionate learner focused on mastering programming and technology. Always eager to explore new concepts and improve my skills.',
  location: 'Addis Ababa, Ethiopia',
  role: 'Software engineer',
  username: 'sudeisfed',
  phone: '+251 912 345 678',
  coverImage:
    'https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1925&q=80',
  skills: ['React', 'Typescript', 'python', 'ML', 'Tailwindcss', 'NodeJs'],
  sessionsJoined: 24,
  ongoingSessions: 3,
  bookmarksSaved: 18,
  totalQuestions: 30,
  level: 8,
  experience: 1250,
  correctAnswers: 200,
};

const currentSession = {
  title: 'How to integrate payment gateway in React?',
  category: ['Js', 'React', 'Typescript'],
  description:
    "I'm building an e-commerce application and need to implement secure payment processing. Looking for guidance on best practices for Stripe integration, handling payment flows, and managing transaction security in a React frontend.",
  participants: [
    {
      avatar: 'https://github.com/shadcn.png',
      initials: 'F',
    },
    {
      avatar: 'https://github.com/adam-p.png',
      initials: 'A',
    },
    {
      avatar: 'https://github.com/mdo.png',
      initials: 'M',
    },
    {
      avatar: 'https://github.com/torvalds.png',
      initials: 'L',
    },
    {
      avatar: 'https://ui-avatars.com/api/?name=JS',
      initials: 'J',
    },
    {
      avatar: 'https://ui-avatars.com/api/?name=RK',
      initials: 'R',
    },
  ],
};

interface Message {
  id: string;
  text?: string;
  type?: 'text' | 'voice'; // optional for backward compat
  sender: 'user' | 'other';
  timestamp: Date;
  avatar?: string;
  name: string;
  audioUrl?: string;
}

// helper: true if text is only emojis (no letters/digits)
const isEmojiOnly = (text?: string) => {
  if (!text) return false;
  const trimmed = text.trim();
  if (!trimmed) return false;
  const emojiRegex =
    /[\p{Emoji_Presentation}\uFE0F\u200D\p{Extended_Pictographic}]/gu;
  const withoutEmoji = trimmed.replace(emojiRegex, '').trim();
  return withoutEmoji.length === 0;
};

export default function ChatBox() {
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  };

  const [messages, setMessages] = useState<Message[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Set initial messages on client side only
    setMessages([
      {
        id: '1',
        text: "Hi! I'm trying to integrate Stripe payment gateway in my React app. Can you help me understand the best approach?",
        type: 'text',
        sender: 'other',
        timestamp: new Date(Date.now() - 300000),
        name: 'Alex Johnson',
      },
      {
        id: '2',
        text: "Let's start with the basics. First, you'll need to install the Stripe SDK and set up your API keys. Have you created a Stripe account yet?",
        type: 'text',
        sender: 'user',
        timestamp: new Date(Date.now() - 240000),
        name: 'Instructor',
      },
      {
        id: '3',
        text: "Yes, I have the account set up. I'm just not sure about the frontend implementation and how to handle the payment flow securely.",
        type: 'text',
        sender: 'other',
        timestamp: new Date(Date.now() - 180000),
        name: 'Alex Johnson',
      },
      {
        id: '4',
        text: "Great! For the frontend, you'll want to use Stripe Elements for secure card input. Let me walk you through creating a payment form component...",
        type: 'text',
        sender: 'user',
        timestamp: new Date(Date.now() - 120000),
        name: 'Instructor',
      },
    ]);
  }, []);

  const handleSendTextMessage = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;
    setMessages((prev) => [
      ...prev,
      {
        id: (prev.length + 1).toString(),
        text: trimmed,
        type: 'text',
        sender: 'user',
        timestamp: new Date(),
        name: 'Instructor',
      },
    ]);
  };

  const handleVoiceMessage = (audioBlob: Blob) => {
    const url = URL.createObjectURL(audioBlob);
    setMessages((prev) => [
      ...prev,
      {
        id: (prev.length + 1).toString(),
        type: 'voice',
        sender: 'user',
        timestamp: new Date(),
        name: 'Instructor',
        audioUrl: url,
      },
    ]);
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="flex rounded-lg border mt-2 mx-4 shadow-xs flex-col h-[calc(96vh-50px)]">
      {/* Message Header */}
      <div className="px-4 py-2 border-b border-gray-200 bg-white shrink-0">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Avatar className="w-15 h-15 border-8 border-white">
              <AvatarImage src={userInfo.avatar} />
              <AvatarFallback>{userInfo.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="space-y-2">
              <h2 className="font-medium text-md font-sans text-black">
                {currentSession?.title ||
                  'How to integrate payment gateway in React?'}
              </h2>
              <div className="flex flex-wrap gap-2">
                {currentSession?.category.map((cat, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-xs rounded-full"
                  >
                    {cat}
                  </span>
                ))}
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-end items-end">
            <Button variant="ghost" size="icon" className="hover:bg-gray-100">
              <MoreVertical className="h-5 w-5 text-black" />
            </Button>
            <div className="space-y-3">
              <Memebers participants={currentSession?.participants} />
            </div>
          </div>
        </div>
      </div>

      {/* Message Area */}
      <ScrollArea className="flex-1 min-h-[400px] max-h-[calc(100vh-212px)]">
        <div
          className="flex-1 p-4 space-y-4 bg-gray-50 overflow-y-auto"
          style={{ scrollBehavior: 'smooth' }}
        >
          {currentSession?.description && (
            <div className="bg-white border border-gray-200 rounded-lg p-4 mb-6">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-[#03624c] flex items-center justify-center flex-shrink-0">
                  <BookOpen className="h-4 w-4 text-white" />
                </div>
                <div>
                  <h4 className="font-medium text-black mb-2">
                    Question Description
                  </h4>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {currentSession.description}
                  </p>
                </div>
              </div>
            </div>
          )}

          {messages.map((message) => (
            <div
              key={message.id}
              className={cn(
                'flex gap-3 max-w-[80%]',
                message.sender === 'user' ? 'ml-auto flex-row-reverse' : ''
              )}
            >
              <Avatar className="h-8 w-8 flex-shrink-0">
                <AvatarImage
                  src={
                    message.sender === 'user'
                      ? '/placeholder.svg?height=32&width=32&query=user avatar'
                      : '/placeholder.svg?height=32&width=32&query=professional woman avatar'
                  }
                />
                <AvatarFallback className="bg-gray-200 text-black text-xs">
                  {message.sender === 'user' ? 'YU' : 'SC'}
                </AvatarFallback>
              </Avatar>

              <div
                className={cn(
                  'flex flex-col gap-1',
                  message.sender === 'user' ? 'items-end' : 'items-start'
                )}
              >
                {/* text bubble */}
                {(!message.type || message.type === 'text') && (
                  isEmojiOnly(message.text) && message.sender === 'user' ? (
                    // emoji-only: no green background, just big emoji
                    <div className="px-1 py-0.5">
                      <p className="text-3xl leading-none">{message.text}</p>
                    </div>
                  ) : (
                    // normal bubble
                    <div
                      className={cn(
                        'rounded-lg px-4 py-2 max-w-md break-words',
                        message.sender === 'user'
                          ? 'bg-[#03624c] text-white'
                          : 'bg-white text-black border border-gray-200'
                      )}
                    >
                      <p className="text-sm leading-relaxed">{message.text}</p>
                    </div>
                  )
                )}

                {/* voice bubble */}
                {message.type === 'voice' && message.audioUrl && (
                  <audio controls src={message.audioUrl} className="w-48">
                    Your browser does not support the audio element.
                  </audio>
                )}

                <span className="text-xs text-gray-500 px-1">
                  {formatTime(message.timestamp)}
                </span>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>

      <MessageInput
        onVoiceMessage={handleVoiceMessage}
        onSendText={handleSendTextMessage}
      />
    </div>
  );
}
