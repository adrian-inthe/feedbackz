<script lang="ts" setup>
defineProps({
  label: {
    type: String,
    required: true,
  },

  type: {
    type: String as () => "primary" | "secondary",
    required: true,
  },
});

const emit = defineEmits<{ (e: "click"): void }>();
</script>

<template>
  <button :class="type" @click="emit('click')">{{ label }}</button>
</template>

<style lang="postcss" scoped>
button {
  @apply text-sm px-4 py-2 rounded;
}

.primary {
  @apply bg-emerald-400 text-white font-bold;
}

.secondary {
  @apply bg-slate-200 text-slate-800 font-medium text-sm;
}
</style>
