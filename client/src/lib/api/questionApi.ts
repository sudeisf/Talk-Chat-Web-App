import API from './axiosInstance';
import {
  CreateQuestionPayload,
  HelperDashboardStatsResponse,
  ModifyDescriptionPayload,
  ModifyDescriptionResponse,
  MyQuestionItem,
  QuestionResponse,
} from '@/types/question';

export const createQuestion = async (payload: CreateQuestionPayload) => {
  const response = await API.post<QuestionResponse>('/questions/create/', payload, {
    withCredentials: true,
  });
  return response.data;
};

export const modifyQuestionDescription = async (payload: ModifyDescriptionPayload) => {
  const response = await API.post<ModifyDescriptionResponse>(
    '/questions/modify-description/',
    payload,
    {
      withCredentials: true,
    }
  );
  return response.data;
};

export const getMyQuestions = async () => {
  const response = await API.get<MyQuestionItem[]>('/questions/my/', {
    withCredentials: true,
  });
  return response.data;
};

export const getHelperDashboardStats = async () => {
  const response = await API.get<HelperDashboardStatsResponse>(
    '/questions/helper-dashboard-stats/',
    {
      withCredentials: true,
    }
  );
  return response.data;
};
