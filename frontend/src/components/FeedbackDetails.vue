<script lang="ts" setup>
import { useFeedbackStore } from "@/stores/feedbackStore.ts";
import { getImageSrc } from "@/utils/image.ts";
import { computed } from "vue";
import { formatRelativeTime } from "@/utils/time.ts";

const feedbackStore = useFeedbackStore();
const feedback = computed(() => feedbackStore.selectedFeedback);
</script>

<template>
  <div v-if="feedback" class="flex">
    <div class="flex justify-center items-start mr-2 mt-6 w-6">
      <img
        v-if="feedback.type"
        :src="getImageSrc(feedback.type.toLowerCase())"
        alt="Type"
        class="w-6 h-6"
      />
    </div>

    <div class="flex flex-col justify-between flex-grow">
      <div class="font-medium text-xs text-slate-500">
        {{ formatRelativeTime(new Date(feedback.createdAt), "long") }}
      </div>
      <div class="my-1 font-medium text-2xl text-slate-800">
        {{ feedback.title }}
      </div>
      <div class="font-medium text-xs text-slate-500">
        {{ feedback.name }} ({{ feedback.email }})
      </div>
      <p class="mt-6 font-normal text-base whitespace-pre-line">
        {{ feedback.message }}
      </p>
    </div>
  </div>
</template>
