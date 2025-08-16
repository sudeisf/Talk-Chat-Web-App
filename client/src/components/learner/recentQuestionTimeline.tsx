"use client"

import { Clock, MessageCircle, TrendingUp } from "lucide-react"

interface TimelineQuestion {
  id: string
  title: string
  status: "ongoing" | "answered" | "closed"
  timeAgo: string
  answerCount: number
  upvotes: number
}

interface RecentQuestionsTimelineProps {
  questions: TimelineQuestion[]
}

export function RecentQuestionsTimeline({ questions }: RecentQuestionsTimelineProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "ongoing":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
      case "answered":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      case "closed":
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
    }
  }

  return (
    <div className="w-80 bg-background border-l border-border p-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Recent Activity</h3>
        <p className="text-sm text-muted-foreground">Latest questions and updates</p>
      </div>

      <div className="space-y-6">
        {questions.map((question, index) => (
          <div key={question.id} className="relative">
            {/* Timeline line */}
            {index < questions.length - 1 && <div className="absolute left-4 top-8 w-px h-16 bg-border" />}

            {/* Timeline dot */}
            <div className="absolute left-2 top-2 w-4 h-4 bg-primary rounded-full border-2 border-background" />

            {/* Content */}
            <div className="ml-8 pb-4">
              <div className="flex items-center gap-2 mb-2">
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(question.status)}`}>
                  {question.status}
                </span>
                <div className="flex items-center text-xs text-muted-foreground">
                  <Clock className="w-3 h-3 mr-1" />
                  {question.timeAgo}
                </div>
              </div>

              <h4 className="text-sm font-medium leading-tight mb-3 hover:text-primary cursor-pointer transition-colors">
                {question.title}
              </h4>

              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                <div className="flex items-center">
                  <MessageCircle className="w-3 h-3 mr-1" />
                  {question.answerCount} answers
                </div>
                <div className="flex items-center">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  {question.upvotes} upvotes
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-4 border-t border-border">
        <button className="text-sm text-primary hover:underline">View all activity →</button>
      </div>
    </div>
  )
}
