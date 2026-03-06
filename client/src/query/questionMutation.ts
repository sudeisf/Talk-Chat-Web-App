import { useMutation, useQuery } from '@tanstack/react-query';
import {
  createQuestion,
  getHelperContributions,
  getHelperDashboardStats,
  getHelperProfileOverview,
  getHelperSessionsChart,
  getMyQuestions,
  getQuestionFeed,
  getRecentActivity,
  joinQuestion,
  modifyQuestionDescription,
  voteQuestion,
} from '@/lib/api/questionApi';
import { CreateQuestionPayload, ModifyDescriptionPayload } from '@/types/question';
import { queryClient } from './queryClient';

export const useCreateQuestionMutation = () => {
  return useMutation({
    mutationKey: ['create-question'],
    mutationFn: (payload: CreateQuestionPayload) => createQuestion(payload),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['my-questions'] });
    },
  });
};

export const useModifyQuestionDescriptionMutation = () => {
  return useMutation({
    mutationKey: ['modify-question-description'],
    mutationFn: (payload: ModifyDescriptionPayload) =>
      modifyQuestionDescription(payload),
  });
};

export const useMyQuestionsQuery = () => {
  return useQuery({
    queryKey: ['my-questions'],
    queryFn: getMyQuestions,
  });
};

export const useHelperDashboardStatsQuery = () => {
  return useQuery({
    queryKey: ['helper-dashboard-stats'],
    queryFn: getHelperDashboardStats,
  });
};

export const useHelperSessionsChartQuery = () => {
  return useQuery({
    queryKey: ['helper-sessions-chart'],
    queryFn: getHelperSessionsChart,
  });
};

export const useHelperContributionsQuery = () => {
  return useQuery({
    queryKey: ['helper-contributions'],
    queryFn: getHelperContributions,
  });
};

export const useHelperProfileOverviewQuery = () => {
  return useQuery({
    queryKey: ['helper-profile-overview'],
    queryFn: getHelperProfileOverview,
  });
};

export const useQuestionFeedQuery = () => {
  return useQuery({
    queryKey: ['question-feed'],
    queryFn: getQuestionFeed,
  });
};

export const useRecentActivityQuery = (limit = 8) => {
  return useQuery({
    queryKey: ['recent-activity', limit],
    queryFn: () => getRecentActivity(limit),
  });
};

export const useJoinQuestionMutation = () => {
  return useMutation({
    mutationKey: ['join-question'],
    mutationFn: (questionId: number) => joinQuestion(questionId),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['question-feed'] });
    },
  });
};

export const useVoteQuestionMutation = () => {
  return useMutation({
    mutationKey: ['vote-question'],
    mutationFn: ({ questionId, voteType }: { questionId: number; voteType: 'UP' | 'DOWN' }) =>
      voteQuestion(questionId, voteType),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['question-feed'] });
    },
  });
};
