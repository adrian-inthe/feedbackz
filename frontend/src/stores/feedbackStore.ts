import { defineStore } from "pinia";
import { fetchFeedbackList, submitFeedback } from "../services/apiService";
import { logError } from "../services/loggerService.ts";
import { CreateFeedbackDto, Feedback } from "../../../shared/types.ts";

export const useFeedbackStore = defineStore("feedback", {
  state: () => ({
    feedbackList: [] as Feedback[],
    loadingList: false,
    selectedFeedback: null as Feedback | null,
    filterByType: "" as FilterByType,
    sortBy: "createdAt.desc" as SortBy,
    page: 1 as number,
    limit: 2 as number,
    totalCount: 0 as number,
  }),

  actions: {
    async getFeedbackList() {
      this.loadingList = true;
      try {
        const response = await fetchFeedbackList({
          page: this.page,
          limit: this.limit,
          filterByType: this.filterByType,
          sortBy: this.sortBy,
        });

        this.feedbackList = response.data;
        this.totalCount = response.totalCount;
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
        this.resetFilterByType();
        this.resetSortBy();
        this.resetPage();
        await this.getFeedbackList();
        this.selectedFeedback = addedFeedback;
      } catch (error) {
        logError("addFeedback", error);
        throw new Error("Failed to add feedback, please try again later.");
      }
    },

    selectFeedback(feedback: Feedback) {
      this.selectedFeedback = feedback;
    },

    async setFilterByType(filter: FilterByType) {
      this.filterByType = filter;
      this.resetPage();
      await this.getFeedbackList();
    },

    async setSortBy(sort: SortBy) {
      this.sortBy = sort;
      this.resetPage();
      await this.getFeedbackList();
    },

    async setPage(page: number) {
      this.page = page;
      await this.getFeedbackList();
    },

    resetFilterByType() {
      this.filterByType = "";
    },

    resetSortBy() {
      this.sortBy = "createdAt.desc";
    },

    resetPage() {
      this.page = 1;
    },
  },
});
