import ChatList from "@/components/learner/conversationList";


export default function ChatLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {


  return (
    <div className="flex bg-background ">
      <ChatList/>
      <div className="flex flex-col  w-full">
            {children}
      </div>
    </div>
  );
}
