<script lang="ts" setup>
import { computed } from "vue";
import { useFeedbackStore } from "@/stores/feedbackStore.ts";

const feedbackStore = useFeedbackStore();

const page = computed(() => feedbackStore.page);
const totalPages = computed(() =>
  Math.ceil(feedbackStore.totalCount / feedbackStore.limit),
);

async function goToPage(newPage: number) {
  if (newPage > 0 && newPage <= totalPages.value) {
    await feedbackStore.setPage(newPage);
  }
}
</script>

<template>
  <button
    :disabled="page <= 1"
    class="bg-blue-500 text-white p-2 rounded"
    @click="goToPage(page - 1)"
  >
    Previous
  </button>
  <span class="mx-2">Page {{ page }} of {{ totalPages }}</span>
  <button
    :disabled="page >= totalPages"
    class="bg-blue-500 text-white p-2 rounded"
    @click="goToPage(page + 1)"
  >
    Next
  </button>
</template>
