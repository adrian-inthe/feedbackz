import * as Yup from "yup";
import { CreateFeedbackDto } from "../../../shared/types";

export const feedbackCreationSchema: Yup.Schema<CreateFeedbackDto> = Yup.object(
  {
    name: Yup.string()
      .required("Please enter a name")
      .max(50, "Name cannot exceed 50 characters"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Please enter an email")
      .max(320, "Email cannot exceed 320 characters"),
    type: Yup.mixed<"Bug" | "Suggestion">()
      .oneOf(["Bug", "Suggestion"], "Please select a type")
      .required("Please select a type"),
    title: Yup.string()
      .required("Please enter a title")
      .max(100, "Title cannot exceed 100 characters"),
    message: Yup.string()
      .required("Please enter a message")
      .max(1000, "Message cannot exceed 1000 characters"),
  },
);
