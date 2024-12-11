import { defineStore } from "pinia";
import { fetchFeedbackList, submitFeedback } from "../services/apiService";
import { logError } from "../services/loggerService.ts";
import { CreateFeedbackDto, Feedback } from "../../../shared/types.ts";

export const useFeedbackStore = defineStore("feedback", {
  state: () => ({
    feedbackList: [] as Feedback[],
    listError: null as string | null,
    loadingList: false,
    addError: null as string | null,
  }),

  actions: {
    async getFeedbackList() {
      this.loadingList = true;
      this.listError = null;
      try {
        this.feedbackList = await fetchFeedbackList();
      } catch (error) {
        logError("loadFeedback", error);
        this.listError = "Failed to load feedback. Please try again.";
      } finally {
        this.loadingList = false;
      }
    },

    async addFeedback(newFeedback: CreateFeedbackDto) {
      this.addError = null;
      try {
        const addedFeedback = await submitFeedback(newFeedback);
        this.feedbackList.push(addedFeedback);
      } catch (error) {
        logError("addFeedback", error);
        this.addError = "Failed to submit feedback. Please try again.";
      }
    },
  },
});
