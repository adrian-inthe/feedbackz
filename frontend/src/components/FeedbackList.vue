<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { useFeedbackStore } from "../stores/feedbackStore";
import { getImageSrc } from "@/utils/image.ts";
import { formatRelativeTime } from "../utils/time.ts";

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
      <div class="flex justify-center items-start mr-2 w-6">
        <img
          v-if="feedback.type"
          :src="getImageSrc(feedback.type.toLowerCase())"
          alt="Type"
          class="w-6 h-6"
        />
      </div>

      <div class="flex flex-col justify-between flex-grow">
        <h2 class="font-medium text-base text-slate-800">
          {{ feedback.title }}
        </h2>

        <div class="flex justify-between items-center mt-2">
          <p class="font-medium text-xs text-slate-500">
            {{ feedback.name }}
          </p>
          <span class="font-medium text-xs text-slate-500">{{
            formatRelativeTime(new Date(feedback.createdAt))
          }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
