export interface CreateFeedbackDto {
  name: string;
  email: string;
  type: "Bug" | "Suggestion";
  message: string;
}

export interface Feedback extends CreateFeedbackDto {
  _id: string;
  createdAt: string;
}
