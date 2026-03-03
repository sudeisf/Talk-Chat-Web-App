'use client';

import * as React from 'react';
import { Badge } from '@/components/ui/badge';
import { X } from 'lucide-react';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
} from '@/components/ui/select';

export interface Tag {
  id: string;
  label: string;
}

interface QuestionTagsProps {
  value?: string[];
  onChange?: (tags: string[]) => void;
}

const sampleTags: Tag[] = [
  { id: '1', label: 'React' },
  { id: '2', label: 'Next.js' },
  { id: '3', label: 'TypeScript' },
  { id: '4', label: 'Django' },
  { id: '5', label: 'Laravel' },
];

export function QuestionTags({ value = [], onChange }: QuestionTagsProps) {
  const handleAdd = (id: string) => {
    const tag = sampleTags.find((t) => t.id === id);
    if (tag && !value.includes(tag.label)) {
      onChange?.([...value, tag.label]);
    }
  };

  const handleRemove = (label: string) => {
    onChange?.(value.filter((tagLabel) => tagLabel !== label));
  };

  return (
    <div className="flex flex-col gap-2">
      {/* Select dropdown */}
      <Select onValueChange={handleAdd}>
        <SelectTrigger className="w-[200px]">
          {/* Instead of showing tag name, show count */}
          <span>
            {value.length > 0 ? `Selected (${value.length})` : 'Select tags'}
          </span>
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Available Tags</SelectLabel>
            {sampleTags
              .filter((tag) => !value.includes(tag.label))
              .map((tag) => (
                <SelectItem key={tag.id} value={tag.id}>
                  {tag.label}
                </SelectItem>
              ))}
          </SelectGroup>
        </SelectContent>
      </Select>

      <div className="flex flex-wrap gap-2">
        {value.map((tagLabel) => (
          <Badge
            key={tagLabel}
            variant="secondary"
            className="flex items-center gap-1 py-1 rounded-full shadow-2xs text-sm"
          >
            {tagLabel}
            <X
              className="h-3 w-3 cursor-pointer"
              onClick={() => handleRemove(tagLabel)}
            />
          </Badge>
        ))}
      </div>
    </div>
  );
}
