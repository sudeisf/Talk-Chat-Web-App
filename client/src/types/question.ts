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
