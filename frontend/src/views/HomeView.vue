<script lang="ts" setup>
import FeedbackForm from "../components/FeedbackForm.vue";
import FeedbackList from "../components/FeedbackList.vue";
import { ref } from "vue";
import BaseModal from "../components/BaseModal.vue";

const showFormModal = ref(false);
</script>

<template>
  <button @click="showFormModal = true">New feedback</button>
  <div class="container p-6">
    <FeedbackList />
  </div>
  <BaseModal v-model:show="showFormModal">
    <template #title>Add new feedback</template>
    <template #body>
      <FeedbackForm />
    </template>
  </BaseModal>
</template>
