import { CreateFeedbackDto, Feedback } from "../../../shared/types.ts";

const API_URL = "http://localhost:3000";

export async function fetchFeedbackList(): Promise<Feedback[]> {
  const response = await fetch(`${API_URL}/feedback`, {
    headers: { accept: "application/json" },
  });

  if (response.status === 404) {
    return [];
  }

  if (!response.ok) {
    throw new Error("Failed to fetch feedback");
  }

  return await response.json(); // I assume I can trust my backend service (no need to validate the schemas)
}

export async function submitFeedback(
  feedback: CreateFeedbackDto,
): Promise<Feedback> {
  const response = await fetch(`${API_URL}/feedback`, {
    method: "POST",
    headers: {
      accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(feedback),
  });

  if (response.status === 400 || !response.ok) {
    throw new Error("Failed to submit feedback"); // More advanced error handling can be implemented here in future iterations.
  }

  return await response.json(); // I assume I can trust my backend service (no need to validate the schemas)
}
