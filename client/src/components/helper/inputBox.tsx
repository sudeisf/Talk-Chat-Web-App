"use client"

import { useState } from "react"
import { Smile, Paperclip, Mic, Send } from "lucide-react"
import { Button } from "@/components/ui/button"

export function MessageInput() {
  const [message, setMessage] = useState("")

  return (
    <div className="w-full max-w-full mx-auto p-4">
      <div className="relative flex items-center gap-2 bg-muted/50 rounded-lg px-4 py-3 border border-border">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type something to send"
          className="flex-1 bg-transparent border-none outline-none text-sm placeholder:text-muted-foreground"
        />
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full hover:bg-muted">
            <Smile className="h-5 w-5 text-muted-foreground" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full hover:bg-muted">
            <Paperclip className="h-5 w-5 text-muted-foreground" />
          </Button>
          {message.trim() ? (
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-full hover:bg-muted"
              onClick={() => {
                console.log("Sending message:", message)
                setMessage("")
              }}
            >
              <Send className="h-5 w-5 text-primary" />
            </Button>
          ) : (
            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full hover:bg-muted">
              <Mic className="h-5 w-5 text-muted-foreground" />
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
