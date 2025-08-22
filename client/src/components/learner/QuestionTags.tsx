"use client"

import * as React from "react"
import { Badge } from "@/components/ui/badge"
import { X } from "lucide-react"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export interface Tag {
  id: string
  label: string
}

interface QuestionTagsProps {
  value?: Tag[]
  onChange?: (tags: Tag[]) => void
}

const sampleTags: Tag[] = [
  { id: "1", label: "React" },
  { id: "2", label: "Next.js" },
  { id: "3", label: "TypeScript" },
  { id: "4", label: "Django" },
  { id: "5", label: "Laravel" },
]

export function QuestionTags({ value = [], onChange }: QuestionTagsProps) {
  const handleAdd = (id: string) => {
    const tag = sampleTags.find((t) => t.id === id)
    if (tag && !value.some((t) => t.id === id)) {
      onChange?.([...value, tag])
    }
  }

  const handleRemove = (id: string) => {
    onChange?.(value.filter((t) => t.id !== id))
  }

  return (
    <div className="flex flex-col gap-2">
      {/* Select dropdown */}
      <Select onValueChange={handleAdd}>
        <SelectTrigger className="w-[200px]">
          {/* Instead of showing tag name, show count */}
          <span>
            {value.length > 0
              ? `Selected (${value.length})`
              : "Select tags"}
          </span>
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Available Tags</SelectLabel>
            {sampleTags
              .filter((tag) => !value.some((t) => t.id === tag.id)) // hide selected ones
              .map((tag) => (
                <SelectItem key={tag.id} value={tag.id}>
                  {tag.label}
                </SelectItem>
              ))}
          </SelectGroup>
        </SelectContent>
      </Select>

    
      <div className="flex flex-wrap gap-2">
        {value.map((tag) => (
          <Badge
            key={tag.id}
            variant="secondary"
            className="flex items-center gap-1 py-1 rounded-full shadow-2xs text-sm"
          >
            {tag.label}
            <X
              className="h-3 w-3 cursor-pointer"
              onClick={() => handleRemove(tag.id)}
            />
          </Badge>
        ))}
      </div>
    </div>
  )
}
