"use client"

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { BookOpen, MoreVertical, Paperclip, Send } from "lucide-react"
import { useState, useEffect, useRef } from "react"
import { cn } from "@/lib/utils"
import { ScrollArea } from "@/components/ui/scroll-area"

const userInfo = {
  name: "Sudeis Fedlu",
  email: "sudeisfed@gmail.com",
  avatar: "https://github.com/shadcn.png",
  bio: "Passionate learner focused on mastering programming and technology. Always eager to explore new concepts and improve my skills.",
  location: "Addis Ababa, Ethiopia",
  role: "Software engineer",
  username: "sudeisfed",
  phone: "+251 912 345 678",
  coverImage: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1925&q=80",
  skills: [
    "React", "Typescript", "python", "ML", "Tailwindcss", "NodeJs"
  ],
  sessionsJoined: 24,
  ongoingSessions: 3,
  bookmarksSaved: 18,
  totalQuestions: 30,
  level: 8,
  experience: 1250,
  correctAnswers: 200
}

const currentSession = {
  title: "How to integrate payment gateway in React?",
  category: ["Js", "React", "Typescript"],
  description:
    "I'm building an e-commerce application and need to implement secure payment processing. Looking for guidance on best practices for Stripe integration, handling payment flows, and managing transaction security in a React frontend.",
  participants: [
    {
      avatar: "https://github.com/shadcn.png",
      initials: "F"
    },
    {
      avatar: "https://github.com/adam-p.png",
      initials: "A"
    },
    {
      avatar: "https://github.com/mdo.png",
      initials: "M"
    },
    {
      avatar: "https://github.com/torvalds.png",
      initials: "L"
    },
    {
      avatar: "https://ui-avatars.com/api/?name=JS",
      initials: "J"
    },
    {
      avatar: "https://ui-avatars.com/api/?name=RK",
      initials: "R"
    }
  ]
};

interface Message {
  id: string
  text: string
  sender: "user" | "other"
  timestamp: Date
  avatar?: string
  name: string
}

export default function ChatBox() {
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    })
  }

  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hi! I'm trying to integrate Stripe payment gateway in my React app. Can you help me understand the best approach?",
      sender: "other",
      timestamp: new Date(Date.now() - 300000),
      name: "Alex Johnson",
    },
    {
      id: "2",
      text: "Let's start with the basics. First, you'll need to install the Stripe SDK and set up your API keys. Have you created a Stripe account yet?",
      sender: "user",
      timestamp: new Date(Date.now() - 240000),
      name: "Instructor",
    },
    {
      id: "3",
      text: "Yes, I have the account set up. I'm just not sure about the frontend implementation and how to handle the payment flow securely.",
      sender: "other",
      timestamp: new Date(Date.now() - 180000),
      name: "Alex Johnson",
    },
    {
      id: "4",
      text: "Great! For the frontend, you'll want to use Stripe Elements for secure card input. Let me walk you through creating a payment form component...",
      sender: "user",
      timestamp: new Date(Date.now() - 120000),
      name: "Instructor",
    },
  ])

  const [newMessage, setNewMessage] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const handleSendMessage = () => {
    if (!newMessage.trim()) return
    setMessages(prev => [
      ...prev,
      {
        id: (prev.length + 1).toString(),
        text: newMessage,
        sender: "user",
        timestamp: new Date(),
        name: "Instructor"
      }
    ])
    setNewMessage("")
  }

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  return (
    <div className="flex flex-col h-full">
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
                {currentSession?.title || "How to integrate payment gateway in React?"}
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
              {(currentSession?.participants || []).map((participant, index) => (
                <Avatar key={index} className="h-6 w-6 border-2 border-white">
                  <AvatarImage src={participant.avatar || "/placeholder.svg"} />
                  <AvatarFallback className="bg-gray-200 text-black text-xs">{participant.initials}</AvatarFallback>
                </Avatar>
              ))}
            </div>
            <span className="text-xs text-gray-500 ml-1">{currentSession?.participants?.length || 4} helpers</span>
          </div>
        </div>
         </div>
        </div>

       
      </div>

      {/* Message Area */}
     <ScrollArea className="h-[500px]">
     <div className="flex-1 p-4 space-y-4 bg-gray-50 overflow-y-auto" style={{ scrollBehavior: 'smooth' }}>
        {currentSession?.description && (
          <div className="bg-white border border-gray-200 rounded-lg p-4 mb-6">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-black flex items-center justify-center flex-shrink-0">
                <BookOpen className="h-4 w-4 text-white" />
              </div>
              <div>
                <h4 className="font-medium text-black mb-2">Question Description</h4>
                <p className="text-sm text-gray-600 leading-relaxed">{currentSession.description}</p>
              </div>
            </div>
          </div>
        )}

        {messages.map((message) => (
          <div
            key={message.id}
            className={cn("flex gap-3 max-w-[80%]", message.sender === "user" ? "ml-auto flex-row-reverse" : "")}
          >
            <Avatar className="h-8 w-8 flex-shrink-0">
              <AvatarImage
                src={
                  message.sender === "user"
                    ? "/placeholder.svg?height=32&width=32&query=user avatar"
                    : "/placeholder.svg?height=32&width=32&query=professional woman avatar"
                }
              />
              <AvatarFallback className="bg-gray-200 text-black text-xs">
                {message.sender === "user" ? "YU" : "SC"}
              </AvatarFallback>
            </Avatar>

            <div className={cn("flex flex-col gap-1", message.sender === "user" ? "items-end" : "items-start")}>
              <div
                className={cn(
                  "rounded-lg px-4 py-2 max-w-md break-words",
                  message.sender === "user" ? "bg-black text-white" : "bg-white text-black border border-gray-200",
                )}
              >
                <p className="text-sm leading-relaxed">{message.text}</p>
              </div>
              <span className="text-xs text-gray-500 px-1">{formatTime(message.timestamp)}</span>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
     </ScrollArea>

      {/* Input Area */}
      <div className="p-4 border-t border-gray-200 bg-white dark:bg-gray-800 shrink-0">
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="flex-shrink-0 hover:bg-gray-100 dark:hover:bg-gray-700"
            title="Attach file"
          >
            <Paperclip className="h-5 w-5 text-black dark:text-white" />
          </Button>

          <div className="relative flex-1">
            <textarea
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type your message…"
              className="w-full bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-black dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-300 rounded-2xl px-4 py-3 pr-12 shadow-sm resize-none focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition-all duration-150"
              rows={1}
              style={{ minHeight: 44, maxHeight: 120, overflowY: "auto" }}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault()
                  handleSendMessage()
                }
              }}
            />
          </div>

          <Button
            onClick={handleSendMessage}
            disabled={!newMessage.trim()}
            className="flex-shrink-0 bg-black hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-300 text-white px-4 py-2 rounded-2xl transition-all"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}