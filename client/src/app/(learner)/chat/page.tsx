"use client";

import { MessageCircle } from "lucide-react";

export default function DefaultInterfaceForChat() {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center px-4">
      <div className="flex flex-col items-center gap-4 max-w-md mx-auto">
        <div className="p-6 bg-gradient-to-r from-orange-500 via-red-400 to-orange-400 rounded-full shadow-none">
          <MessageCircle className="w-10 h-10 text-white" />
        </div>

        <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-500 via-red-500 to-orange-400 bg-clip-text text-transparent">
          Welcome to your chat space
        </h1>

        <p className="text-gray-500 text-md">
          Choose a conversation from the sidebar to start chatting.  
          If you don’t see any, create a new one and start connecting 
        </p>

        <button className="px-4 py-2 mt-2 rounded-sm bg-orange-500 text-white font-medium hover:bg-orange-600 transition-all shadow-md">
          Ask and Start Session
        </button>
      </div>
    </div>
  );
}
