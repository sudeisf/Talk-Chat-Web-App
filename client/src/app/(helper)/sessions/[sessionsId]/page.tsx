'use client';

import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { BookOpen, MoreVertical, Mic, Play, Square } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';
import { MessageInput } from '@/components/helper/inputBox';

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
  type: 'text' | 'voice';
  sender: 'user' | 'other';
  timestamp: Date;
  avatar?: string;
  name: string;
  audioUrl?: string;
}

// simple emoji-only check
const isEmojiOnly = (text?: string) => {
  if (!text) return false;
  const trimmed = text.trim();
  if (!trimmed) return false;
  // remove all emoji characters and check if anything remains
  const emojiRegex =
    /[\p{Emoji_Presentation}\uFE0F\u200D\p{Extended_Pictographic}]/gu;
  const onlyEmoji = trimmed.replace(emojiRegex, '').trim().length === 0;
  return onlyEmoji;
};

export default function sessionBox() {
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  };

  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
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
        text: 'Great! For the frontend, you\'ll want to use Stripe Elements for secure card input. Let me walk you through creating a payment form component...',
        type: 'text',
        sender: 'user',
        timestamp: new Date(Date.now() - 120000),
        name: 'Instructor',
      },
    ]);
  }, []);

  const handleSendTextMessage = (text: string) => {
    if (!text.trim()) return;
    setMessages((prev) => [
      ...prev,
      {
        id: (prev.length + 1).toString(),
        text,
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
    <div className="flex rounded-lg border mt-4 mx-4 shadow-xs flex-col h-[calc(100vh-100px)]">
      {/* Message Header */}
      <div className="px-4 py-2 border-b rounded-t-lg border-gray-200 bg-white shrink-0">
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
              <div className="flex items-center gap-2 cursor-pointer hover:bg-gray-100 rounded-md p-2 -m-2 transition-colors">
                {/* <span className="text-sm text-gray-500">Field Experts:</span> */}
                <div className="flex -space-x-2">
                  {(currentSession?.participants || []).map(
                    (participant, index) => (
                      <Avatar
                        key={index}
                        className="h-6 w-6 border-2 border-white"
                      >
                        <AvatarImage
                          src={participant.avatar || '/placeholder.svg'}
                        />
                        <AvatarFallback className="bg-gray-200 text-black text-xs">
                          {participant.initials}
                        </AvatarFallback>
                      </Avatar>
                    )
                  )}
                </div>
                <span className="text-xs text-gray-500 ml-1">
                  {currentSession?.participants?.length || 4} helpers
                </span>
              </div>
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
                <div className="w-8 h-8 rounded-full bg-[#03624C] flex items-center justify-center flex-shrink-0">
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

          {/* Messages list as its own component */}
          <MessageList
            messages={messages}
            formatTime={formatTime}
            messagesEndRef={messagesEndRef}
          />
        </div>
      </ScrollArea>

      {/* Input Area */}
      <MessageInput
        onVoiceMessage={handleVoiceMessage}
        onSendText={handleSendTextMessage}
      />
    </div>
  );
}

/** Renders the whole messages list */
function MessageList({
  messages,
  formatTime,
  messagesEndRef,
}: {
  messages: Message[];
  formatTime: (d: Date) => string;
  messagesEndRef: React.RefObject<HTMLDivElement>;
}) {
  return (
    <>
      {messages.map((message) => (
        <ChatMessageRow
          key={message.id}
          message={message}
          formatTime={formatTime}
        />
      ))}
      <div ref={messagesEndRef} />
    </>
  );
}

/** Renders a single chat message row (avatar + bubble) */
function ChatMessageRow({
  message,
  formatTime,
}: {
  message: Message;
  formatTime: (d: Date) => string;
}) {
  return (
    <div
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
        {message.type === 'text' && (
          isEmojiOnly(message.text) && message.sender === 'user' ? (
            <div className="px-1 py-0.5">
              <p className="text-3xl leading-none">{message.text}</p>
            </div>
          ) : (
            <div
              className={cn(
                'rounded-lg px-4 py-2 max-w-md break-words',
                message.sender === 'user'
                  ? 'bg-[#03624C] text-white'
                  : 'bg-white text-black border border-gray-200'
              )}
            >
              <p className="text-sm leading-relaxed">{message.text}</p>
            </div>
          )
        )}

        {/* voice bubble */}
        {message.type === 'voice' && message.audioUrl && (
          <VoiceMessageBubble
            audioUrl={message.audioUrl}
            isUser={message.sender === 'user'}
          />
        )}

        <span className="text-xs text-gray-500 px-1">
          {formatTime(message.timestamp)}
        </span>
      </div>
    </div>
  );
}

// Compact card-style voice bubble: white rounded card, play + Instagram-style line visualizer
function VoiceMessageBubble({
  audioUrl,
  isUser,
}: {
  audioUrl: string;
  isUser: boolean;
}) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const togglePlayback = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) setCurrentTime(audioRef.current.currentTime);
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) setDuration(audioRef.current.duration);
  };

  const handleEnded = () => {
    setIsPlaying(false);
    setCurrentTime(0);
  };

  const formatTime = (secs: number) => {
    const s = Math.floor(secs % 60)
      .toString()
      .padStart(2, '0');
    const m = Math.floor(secs / 60)
      .toString()
      .padStart(2, '0');
    return `${m}:${s}`;
  };

  const timeLabel = formatTime(currentTime || duration || 0);
  const progress = duration > 0 ? currentTime / duration : 0;

  // heights pattern for bars (0–1)
  const barPattern = [
    0.2, 0.4, 0.7, 0.9, 0.8, 0.6, 0.35, 0.25,
    0.5, 0.85, 0.7, 0.55, 0.4, 0.3, 0.45, 0.65,
    0.7, 0.6, 0.45, 0.3, 0.2,
  ];

  return (
    <div className="flex items-end gap-2 max-w-md w-full">
      {/* small gray mic circle */}
      <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center mr-1">
        <Mic className="w-4 h-4 text-gray-700" />
      </div>

      {/* main pill */}
      <div className="flex items-center w-[280px] bg-white rounded-full shadow-xs border border-gray-200 px-4 py-3">
        {/* play button */}
        <button
          onClick={togglePlayback}
          className="w-8 h-8 rounded-full flex items-center justify-center bg-black text-white mr-3 flex-shrink-0"
          aria-label={isPlaying ? 'Pause voice message' : 'Play voice message'}
        >
          {isPlaying ? (
            <Square className="w-3.5 h-3.5 fill-current" />
          ) : (
            <Play className="w-3.5 h-3.5 fill-current ml-[1px]" />
          )}
        </button>

        {/* full-width line visualizer */}
        <div className="flex-1 h-7 flex items-center">
          <div className="w-full h-full flex items-center justify-between">
            {barPattern.map((v, idx) => {
              const played = idx / barPattern.length < progress;
              const color = played ? '#000000' : '#d4d4d8'; // black / gray-300
              const heightPct = 25 + v * 65; // 25–90%

              return (
                <div
                  key={idx}
                  style={{
                    width: 2,
                    borderRadius: 9999,
                    backgroundColor: color,
                    height: `${heightPct}%`,
                    minHeight: '20%',
                    transition: 'background-color 0.2s ease',
                  }}
                />
              );
            })}
          </div>
        </div>

        {/* optional time label on the very right; remove if you don't want it */}
        <span className="ml-3 text-[11px] text-gray-500">{timeLabel}</span>
      </div>

      <audio
        ref={audioRef}
        src={audioUrl}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleEnded}
        className="hidden"
      />
    </div>
  );
}
