<script lang="ts" setup>
import { useFeedbackStore } from "@/stores/feedbackStore.ts";
import { computed } from "vue";

const feedbackStore = useFeedbackStore();
const filterByType = computed({
  get: () => feedbackStore.filterByType,
  set: (value: SortBy) => feedbackStore.setFilterByType(value),
});
</script>

<template>
  <label class="text-medium text-xs" for="filter">Filter</label>
  <select
    id="filter"
    v-model="filterByType"
    class="ml-2 bg-slate-200 rounded w-24"
  >
    <option disabled selected value="">Type</option>
    <option value="">All</option>
    <option value="Bug">Bug</option>
    <option value="Suggestion">Suggestion</option>
  </select>
</template>

<style lang="postcss" scoped>
select,
option {
  @apply font-medium text-xs text-slate-500 px-2 py-0.5;
}
</style>
