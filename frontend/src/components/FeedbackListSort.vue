<script lang="ts" setup>
import { useFeedbackStore } from "@/stores/feedbackStore.ts";
import { computed } from "vue";

const feedbackStore = useFeedbackStore();
const sortBy = computed({
  get: () => feedbackStore.sortBy,
  set: (value: SortBy) => feedbackStore.setSortBy(value),
});
</script>

<template>
  <label class="text-medium text-xs" for="sort">Sort</label>
  <select id="sort" v-model="sortBy" class="ml-2 bg-slate-200 rounded">
    <option value="createdAt.asc">Date (Asc)</option>
    <option value="createdAt.desc">Date (Desc)</option>
    <option value="name.asc">Name (Asc)</option>
    <option value="name.desc">Name (Desc)</option>
  </select>
</template>

<style lang="postcss" scoped>
select,
option {
  @apply font-medium text-xs text-slate-500 px-2 py-0.5;
}
</style>
