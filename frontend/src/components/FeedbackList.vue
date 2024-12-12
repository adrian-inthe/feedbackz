<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { useFeedbackStore } from "../stores/feedbackStore";
import FeedbackListItem from "@/components/FeedbackListItem.vue";

const listError = ref("");
const feedbackStore = useFeedbackStore();

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
  <p v-if="feedbackStore.loadingList">Loading…</p>
  <p v-if="listError" class="text-red-500">
    {{ listError }}
  </p>
  <p v-else-if="!feedbackStore.feedbackList.length">No feedback yet!</p>

  <div v-if="!feedbackStore.loadingList && !listError">
    <div
      v-for="feedback in feedbackStore.feedbackList"
      :key="feedback._id"
      :class="{ 'bg-slate-200': feedbackStore.selectedFeedback === feedback }"
      class="my-2 p-2 max-w-xl rounded-md hover:bg-slate-200 cursor-pointer flex"
      @click="feedbackStore.selectFeedback(feedback)"
    >
      <FeedbackListItem :feedback="feedback" />
    </div>
  </div>
</template>
