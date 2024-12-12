<script lang="ts" setup>
import { computed, onMounted, provide, ref } from "vue";
import { useFeedbackStore } from "../stores/feedbackStore";
import FeedbackListItem from "@/components/FeedbackListItem.vue";
import { CreateFeedbackDto } from "../../../shared/types";
import FeedbackListFilter from "@/components/FeedbackListFilter.vue";

const feedbackStore = useFeedbackStore();
const listError = ref("");
const filterByType = ref<"" | CreateFeedbackDto["type"]>("");
provide("filterByType", filterByType);

const feedbackList = computed(() => {
  if (filterByType.value) {
    return feedbackStore.feedbackList.filter(
      (feedback) => feedback.type === filterByType.value,
    );
  }
  return feedbackStore.feedbackList;
});

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
    <div><FeedbackListFilter /></div>
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
