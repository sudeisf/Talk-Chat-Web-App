import { MoreVertical } from "lucide-react";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";

type MemberStatus = "online" | "offline";

interface Member {
  name: string;
  avatar: string;
  status: MemberStatus;
  role?: string;
}

const members: Member[] = [
    {
        name: "Melisa Smith",
        avatar: "https://randomuser.me/api/portraits/women/1.jpg",
        role :"principal software engineer",
        status: "online",
    },
    {
        name: "Kirstin Riddle",
        avatar: "https://randomuser.me/api/portraits/women/2.jpg",
        role :"cloud software engineer",
        status: "online",
    },
    {
        name: "Thomas Edison",
        avatar: "https://randomuser.me/api/portraits/men/3.jpg",
          role :"cloud software engineer",
        status: "online",
    },
    {
        name: "Linzi Coulson",
        avatar: "https://randomuser.me/api/portraits/women/4.jpg",
          role :"cloud software engineer",
        status: "online",
    },
    {
        name: "Amelie Heaton",
        avatar: "https://randomuser.me/api/portraits/women/5.jpg",
          role :"cloud software engineer",
        status: "offline",
    },
    {
        name: "Tom Hardy",
        avatar: "https://randomuser.me/api/portraits/men/6.jpg",
          role :"cloud software engineer",
        status: "offline",
    },
    {
        name: "Norah Griffith",
        avatar: "https://randomuser.me/api/portraits/women/7.jpg",
          role :"cloud software engineer",
        status: "offline",
    },
    {
        name: "Michael Clarkson",
        avatar: "https://randomuser.me/api/portraits/men/8.jpg",
          role :"cloud software engineer",
        status: "offline",
    },
];

function StatusDot({ status }: { status: MemberStatus }) {
  const color = status === "online" ? "bg-green-500" : "bg-gray-400";
  return <span className={`inline-block w-2 h-2 rounded-full ${color}`} />;
}

interface Participant {
  avatar?: string;
  initials: string;
}

export default function Memebers({
  participants = [],
}: {
  participants?: Participant[];
}) {
  const onlineMembers = members.filter((m) => m.status === "online");
  const offlineMembers = members.filter((m) => m.status === "offline");

  const renderSection = (
    title: string,
    status: MemberStatus,
    list: Member[]
  ) => (
    <div className="mt-4">
      <div className="flex items-center gap-2 text-[11px] font-semibold tracking-[0.08em] text-gray-500 uppercase mb-2">
        <StatusDot status={status} />
        <span>{title}</span>
      </div>
      <div className="space-y-3">
        {list.map((member) => (
          <div key={member.name} className="flex items-center gap-3">
            <img
              src={member.avatar}
              alt={member.name}
              className="w-8 h-8 rounded-full object-cover"
            />
            <div className="flex flex-col gap-2">
              <span className="text-md font-medium text-gray-900">
                {member.name}
              </span>
              <span className="text-sm text-gray-500">{member.role}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <Sheet>
      <SheetTrigger asChild>
        <button className="flex items-center gap-1 rounded-full px-1 py-0.5 hover:bg-gray-100">
          <div className="flex -space-x-2">
            {participants.slice(0, 4).map((participant, index) => (
              <Avatar
                key={index}
                className="h-6 w-6 border-[1.5px] border-white"
              >
                <AvatarImage
                  src={participant.avatar || "/placeholder.svg"}
                />
                <AvatarFallback className="bg-gray-200 text-black text-[10px]">
                  {participant.initials}
                </AvatarFallback>
              </Avatar>
            ))}
          </div>
          {participants.length > 4 && (
            <span className="text-[11px] text-gray-500 whitespace-nowrap">
              {participants.length - 4} +
            </span>
          )}
        </button>
      </SheetTrigger>
      <SheetContent
        side="right"
        className="w-[210px] sm:w-[300px] mt-4 mb-6 mr-4 rounded-lg shadow-lg h-auto p-0"
      >
        <SheetHeader>
          <SheetTitle className="text-sm font-semibold border-b text-gray-900">
            Members
          </SheetTitle>
        </SheetHeader>
        <ScrollArea className="max-h-[60vh] px-2 pb-2">
          <div className="flex flex-col text-left text-xs">
            {renderSection("Online", "online", onlineMembers)}
            {renderSection("Offline", "offline", offlineMembers)}
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}