import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

export function SearchBar() {
  return (
    <div className="relative w-[300px]">
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        type="text"
        placeholder="Search sessions, bookmark.."
        className="pl-10 shadow-none border-2 border-gray-300 rounded-sm"
      />
    </div>
  )
}
