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
