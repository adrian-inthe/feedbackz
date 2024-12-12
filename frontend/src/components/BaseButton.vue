<script lang="ts" setup>
defineProps({
  label: {
    type: String,
    required: true,
  },

  type: {
    type: String as () => "primary" | "secondary" | "disabled",
    required: true,
  },
});

const emit = defineEmits<{ (e: "click"): void }>();
</script>

<template>
  <button
    :class="type"
    :disabled="type === 'disabled' ? true : undefined"
    @click="emit('click')"
  >
    {{ label }}
  </button>
</template>

<style lang="postcss" scoped>
button {
  @apply text-sm px-4 py-2 rounded transition-all duration-200;
}

.primary {
  @apply bg-emerald-400 text-white font-bold hover:bg-emerald-300;
}

.secondary {
  @apply bg-slate-200 text-slate-800 font-medium text-sm hover:bg-slate-100;
}

.disabled {
  @apply bg-slate-200 text-white font-medium text-sm;
}
</style>
