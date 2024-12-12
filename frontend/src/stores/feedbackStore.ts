import { defineStore } from "pinia";
import { fetchFeedbackList, submitFeedback } from "../services/apiService";
import { logError } from "../services/loggerService.ts";
import { CreateFeedbackDto, Feedback } from "../../../shared/types.ts";

export const useFeedbackStore = defineStore("feedback", {
  state: () => ({
    feedbackList: [] as Feedback[],
    loadingList: false,
    selectedFeedback: null as Feedback | null,
  }),

  actions: {
    async getFeedbackList() {
      this.loadingList = true;
      try {
        this.feedbackList = await fetchFeedbackList();
        if (this.feedbackList.length) {
          this.selectedFeedback = this.feedbackList[0];
        }
      } catch (error) {
        logError("getFeedbackList", error);
        throw new Error(
          "Failed to load feedback list, please try again later.",
        );
      } finally {
        this.loadingList = false;
      }
    },

    async addFeedback(newFeedback: CreateFeedbackDto) {
      try {
        const addedFeedback = await submitFeedback(newFeedback);
        this.feedbackList.push(addedFeedback);
        this.selectedFeedback = addedFeedback;
      } catch (error) {
        logError("addFeedback", error);
        throw new Error("Failed to add feedback, please try again later.");
      }
    },

    selectFeedback(feedback: Feedback) {
      this.selectedFeedback = feedback;
    },
  },
});
