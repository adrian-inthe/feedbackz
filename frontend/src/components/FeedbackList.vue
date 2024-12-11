<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { useFeedbackStore } from "../stores/feedbackStore";

const listError = ref("");
const feedbackStore = useFeedbackStore();

onMounted(async () => {
  try {
    await feedbackStore.getFeedbackList();
  } catch (error) {
    if (error instanceof Error) {
      listError.value = error.message;
    }
  }
});
</script>

<template>
  <div>
    <h2 class="text-xl">Feedback List</h2>

    <p v-if="feedbackStore.loadingList">Loading…</p>
    <p v-if="listError" class="text-red-500">
      {{ listError }}
    </p>

    <div v-if="!feedbackStore.loadingList && !listError">
      <div
        v-for="feedback in feedbackStore.feedbackList"
        :key="feedback._id"
        class="border my-2 p-4 max-w-xl"
      >
        <div>Date: {{ feedback.createdAt }}</div>
        <div>Type: {{ feedback.type }}</div>
        <div>Name: {{ feedback.name }}</div>
        <div>Email: {{ feedback.email }}</div>
        <div>Title: {{ feedback.title }}</div>
        <p>Message: {{ feedback.message }}</p>
      </div>
    </div>
  </div>
</template>
