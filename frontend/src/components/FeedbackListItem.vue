<script lang="ts" setup>
import { getImageSrc } from "@/utils/image.ts";
import { formatRelativeTime } from "@/utils/time.ts";
import { PropType } from "vue";
import { Feedback } from "../../../shared/types.ts";

defineProps({
  feedback: {
    type: Object as PropType<Feedback>,
    required: true,
  },
});
</script>

<template>
  <div class="flex w-full">
    <div class="flex justify-center items-start flex-shrink-0 mr-2 w-6">
      <img
        v-if="feedback.type"
        :src="getImageSrc(feedback.type.toLowerCase())"
        alt="Type"
        class="w-6 h-6"
      />
    </div>

    <div class="flex flex-col justify-between flex-grow overflow-hidden">
      <h2 class="font-medium text-base text-slate-800 truncate max-w-60">
        {{ feedback.title }}
      </h2>

      <div class="flex justify-between items-center mt-2">
        <p class="font-medium text-xs text-slate-500 truncate max-w-40">
          {{ feedback.name }}
        </p>
        <span class="font-medium text-xs text-slate-500">{{
          formatRelativeTime(new Date(feedback.createdAt), "short")
        }}</span>
      </div>
    </div>
  </div>
</template>
