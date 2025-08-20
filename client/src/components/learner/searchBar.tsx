import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

export function SearchBar({ className }: { className?: string }) {
  return (
    <div className={`relative w-[350px] ${className || ''}`}>
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        type="text"
        placeholder="Search sessions, bookmark.."
        className="pl-10 shadow-none border border-border/50 rounded-lg bg-background focus-visible:ring-2 focus-visible:ring-ring"
      />
    </div>
  )
}
