import { useMutation, useQuery } from '@tanstack/react-query';
import {
  createQuestion,
  getMyQuestions,
  modifyQuestionDescription,
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
