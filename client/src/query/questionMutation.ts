import { useMutation } from '@tanstack/react-query';
import {
  createQuestion,
  modifyQuestionDescription,
} from '@/lib/api/questionApi';
import { CreateQuestionPayload, ModifyDescriptionPayload } from '@/types/question';

export const useCreateQuestionMutation = () => {
  return useMutation({
    mutationKey: ['create-question'],
    mutationFn: (payload: CreateQuestionPayload) => createQuestion(payload),
  });
};

export const useModifyQuestionDescriptionMutation = () => {
  return useMutation({
    mutationKey: ['modify-question-description'],
    mutationFn: (payload: ModifyDescriptionPayload) =>
      modifyQuestionDescription(payload),
  });
};
