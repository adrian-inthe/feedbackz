<script lang="ts" setup>
import { computed, onMounted, provide, ref } from "vue";
import { useFeedbackStore } from "../stores/feedbackStore";
import FeedbackListItem from "@/components/FeedbackListItem.vue";
import { CreateFeedbackDto } from "../../../shared/types";
import FeedbackListFilter from "@/components/FeedbackListFilter.vue";
import FeedbackListSort from "@/components/FeedbackListSort.vue";
import { filterAndSort } from "@/utils/list.ts";

const feedbackStore = useFeedbackStore();
const listError = ref("");
const filterByType = ref<"" | CreateFeedbackDto["type"]>("");
const sortBy = ref<"date.asc" | "date.desc" | "name.asc" | "name.desc">(
  "date.asc",
);
provide("filterByType", filterByType);
provide("sortBy", sortBy);

const feedbackList = computed(() =>
  filterAndSort(feedbackStore.feedbackList, filterByType.value, sortBy.value),
);

onMounted(async () => {
  try {
    await feedbackStore.getFeedbackList();
  } catch (error) {
    if (error instanceof Error) {
      listError.value = error.message;
    }
  }
});
</script>

<template>
  <div
    class="h-12 border-b border-b-slate-200 w-full flex justify-between items-center px-4"
  >
    <div>
      <FeedbackListFilter />
    </div>
    <div>
      <FeedbackListSort />
    </div>
  </div>
  <div class="p-1">
    <p v-if="feedbackStore.loadingList">Loading…</p>
    <p v-if="listError" class="text-red-500 text-center m-5">
      {{ listError }}
    </p>
    <p v-else-if="!feedbackStore.feedbackList.length" class="text-center m-5">
      No feedbacks found, please create a new one.
    </p>

    <div v-if="!feedbackStore.loadingList && !listError">
      <div
        v-for="feedback in feedbackList"
        :key="feedback._id"
        :class="{ 'bg-slate-200': feedbackStore.selectedFeedback === feedback }"
        class="my-2 p-2 max-w-xl rounded-md hover:bg-slate-200 cursor-pointer flex"
        @click="feedbackStore.selectFeedback(feedback)"
      >
        <FeedbackListItem :feedback="feedback" />
      </div>
    </div>
  </div>
</template>
