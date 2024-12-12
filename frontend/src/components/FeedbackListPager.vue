<script lang="ts" setup>
import { computed } from "vue";
import { useFeedbackStore } from "@/stores/feedbackStore.ts";
import BaseButton from "@/components/BaseButton.vue";

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
  <BaseButton
    :type="page <= 1 ? 'disabled' : 'primary'"
    label="<"
    @click="goToPage(page - 1)"
  />
  <span class="text-sm text-slate-500 mx-2"
    >{{ page }} of {{ totalPages }}</span
  >
  <BaseButton
    :type="page >= totalPages ? 'disabled' : 'primary'"
    label=">"
    @click="goToPage(page + 1)"
  />
</template>
