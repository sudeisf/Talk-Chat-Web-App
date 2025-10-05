import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

export default function SearchSessions() {
  return (
    <div className="relative w-full">
      <Search className="absolute left-3  top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        type="text"
        placeholder="Search sessions..."
        className="pl-10 shadow-none border border-gray-300 rounded-sm "
      />
    </div>
  )
}
