import * as Yup from "yup";
import { CreateFeedbackDto } from "../../../shared/types";

export const feedbackCreationSchema: Yup.Schema<CreateFeedbackDto> = Yup.object(
  {
    name: Yup.string().required("Please enter a name"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Please enter an email"),
    type: Yup.mixed<"Bug" | "Suggestion">()
      .oneOf(["Bug", "Suggestion"], "Please select a type")
      .required("Please select a type"),
    message: Yup.string().required("Please enter a message"),
  },
);
