<script lang="ts" setup>
import { ref } from "vue";
import { useFeedbackStore } from "../stores/feedbackStore";
import { feedbackCreationSchema } from "../validation/FeedbackCreationSchema.ts";
import { ValidationError } from "yup";

const feedbackStore = useFeedbackStore();

const name = ref<string>("");
const email = ref<string>("");
const type = ref<"" | "Bug" | "Suggestion">("");
const message = ref<string>("");

const errors = ref({
  name: "",
  email: "",
  type: "",
  message: "",
});

async function submitForm() {
  resetErrors();
  try {
    const newFeedback = await feedbackCreationSchema.validate(
      {
        name: name.value,
        email: email.value,
        type: type.value,
        message: message.value,
      },
      { abortEarly: false },
    );

    await feedbackStore.addFeedback(newFeedback);
    resetForm();
  } catch (validationErrors) {
    if (validationErrors instanceof ValidationError) {
      validationErrors.inner.forEach((error) => {
        errors.value[error.path as keyof typeof errors.value] = error.message;
      });
    }
  }
}

function resetForm() {
  name.value = "";
  email.value = "";
  type.value = "";
  message.value = "";
}

function resetErrors() {
  errors.value = { name: "", email: "", type: "", message: "" };
}
</script>

<template>
  <div class="mb-5">
    <h2 class="text-xl">New Feedback</h2>
    <form @submit.prevent="submitForm">
      <div>
        <label for="name">Name</label>
        <input
          id="name"
          v-model="name"
          :class="{ 'border-red-500': errors.name }"
          class="border block"
          type="text"
        />
        <p v-if="errors.name" class="text-red-500">{{ errors.name }}</p>
      </div>

      <div>
        <label for="email">Email</label>
        <input
          id="email"
          v-model="email"
          :class="{ 'border-red-500': errors.email }"
          class="border block"
          type="email"
        />
        <p v-if="errors.email" class="text-red-500">{{ errors.email }}</p>
      </div>

      <div>
        <label for="type">Type</label>
        <select id="type" v-model="type" class="border block">
          <option value="">Select</option>
          <option value="Bug">Bug</option>
          <option value="Suggestion">Suggestion</option>
        </select>
        <p v-if="errors.type" class="text-red-500">{{ errors.type }}</p>
      </div>

      <div>
        <label for="message">Message</label>
        <textarea
          id="message"
          v-model="message"
          :class="{ 'border-red-500': errors.message }"
          class="border block"
          rows="4"
        />
        <p v-if="errors.message" class="text-red-500">{{ errors.message }}</p>
      </div>

      <div>
        <button class="bg-gray-200" type="submit">Submit</button>
      </div>
    </form>
    <p class="text-red-500">
      {{ feedbackStore.addError }}
    </p>
  </div>
</template>
