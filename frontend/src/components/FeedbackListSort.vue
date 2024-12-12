<script lang="ts" setup>
import { inject } from "vue";

const sortBy = inject("sortBy");
const emit = defineEmits(["update:sortBy"]);
</script>

<template>
  <label class="text-medium text-xs" for="sort">Sort</label>
  <select
    id="sort"
    v-model="sortBy"
    class="ml-2 bg-slate-200 rounded"
    @change="emit('update:sortBy', sortBy)"
  >
    <option value="date.asc">Date (Asc)</option>
    <option value="date.desc">Date (Desc)</option>
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
