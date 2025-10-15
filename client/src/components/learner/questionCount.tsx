'use client';

import { useState } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface QuestionCounterSorterProps {
  questionCount: number;
  onSortChange: (sortBy: string) => void;
  defaultSort?: string;
}

const sortOptions = [
  { value: 'newest', label: 'Newest' },
  { value: 'oldest', label: 'Oldest' },
  { value: 'most-upvoted', label: 'Most Upvoted' },
  { value: 'most-answered', label: 'Most Answered' },
  { value: 'most-active', label: 'Most Active' },
  { value: 'unanswered', label: 'Unanswered' },
];

export function QuestionCounterSorter({
  questionCount,
  onSortChange,
  defaultSort = 'newest',
}: QuestionCounterSorterProps) {
  const [currentSort, setCurrentSort] = useState(defaultSort);

  const handleSortChange = (value: string) => {
    setCurrentSort(value);
    onSortChange(value);
  };

  return (
    <div className="flex items-center justify-between py-4 border-b">
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium">
          {questionCount} {questionCount === 1 ? 'question' : 'questions'}
        </span>
      </div>

      <div className="flex items-center gap-2">
        <span className="text-sm text-muted-foreground">Sort by:</span>
        <Select value={currentSort} onValueChange={handleSortChange}>
          <SelectTrigger className="w-[140px] h-8">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {sortOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
