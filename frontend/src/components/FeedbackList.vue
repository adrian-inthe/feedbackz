<script lang="ts" setup>
import { onMounted } from "vue";
import { useFeedbackStore } from "../stores/feedbackStore";

const feedbackStore = useFeedbackStore();

onMounted(() => {
  feedbackStore.getFeedbackList();
});
</script>

<template>
  <div>
    <h2 class="text-xl">Feedback List</h2>

    <p v-if="feedbackStore.loadingList">Loading…</p>
    <p v-if="feedbackStore.listError" class="text-red-500">
      {{ feedbackStore.listError }}
    </p>

    <div v-if="!feedbackStore.loadingList && !feedbackStore.listError">
      <div
        v-for="feedback in feedbackStore.feedbackList"
        :key="feedback._id"
        class="border my-2 p-4 max-w-xl"
      >
        <div>Date: {{ feedback.createdAt }}</div>
        <div>Type: {{ feedback.type }}</div>
        <div>Name: {{ feedback.name }}</div>
        <div>Email: {{ feedback.email }}</div>
        <p>Message: {{ feedback.message }}</p>
      </div>
    </div>
  </div>
</template>
