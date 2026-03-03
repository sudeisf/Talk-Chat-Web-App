'use client';

import { DateRangePicker } from '@/components/learner/date-range-picker';
import { QuestionCard } from '@/components/learner/questionCards';
import { QuestionCounterSorter } from '@/components/learner/questionCount';
import QuestionSearchBar from '@/components/learner/QuestionSearchBar';
import { PaginationDemo } from '@/components/learner/QuestionsPaginations';
import { RecentQuestionsTimeline } from '@/components/learner/RecentQuestionsTimeline';
import { SelectedTagsDisplay } from '@/components/learner/selected-tag-display';
import { Tag, TagsFilterSelect } from '@/components/learner/tags-filter-select';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useMyQuestionsQuery } from '@/query/questionMutation';

import { useState } from 'react';

const sampleTags: Tag[] = [
  { id: '1', label: 'React', color: '#61DAFB' },
  { id: '2', label: 'TypeScript', color: '#3178C6' },
  { id: '3', label: 'Next.js', color: '#000000' },
  { id: '4', label: 'Tailwind CSS', color: '#06B6D4' },
  { id: '5', label: 'JavaScript', color: '#F7DF1E' },
  { id: '6', label: 'Node.js', color: '#339933' },
  { id: '7', label: 'Python', color: '#3776AB' },
  { id: '8', label: 'Design', color: '#FF6B6B' },
  { id: '9', label: 'UI/UX', color: '#4ECDC4' },
  { id: '10', label: 'Frontend', color: '#9B59B6' },
  { id: '11', label: 'Backend', color: '#E67E22' },
  { id: '12', label: 'Database', color: '#2ECC71' },
];

const timelineQuestions = [
  {
    id: 't1',
    title: 'How to optimize React performance with useMemo?',
    status: 'ongoing' as const,
    timeAgo: '2 min ago',
    answerCount: 1,
    upvotes: 5,
  },
  {
    id: 't2',
    title: 'Best practices for API error handling in Next.js',
    status: 'answered' as const,
    timeAgo: '15 min ago',
    answerCount: 3,
    upvotes: 12,
  },
  {
    id: 't3',
    title: 'TypeScript generic constraints explained',
    status: 'closed' as const,
    timeAgo: '1 hour ago',
    answerCount: 8,
    upvotes: 24,
  },
];

export default function MyQuestionPage() {
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
  const [sortBy, setSortBy] = useState<string>('newest');
  const { data: myQuestions = [], isLoading } = useMyQuestionsQuery();

  const toRelative = (value: string) => {
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return 'Just now';
    const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
    if (seconds < 60) return 'Just now';
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes} min ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours} hr ago`;
    const days = Math.floor(hours / 24);
    if (days < 7) return `${days} day${days > 1 ? 's' : ''} ago`;
    const weeks = Math.floor(days / 7);
    if (weeks < 5) return `${weeks} week${weeks > 1 ? 's' : ''} ago`;
    return date.toLocaleDateString();
  };

  const filteredQuestions = myQuestions.filter((question) => {
    if (!selectedTags.length) return true;
    return selectedTags.every((selectedTag) =>
      question.tags.some(
        (questionTag) =>
          questionTag.toLowerCase() === selectedTag.label.toLowerCase()
      )
    );
  });

  const sortedQuestions = [...filteredQuestions].sort((a, b) => {
    if (sortBy === 'oldest') {
      return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
    }
    return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
  });

  const mappedQuestions = sortedQuestions.map((question) => ({
    id: String(question.id),
    title: question.title,
    description: question.description,
    tags: question.tags,
    status: question.status === 'searching' ? 'ongoing' : question.status,
    createdDate: toRelative(question.created_at),
    lastActivity: toRelative(question.updated_at),
    answerCount: 0,
    upvotes: question.upvotes,
    downvotes: question.downvotes,
    user: {
      name: 'you',
    },
  }));

  const handleTitleClick = (id: string) => {
    console.log('Navigate to question:', id);
  };

  const handleContinueClick = (id: string) => {
    console.log('Continue question:', id);
  };

  const handleBookmarkToggle = (id: string, bookmarked: boolean) => {
    console.log('Bookmark toggled:', id, bookmarked);
  };

  const handleUpvote = (id: string) => {
    console.log('Upvote question:', id);
  };

  const handleDownvote = (id: string) => {
    console.log('Downvote question:', id);
  };

  const handleSortChange = (newSortBy: string) => {
    setSortBy(newSortBy);
    console.log('Sort changed to:', newSortBy);
    // Here you would implement the actual sorting logic
  };

  return (
    <div className=" h-full">
      <div className="p-4 max-w-[78rem] mx-auto space-y-4 ">
        <h1 className="font-sans font-semibold text-2xl text-gray-600">
          My Questions
        </h1>
        <div className="flex justify-evenly gap-4">
          <QuestionSearchBar />
          <TagsFilterSelect
            tags={sampleTags}
            selectedTags={selectedTags}
            onChange={setSelectedTags}
            placeholder="Choose your tech stack..."
            selectedTagsContainerId="questions-page"
          />
          <DateRangePicker />
        </div>
        <div>
          <SelectedTagsDisplay
            containerId="questions-page"
            selectedTags={selectedTags}
            onTagRemove={(tagId) =>
              setSelectedTags(selectedTags.filter((tag) => tag.id !== tagId))
            }
          />
        </div>
        <div className="flex gap-4">
          <div className="space-y-4 w-3/4">
            <QuestionCounterSorter
              questionCount={mappedQuestions.length}
              onSortChange={handleSortChange}
            />
            <ScrollArea className="h-fit w-full p-2">
              <div className="space-y-4">
                {isLoading ? (
                  <div className="text-center py-8 text-gray-500">
                    Loading your questions...
                  </div>
                ) : mappedQuestions.length > 0 ? (
                  mappedQuestions.map((question) => (
                    <QuestionCard
                      key={question.id}
                      {...question}
                      onTitleClick={handleTitleClick}
                      onContinueClick={handleContinueClick}
                      onBookmarkToggle={handleBookmarkToggle}
                      onUpvote={handleUpvote}
                      onDownvote={handleDownvote}
                    />
                  ))
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    No questions found. Ask your first question.
                  </div>
                )}
              </div>
            </ScrollArea>
            <PaginationDemo />
          </div>
          <div>
            <RecentQuestionsTimeline questions={timelineQuestions} />
          </div>
        </div>
      </div>
    </div>
  );
}
