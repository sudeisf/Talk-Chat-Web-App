import API from './axiosInstance';
import {
  HelperContributionsResponse,
  CreateQuestionPayload,
  HelperDashboardStatsResponse,
  HelperProfileOverviewResponse,
  HelperSessionsChartResponse,
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

export const getHelperSessionsChart = async () => {
  const response = await API.get<HelperSessionsChartResponse>(
    '/questions/helper-sessions-chart/',
    {
      withCredentials: true,
    }
  );
  return response.data;
};

export const getHelperContributions = async () => {
  const response = await API.get<HelperContributionsResponse>(
    '/questions/helper-contributions/',
    {
      withCredentials: true,
    }
  );
  return response.data;
};

export const getHelperProfileOverview = async () => {
  const response = await API.get<HelperProfileOverviewResponse>(
    '/questions/helper-profile-overview/',
    {
      withCredentials: true,
    }
  );
  return response.data;
};
