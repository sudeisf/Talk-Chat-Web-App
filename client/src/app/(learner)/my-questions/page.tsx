"use client"

import { DateRangePicker } from "@/components/learner/date-range-picker"
import QuestionSearchBar from "@/components/learner/QuestionSearchBar"
import { SelectedTagsDisplay } from "@/components/learner/selected-tag-display"
import { Tag, TagsFilterSelect } from "@/components/learner/tags-filter-select"
import { useState } from "react"

const sampleTags: Tag[] = [
      { id: "1", label: "React", color: "#61DAFB" },
      { id: "2", label: "TypeScript", color: "#3178C6" },
      { id: "3", label: "Next.js", color: "#000000" },
      { id: "4", label: "Tailwind CSS", color: "#06B6D4" },
      { id: "5", label: "JavaScript", color: "#F7DF1E" },
      { id: "6", label: "Node.js", color: "#339933" },
      { id: "7", label: "Python", color: "#3776AB" },
      { id: "8", label: "Design", color: "#FF6B6B" },
      { id: "9", label: "UI/UX", color: "#4ECDC4" },
      { id: "10", label: "Frontend", color: "#9B59B6" },
      { id: "11", label: "Backend", color: "#E67E22" },
      { id: "12", label: "Database", color: "#2ECC71" },
    ]


export default function MyQuestionPage(){

      const [selectedTags, setSelectedTags] = useState<Tag[]>([])
      return (
            <div className=" h-full">
                  <div className="p-4 max-w-6xl mx-auto space-y-4 ">
                        <h1 className="font-sans font-semibold text-2xl text-gray-600">My Questions</h1>
                        <div className="flex justify-evenly gap-4">
                        <QuestionSearchBar/>
                        <TagsFilterSelect
                              tags={sampleTags}
                              selectedTags={selectedTags}
                              onChange={setSelectedTags}
                              placeholder="Choose your tech stack..."
                              selectedTagsContainerId="questions-page"
                        />
                        <DateRangePicker/>
                        </div>
                        <div><SelectedTagsDisplay
                          containerId="questions-page"
                          selectedTags={selectedTags}
                          onTagRemove={(tagId) => setSelectedTags(selectedTags.filter(tag => tag.id !== tagId))}
                        /></div>
                  </div>
            </div>
      )
}