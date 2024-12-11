import * as Yup from "yup";
import { CreateFeedbackDto } from "../../../shared/types";

export const feedbackCreationSchema: Yup.Schema<CreateFeedbackDto> = Yup.object(
  {
    name: Yup.string().required("Name is required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    type: Yup.mixed<"Bug" | "Suggestion">()
      .oneOf(["Bug", "Suggestion"], "Invalid type")
      .required("Type is required"),
    message: Yup.string().required("Message is required"),
  },
);
