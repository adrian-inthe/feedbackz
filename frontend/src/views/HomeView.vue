<script lang="ts" setup>
import FeedbackForm from "../components/FeedbackForm.vue";
import FeedbackList from "../components/FeedbackList.vue";
import { ref } from "vue";
import BaseModal from "../components/BaseModal.vue";
import BaseButton from "../components/BaseButton.vue";
import FeedbackDetails from "@/components/FeedbackDetails.vue";
import { useFeedbackStore } from "@/stores/feedbackStore.ts";
import BaseHeader from "@/components/BaseHeader.vue";

const feedbackStore = useFeedbackStore();
const showFormModal = ref(false);
</script>

<template>
  <div class="flex flex-col h-screen">
    <BaseHeader>
      <BaseButton
        label="New feedback"
        type="primary"
        @click="showFormModal = true"
      />
    </BaseHeader>
    <div class="flex-1 flex">
      <div
        class="w-96 bg-gray-50 overflow-y-auto p-1 border-r border-slate-200"
      >
        <FeedbackList />
      </div>
      <div class="flex-1 bg-white p-6 flex justify-center">
        <div class="w-full max-w-3xl">
          <FeedbackDetails v-if="feedbackStore.selectedFeedback" />
        </div>
      </div>
    </div>
  </div>
  <BaseModal v-model:show="showFormModal">
    <template #title>Add new feedback</template>
    <template #body>
      <FeedbackForm />
    </template>
  </BaseModal>
</template>
