<script lang="ts" setup>
import { inject, onMounted, ref } from "vue";
import { useFeedbackStore } from "../stores/feedbackStore";
import { feedbackCreationSchema } from "../validation/FeedbackCreationSchema.ts";
import { ValidationError } from "yup";

const feedbackStore = useFeedbackStore();

const name = ref<string>("");
const email = ref<string>("");
const type = ref<"" | "Bug" | "Suggestion">("");
const message = ref<string>("");

const fieldErrors = ref({
  name: "",
  email: "",
  type: "",
  message: "",
});
const formError = ref("");

onMounted(() => {
  resetErrors();
  resetForm();
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
        fieldErrors.value[error.path as keyof typeof fieldErrors.value] =
          error.message;
      });
    } else if (validationErrors instanceof Error) {
      formError.value = validationErrors.message;
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
  formError.value = "";
  fieldErrors.value = { name: "", email: "", type: "", message: "" };
}

const closeModal = inject<() => void>("closeModal");

async function sendFeedback() {
  await submitForm();
  if (
    !formError.value &&
    !Object.values(fieldErrors.value).find((value) => value !== "")
  ) {
    closeModal?.();
  }
}
</script>

<template>
  <div class="mb-5">
    <div>
      <label for="name">Name</label>
      <input
        id="name"
        v-model="name"
        :class="{ 'border-red-500': fieldErrors.name }"
        type="text"
      />
      <p v-if="fieldErrors.name" class="error">{{ fieldErrors.name }}</p>
    </div>

    <div>
      <label for="email">Email</label>
      <input
        id="email"
        v-model="email"
        :class="{ 'border-red-500': fieldErrors.email }"
        type="email"
      />
      <p v-if="fieldErrors.email" class="error">{{ fieldErrors.email }}</p>
    </div>

    <div>
      <label for="type">Type</label>
      <select id="type" v-model="type" class="border block">
        <option value="">Select type</option>
        <option value="Bug">Bug</option>
        <option value="Suggestion">Suggestion</option>
      </select>
      <p v-if="fieldErrors.type" class="error">{{ fieldErrors.type }}</p>
    </div>

    <div>
      <label for="message">Message</label>
      <textarea
        id="message"
        v-model="message"
        :class="{ 'border-red-500': fieldErrors.message }"
        rows="4"
      />
      <p v-if="fieldErrors.message" class="error">{{ fieldErrors.message }}</p>
    </div>
    <p class="error">
      {{ formError }}
    </p>
    <div class="flex justify-end space-x-4 mt-5">
      <button
        class="bg-slate-200 text-slate-800 font-medium text-sm"
        type="button"
        @click="closeModal"
      >
        Cancel
      </button>
      <button class="bg-emerald-400 text-white font-bold" @click="sendFeedback">
        Send feedback
      </button>
    </div>
  </div>
</template>

<style scoped>
label {
  @apply mt-5 font-medium text-base block;
}

input,
select,
textarea {
  @apply block border border-slate-200 rounded;
}

input,
select {
  @apply h-9 w-72 pl-3 bg-white text-sm font-medium text-slate-600;
}

option {
  @apply p-5 m-5;
}

textarea {
  @apply w-full h-44 p-2;
}

button {
  @apply text-sm px-4 py-2 rounded;
}

.error {
  @apply text-red-500 text-sm mt-2;
}
</style>
