"use client"

import { useState } from 'react'
import { Bookmark, Search, Filter, Trash2, Share2, Eye, Calendar } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface BookmarkedTopic {
  id: string
  title: string
  time: string
  date: string
  tags: string[]
  category: 'question' | 'tutorial' | 'reference'
  description?: string
}

const bookmarkedData: { date: string; topics: BookmarkedTopic[] }[] = [
  {
    date: '7 Aug, 2025',
    topics: [
      {
        id: '1',
        title: 'How to integrate Stripe webhooks?',
        time: '10:32 AM',
        date: '7 Aug, 2025',
        tags: ['Stripe', 'Backend', 'Webhooks'],
        category: 'question',
        description: 'Complete guide on implementing Stripe webhooks for payment processing'
      },
      {
        id: '2',
        title: 'RBAC with Laravel Sanctum',
        time: '2:45 PM',
        date: '7 Aug, 2025',
        tags: ['Laravel', 'Auth', 'Sanctum'],
        category: 'tutorial',
        description: 'Step-by-step implementation of Role-Based Access Control'
      }
    ]
  },
  {
    date: '6 Aug, 2025',
    topics: [
      {
        id: '3',
        title: 'Next.js login form best practices',
        time: '11:12 AM',
        date: '6 Aug, 2025',
        tags: ['Next.js', 'Auth', 'React', 'TypeScript'],
        category: 'reference',
        description: 'Security and UX best practices for login forms'
      }
    ]
  }
]

export default function BookmarksPage() {
  const [searchTerm, setSearchTerm] = useState('')

  const filteredData = bookmarkedData.map(section => ({
    ...section,
    topics: section.topics.filter(topic => 
      topic.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      topic.description?.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(section => section.topics.length > 0)

  return (
    <div className="container mx-auto p-6 max-w-6xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-purple-100 rounded-lg">
            <Bookmark className="h-6 w-6 text-purple-600" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Bookmarks</h1>
            <p className="text-gray-600">Your saved questions and resources</p>
          </div>
        </div>
        <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
          {bookmarkedData.flatMap(section => section.topics).length} bookmarks
        </Badge>
      </div>

      {/* Search */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search bookmarks..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Bookmarks Timeline */}
      <div className="space-y-6">
        {filteredData.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <Bookmark className="h-12 w-12 text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No bookmarks found</h3>
              <p className="text-gray-600 text-center">
                Start bookmarking questions and resources you want to save for later.
              </p>
            </CardContent>
          </Card>
        ) : (
          filteredData.map((section, i) => (
            <div key={i}>
              <div className="ps-2 my-4">
                <h3 className="text-sm font-medium uppercase text-gray-500">
                  {section.date}
                </h3>
              </div>

              <div className="space-y-4">
                {section.topics.map((topic, index) => (
                  <Card key={topic.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-lg font-semibold text-gray-900">
                              {topic.title}
                            </h3>
                            <Badge 
                              variant="outline" 
                              className={`text-xs ${
                                topic.category === 'question' ? 'bg-blue-50 text-blue-700 border-blue-200' :
                                topic.category === 'tutorial' ? 'bg-green-50 text-green-700 border-green-200' :
                                'bg-purple-50 text-purple-700 border-purple-200'
                              }`}
                            >
                              {topic.category}
                            </Badge>
                          </div>
                          
                          {topic.description && (
                            <p className="text-gray-600 mb-3 text-sm">
                              {topic.description}
                            </p>
                          )}

                          <div className="flex items-center gap-4 mb-3">
                            <div className="flex items-center gap-1 text-sm text-gray-500">
                              <Calendar className="h-4 w-4" />
                              {topic.time}
                            </div>
                          </div>

                          <div className="flex flex-wrap gap-2 mb-4">
                            {topic.tags.map((tag, i) => (
                              <Badge
                                key={i}
                                variant="outline"
                                className="bg-gray-50 text-gray-600 border-gray-200 text-xs"
                              >
                                {tag}
                              </Badge>
                            ))}
                          </div>

                          <div className="flex items-center gap-2">
                            <Button variant="outline" size="sm" className="flex items-center gap-1">
                              <Eye className="h-4 w-4" />
                              View
                            </Button>
                            <Button variant="outline" size="sm" className="flex items-center gap-1">
                              <Share2 className="h-4 w-4" />
                              Share
                            </Button>
                          </div>
                        </div>

                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-red-500 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
