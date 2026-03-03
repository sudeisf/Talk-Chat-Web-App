export interface CreateQuestionPayload {
  title: string;
  description: string;
  tags: string[];
}

export interface QuestionResponse {
  id: number;
  title: string;
  description: string;
  created_at: string;
}

export interface ModifyDescriptionPayload {
  description: string;
}

export interface ModifyDescriptionResponse {
  improved_description: string;
}

export interface MyQuestionItem {
  id: number;
  title: string;
  description: string;
  tags: string[];
  status: 'searching' | 'ongoing' | 'answered' | 'closed';
  created_at: string;
  updated_at: string;
  upvotes: number;
  downvotes: number;
}

export interface DashboardMetric {
  value: number;
  change: number;
}

export interface HelperDashboardStatsResponse {
  questions_answered: DashboardMetric;
  sessions_joined: DashboardMetric;
  average_response_time: DashboardMetric;
  feedback_rating: DashboardMetric;
}

export interface HelperMonthlySessionItem {
  month: string;
  sessions: number;
}

export interface HelperSessionsChartResponse {
  period_label: string;
  trend_percentage: number;
  sessions: HelperMonthlySessionItem[];
}

export interface ContributionDayItem {
  date: string;
  count: number;
}

export interface HelperContributionsResponse {
  items: ContributionDayItem[];
}

export interface HelperProfileOverviewResponse {
  helped_learners: number;
  sessions_joined: number;
  ongoing_sessions: number;
  average_response_minutes: number;
}
