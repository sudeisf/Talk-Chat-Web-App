"use client"

import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import { Badge } from "../ui/badge"
import { X } from "lucide-react"
import { removeTag } from "@/redux/slice/tagSlice"
import { Tag } from "./tags-filter-select"

interface SelectedTagsDisplayProps {
  containerId?: string
  selectedTags?: Tag[]
  onTagRemove?: (tagId: string) => void
}

export function SelectedTagsDisplay({
  containerId = "default-tags-container",
  selectedTags: externalSelectedTags,
  onTagRemove: externalOnTagRemove
}: SelectedTagsDisplayProps) {
  const dispatch = useAppDispatch()
  const reduxSelectedTags = useAppSelector((state: any) => state.tags?.[containerId] || [])
  const selectedTags = externalSelectedTags || reduxSelectedTags
    
  if (selectedTags.length === 0) return null
    
  const handleTagRemove = (tagId: string) => {
    if (externalOnTagRemove) {
      externalOnTagRemove(tagId)
    } else {
      dispatch(removeTag({ containerId, tagId }))
    }
  }
    
  return (
    <div className="flex flex-wrap gap-2 mt-3">
      {selectedTags.map((tag: Tag) => (
        <Badge
          key={tag.id}
          variant="secondary"
          className="text-sm px-2 py-1"
        >
          {tag.label}
          <button
            className="ml-2 hover:bg-muted  rounded-full p-0.5"
            onClick={() => handleTagRemove(tag.id)}
          >
            <X className="h-3 w-3" />
          </button>
        </Badge>
      ))}
    </div>
  )
}