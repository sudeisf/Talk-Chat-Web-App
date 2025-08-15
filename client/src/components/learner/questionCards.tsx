"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Bookmark, MessageCircle, Calendar, Clock, Triangle, ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"

interface QuestionCardProps {
  id: string
  title: string
  tags: string[]
  status: "ongoing" | "answered" | "closed"
  createdDate: string
  lastActivity: string
  answerCount: number
  upvotes?: number
  downvotes?: number
  userVote?: "up" | "down" | null
  isBookmarked?: boolean
  onTitleClick?: (id: string) => void
  onContinueClick?: (id: string) => void
  onBookmarkToggle?: (id: string, bookmarked: boolean) => void
  onUpvote?: (id: string) => void
  onDownvote?: (id: string) => void
}

const statusConfig = {
  ongoing: { label: "Ongoing", className: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300" },
  answered: { label: "Answered", className: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300" },
  closed: { label: "Closed", className: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300" },
}

export function QuestionCard({
  id,
  title,
  tags,
  status,
  createdDate,
  lastActivity,
  answerCount,
  upvotes = 0,
  downvotes = 0,
  userVote = null,
  isBookmarked = false,
  onTitleClick,
  onContinueClick,
  onBookmarkToggle,
  onUpvote,
  onDownvote,
}: QuestionCardProps) {
  const [bookmarked, setBookmarked] = useState(isBookmarked)
  const [currentVote, setCurrentVote] = useState<"up" | "down" | null>(userVote)
  const [voteCount, setVoteCount] = useState(upvotes - downvotes)

  const handleBookmarkClick = () => {
    const newBookmarked = !bookmarked
    setBookmarked(newBookmarked)
    onBookmarkToggle?.(id, newBookmarked)
  }

  const handleTitleClick = () => {
    onTitleClick?.(id)
  }

  const handleContinueClick = () => {
    onContinueClick?.(id)
  }

  const handleUpvote = () => {
    if (currentVote === "up") {
      setCurrentVote(null)
      setVoteCount((prev) => prev - 1)
    } else {
      const adjustment = currentVote === "down" ? 2 : 1
      setCurrentVote("up")
      setVoteCount((prev) => prev + adjustment)
    }
    onUpvote?.(id)
  }

  const handleDownvote = () => {
    if (currentVote === "down") {
      setCurrentVote(null)
      setVoteCount((prev) => prev + 1)
    } else {
      const adjustment = currentVote === "up" ? 2 : 1
      setCurrentVote("down")
      setVoteCount((prev) => prev - adjustment)
    }
    onDownvote?.(id)
  }

  return (
    <Card className="w-full hover:shadow-xs shadow-none rounded-sm transition-shadow duration-200">
      <CardHeader className="pb-3">
        <div className="flex items-start gap-3">
          <div className="flex flex-col items-center gap-0.5 shrink-0 py-1">
            <Button
              variant="ghost"
              size="sm"
              className={cn(
                "p-1 h-auto hover:bg-transparent",
                currentVote === "up"
                  ? "text-orange-500"
                  : "text-gray-400 hover:text-orange-500 dark:text-gray-500 dark:hover:text-orange-400",
              )}
              onClick={handleUpvote}
            >
              <Triangle className="h-3 w-3 fill-current" />
            </Button>

            <span
              className={cn(
                "text-xs font-bold px-1 py-0.5 min-w-[24px] text-center",
                voteCount > 0
                  ? "text-orange-500"
                  : voteCount < 0
                    ? "text-blue-500"
                    : "text-gray-500 dark:text-gray-400",
              )}
            >
              {voteCount}
            </span>

            <Button
              variant="ghost"
              size="sm"
              className={cn(
                "p-1 h-auto hover:bg-transparent",
                currentVote === "down"
                  ? "text-blue-500"
                  : "text-gray-400 hover:text-blue-500 dark:text-gray-500 dark:hover:text-blue-400",
              )}
              onClick={handleDownvote}
            >
              <Triangle className="h-3 w-3 fill-current rotate-180" />
            </Button>
          </div>

          <div className="flex-1 min-w-0">
            <h3
              className="font-medium font-pt text-lg leading-tight cursor-pointer hover:text-blue-600 dark:hover:text-blue-400 transition-colors line-clamp-2"
              onClick={handleTitleClick}
            >
              {title}
            </h3>

            {/* Tags */}
            <div className="flex flex-wrap gap-1.5 mt-2">
              {tags.map((tag, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className="text-sm px-2 py-0.5 bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300"
                >
                  {tag}
                </Badge>
              ))}
            </div>
            <Button size="sm" variant={"ghost"} onClick={handleContinueClick} className=" hover:bg-gray-50/5 text-md mt-2 text-blue-600 flex items-center font-pt shrink-0">
            Continue <ArrowRight/>
          </Button>
          </div>
          

          {/* Bookmark Icon */}
                  <Button 
            variant="ghost" 
            className="p-2 h-auto shrink-0" 
            onClick={handleBookmarkClick}
            aria-label={bookmarked ? "Remove bookmark" : "Bookmark question"}
            >
            <Bookmark
            className={cn(
                  "h-10 w-10 transition-colors",
                  bookmarked
                  ? "fill-yellow-400 text-yellow-400"
                  : "text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300",
            )}
            />
            </Button>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
            {/* Status Badge */}
            <Badge className={cn("text-sm", statusConfig[status].className)}>{statusConfig[status].label}</Badge>

            {/* Answer Count */}
            <div className="flex text-sm items-center gap-1">
              <MessageCircle className="h-5 w-5" />
              <span>
                {answerCount} {answerCount === 1 ? "answer" : "answers"}
              </span>
            </div>

            {/* Dates */}
            <div className="flex items-center gap-3 text-xs">
              <div className="flex text-sm items-center gap-1">
                <Calendar className="h-5 w-5" />
                <span>{createdDate}</span>
              </div>
              <div className="flex text-sm items-center gap-1">
                <Clock className="h-5  w-5" />
                <span>{lastActivity}</span>
              </div>
            </div>
          </div>

         
        </div>
      </CardContent>
    </Card>
  )
}
