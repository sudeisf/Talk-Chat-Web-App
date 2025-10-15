'use client';

import { DateRangePicker } from '@/components/learner/date-range-picker';
import { QuestionCard } from '@/components/learner/questionCards';
import { QuestionCounterSorter } from '@/components/learner/questionCount';
import QuestionSearchBar from '@/components/learner/QuestionSearchBar';
import { PaginationDemo } from '@/components/learner/QuestionsPaginations';
import { RecentQuestionsTimeline } from '@/components/learner/RecentQuestionsTimeline';
import { SelectedTagsDisplay } from '@/components/learner/selected-tag-display';
import { Tag, TagsFilterSelect } from '@/components/learner/tags-filter-select';
import { Pagination } from '@/components/ui/pagination';
import { ScrollArea } from '@/components/ui/scroll-area';

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

const sampleQuestions = [
  {
    id: '1',
    title:
      'How to implement server-side rendering with Next.js 14 and TypeScript?',
    description:
      "I'm trying to set up SSR in my Next.js 14 project with TypeScript but running into hydration issues. The components render differently on server and client, causing mismatches and console warnings.",
    contributors: [
      { name: 'Mike Johnson', avatar: '/generic-user-avatar.png' },
      { name: 'Lisa Wang', avatar: '/database-expert.png' },
      { name: 'Tom Brown' },
    ],
    additionalContributors: 24,
    tags: ['Next.js', 'TypeScript', 'SSR'],
    status: 'ongoing' as const,
    createdDate: '2 days ago',
    lastActivity: '1 hour ago',
    answerCount: 3,
    upvotes: 15,
    downvotes: 2,
    userVote: 'up' as const,
    isBookmarked: true,
    user: {
      name: 'Sarah Chen',
      avatar: '/generic-user-avatar.png',
      reputation: 2847,
    },
  },
  {
    id: '2',
    title: 'Best practices for state management in React applications',
    description:
      'Looking for guidance on choosing between Redux, Zustand, and Context API for a medium-sized React app. Need to understand performance implications and when to use each approach.',
    contributors: [
      { name: 'David Lee', avatar: '/database-expert.png' },
      { name: 'Emma Davis' },
      { name: 'Chris Wilson', avatar: '/generic-user-avatar.png' },
    ],
    additionalContributors: 18,
    tags: ['React', 'State Management', 'Redux'],
    status: 'answered' as const,
    createdDate: '1 week ago',
    lastActivity: '3 days ago',
    answerCount: 7,
    upvotes: 28,
    downvotes: 1,
    userVote: null,
    isBookmarked: false,
    user: {
      name: 'Alex Rodriguez',
      avatar: '/database-expert.png',
      reputation: 5432,
    },
  },
  {
    id: '3',
    title: 'Database design patterns for scalable web applications',
    description:
      'Working on a high-traffic web application and need advice on database architecture patterns. Considering microservices with separate databases vs monolithic approach with proper indexing strategies.',
    contributors: [
      { name: 'Rachel Green' },
      { name: 'Kevin Park', avatar: '/generic-user-avatar.png' },
    ],
    additionalContributors: 31,
    tags: ['Database', 'Architecture', 'Performance'],
    status: 'closed' as const,
    createdDate: '2 weeks ago',
    lastActivity: '1 week ago',
    answerCount: 12,
    upvotes: 42,
    downvotes: 5,
    userVote: 'down' as const,
    isBookmarked: true,
    user: {
      name: 'Jordan Kim',
      reputation: 1205,
    },
  },
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

export default function QuestionsPage() {
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
  const [sortBy, setSortBy] = useState<string>('newest'); // Added missing state

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
      <div className="p-4 max-w-7xl mx-auto space-y-4 ">
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
              questionCount={sampleQuestions.length}
              onSortChange={handleSortChange}
            />
            <ScrollArea className="h-fit w-full p-2">
              <div className="space-y-4">
                {sampleQuestions.length > 0 ? (
                  sampleQuestions.map((question) => (
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
                    No questions found. Try adjusting your filters.
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
