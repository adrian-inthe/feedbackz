<script lang="ts" setup>
import { provide } from "vue";

defineProps({
  show: {
    type: Boolean,
    required: true,
  },
});

const emit = defineEmits(["update:show"]);

function close() {
  emit("update:show", false);
}

provide("closeModal", close);
</script>

<template>
  <div
    v-if="show"
    class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
  >
    <div
      class="relative bg-white border border-slate-200 rounded-md shadow-lg w-[773px]"
    >
      <div class="px-8 py-4 border-b border-slate-200">
        <h2 class="text-2xl font-medium text-slate-800">
          <slot name="title"></slot>
        </h2>
      </div>

      <div class="px-8 pb-4">
        <slot name="body"></slot>
      </div>
    </div>
  </div>
</template>
