'use client';

import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import {
  Bookmark,
  MessageCircle,
  Calendar,
  Clock,
  Triangle,
  ArrowRight,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/dist/client/link';

interface QuestionCardProps {
  id: string;
  title: string;
  description?: string;
  contributors?: Array<{
    name: string;
    avatar?: string;
  }>;
  additionalContributors?: number;
  tags: string[];
  status: 'ongoing' | 'answered' | 'closed';
  createdDate: string;
  lastActivity: string;
  answerCount: number;
  upvotes?: number;
  downvotes?: number;
  userVote?: 'up' | 'down' | null;
  isBookmarked?: boolean;
  user?: {
    name: string;
    avatar?: string;
    reputation?: number;
  };
  onTitleClick?: (id: string) => void;
  onContinueClick?: (id: string) => void;
  onBookmarkToggle?: (id: string, bookmarked: boolean) => void;
  onUpvote?: (id: string) => void;
  onDownvote?: (id: string) => void;
}

const statusConfig = {
  ongoing: {
    label: 'Ongoing',
    className: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
  },
  answered: {
    label: 'Answered',
    className:
      'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
  },
  closed: {
    label: 'Closed',
    className: 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300',
  },
};

export function QuestionCard({
  id,
  title,
  description,
  contributors = [],
  additionalContributors = 0,
  tags,
  status,
  createdDate,
  lastActivity,
  answerCount,
  upvotes = 0,
  downvotes = 0,
  userVote = null,
  isBookmarked = false,
  user = { name: 'Anonymous User' },
  onTitleClick,
  onContinueClick,
  onBookmarkToggle,
  onUpvote,
  onDownvote,
}: QuestionCardProps) {
  const [bookmarked, setBookmarked] = useState(isBookmarked);
  const [currentVote, setCurrentVote] = useState<'up' | 'down' | null>(
    userVote
  );
  const [voteCount, setVoteCount] = useState(upvotes - downvotes);

  const handleBookmarkClick = () => {
    const newBookmarked = !bookmarked;
    setBookmarked(newBookmarked);
    onBookmarkToggle?.(id, newBookmarked);
  };

  const handleTitleClick = () => {
    onTitleClick?.(id);
  };

  const handleContinueClick = () => {
    onContinueClick?.(id);
  };

  const handleUpvote = () => {
    if (currentVote === 'up') {
      setCurrentVote(null);
      setVoteCount((prev) => prev - 1);
    } else {
      const adjustment = currentVote === 'down' ? 2 : 1;
      setCurrentVote('up');
      setVoteCount((prev) => prev + adjustment);
    }
    onUpvote?.(id);
  };

  const handleDownvote = () => {
    if (currentVote === 'down') {
      setCurrentVote(null);
      setVoteCount((prev) => prev + 1);
    } else {
      const adjustment = currentVote === 'up' ? 2 : 1;
      setCurrentVote('down');
      setVoteCount((prev) => prev - adjustment);
    }
    onDownvote?.(id);
  };

  return (
    <Card className="w-full hover:shadow-xs border rounded-sm shadow-none transition-shadow duration-200">
      <CardHeader className="pb-3">
        <div className="flex items-start gap-3">
          <div className="flex flex-col items-center gap-0.5 shrink-0 py-1">
            <Button
              variant="ghost"
              size="sm"
              className={cn(
                'p-1 h-auto hover:bg-transparent',
                currentVote === 'up'
                  ? 'text-orange-500'
                  : 'text-gray-400 hover:text-orange-500 dark:text-gray-500 dark:hover:text-orange-400'
              )}
              onClick={handleUpvote}
            >
              <Triangle className="h-3 w-3 fill-current" />
            </Button>

            <span
              className={cn(
                'text-xs font-bold px-1 py-0.5 min-w-[24px] text-center',
                voteCount > 0
                  ? 'text-orange-500'
                  : voteCount < 0
                    ? 'text-blue-500'
                    : 'text-gray-500 dark:text-gray-400'
              )}
            >
              {voteCount}
            </span>

            <Button
              variant="ghost"
              size="sm"
              className={cn(
                'p-1 h-auto hover:bg-transparent',
                currentVote === 'down'
                  ? 'text-blue-500'
                  : 'text-gray-400 hover:text-blue-500 dark:text-gray-500 dark:hover:text-blue-400'
              )}
              onClick={handleDownvote}
            >
              <Triangle className="h-3 w-3 fill-current rotate-180" />
            </Button>
          </div>

          <div className="flex-1 min-w-0">
            <h3
              className="font-medium font-sans text-lg leading-tight cursor-pointer hover:text-blue-600 dark:hover:text-blue-400 transition-colors line-clamp-2"
              onClick={handleTitleClick}
            >
              {title}
            </h3>

            {description && (
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 line-clamp-2 leading-relaxed">
                {description}
              </p>
            )}

            <div className="flex flex-wrap gap-1.5 mt-2">
              {tags.map((tag, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className="text-xs px-2 py-0.5 bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300"
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </div>

          <Button
            variant="ghost"
            size="sm"
            className="p-1.5 h-auto shrink-0"
            onClick={handleBookmarkClick}
          >
            <Bookmark
              className={cn(
                'h-4 w-4 transition-colors',
                bookmarked
                  ? 'fill-yellow-400 text-yellow-400'
                  : 'text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300'
              )}
            />
          </Button>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
            <Badge className={cn('text-xs', statusConfig[status].className)}>
              {statusConfig[status].label}
            </Badge>

            <div className="flex items-center gap-1">
              <MessageCircle className="h-3.5 w-3.5" />
              <span>
                {answerCount} {answerCount === 1 ? 'answer' : 'answers'}
              </span>
            </div>

            <div className="flex items-center gap-3 text-xs">
              <div className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                <span>{createdDate}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                <span>{lastActivity}</span>
              </div>
            </div>
          </div>

          <Link
            href={'/'}
            onClick={handleContinueClick}
            className="shrink-0 flex text-sm items-center gap-2 hover:text-blue-500"
          >
            Continue <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {contributors.length > 0 && (
          <div className="flex items-center gap-2 mt-3 pt-3 border-t border-gray-100 dark:border-gray-800">
            <span className="text-xs text-gray-500 dark:text-gray-400">
              Contributors:
            </span>
            <div className="flex items-center">
              {contributors.slice(0, 3).map((contributor, index) => (
                <div
                  key={index}
                  className="relative -ml-1 first:ml-0"
                  style={{ zIndex: contributors.length - index }}
                >
                  {contributor.avatar ? (
                    <img
                      src={contributor.avatar || '/placeholder.svg'}
                      alt={contributor.name}
                      className="w-6 h-6 rounded-full border-2 border-white dark:border-gray-800 object-cover"
                    />
                  ) : (
                    <div className="w-6 h-6 rounded-full bg-gray-300 dark:bg-gray-600 border-2 border-white dark:border-gray-800 flex items-center justify-center">
                      <span className="text-xs font-medium text-gray-600 dark:text-gray-300">
                        {contributor.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                  )}
                </div>
              ))}
              {additionalContributors > 0 && (
                <div className="relative -ml-1 w-6 h-6 rounded-full bg-gray-200 dark:bg-gray-700 border-2 border-white dark:border-gray-800 flex items-center justify-center">
                  <span className="text-xs font-medium text-gray-600 dark:text-gray-300">
                    +{additionalContributors}
                  </span>
                </div>
              )}
            </div>
          </div>
        )}

        <div className="flex items-center gap-2 mt-3 pt-3 border-t border-gray-100 dark:border-gray-800">
          {user.avatar ? (
            <img
              src={user.avatar || '/placeholder.svg'}
              alt={user.name}
              className="w-6 h-6 rounded-full object-cover"
            />
          ) : (
            <div className="w-6 h-6 rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center">
              <span className="text-xs font-medium text-gray-600 dark:text-gray-300">
                {user.name.charAt(0).toUpperCase()}
              </span>
            </div>
          )}
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            {user.name}
          </span>
          {user.reputation && (
            <span className="text-xs text-gray-500 dark:text-gray-400">
              ({user.reputation} rep)
            </span>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
