import { useMutation } from '@tanstack/react-query';
import { createQuestion } from '@/lib/api/questionApi';
import { CreateQuestionPayload } from '@/types/question';

export const useCreateQuestionMutation = () => {
  return useMutation({
    mutationKey: ['create-question'],
    mutationFn: (payload: CreateQuestionPayload) => createQuestion(payload),
  });
};
