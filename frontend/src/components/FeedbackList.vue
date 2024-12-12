<script lang="ts" setup>
import { computed, onMounted, ref, watch } from "vue";
import { useFeedbackStore } from "../stores/feedbackStore";
import FeedbackListItem from "@/components/FeedbackListItem.vue";
import FeedbackListFilter from "@/components/FeedbackListFilter.vue";
import FeedbackListSort from "@/components/FeedbackListSort.vue";
import FeedbackListPager from "@/components/FeedbackListPager.vue";

const feedbackStore = useFeedbackStore();
const listError = ref("");
const list = computed(() => feedbackStore.feedbackList);

onMounted(async () => {
  try {
    await feedbackStore.getFeedbackList();
  } catch (error) {
    if (error instanceof Error) {
      listError.value = error.message;
    }
  }
});

watch([feedbackStore.filterByType, feedbackStore.sortBy], async () => {
  try {
    await feedbackStore.setPage(1);
  } catch (error) {
    if (error instanceof Error) {
      listError.value = error.message;
    }
  }
});
</script>

<template>
  <div :style="{ height: 'calc(100vh - 96px)' }" class="flex flex-col">
    <div
      class="h-12 border-b border-b-slate-200 w-full flex justify-between items-center px-4"
    >
      <div>
        <FeedbackListFilter />
      </div>
      <div>
        <FeedbackListSort />
      </div>
    </div>

    <div class="flex-grow p-1 overflow-auto">
      <div
        v-if="feedbackStore.loadingList"
        class="flex justify-center items-center mt-10"
      >
        <img
          alt="Loader"
          class="h-10 w-auto animate-bounce"
          src="@/assets/logo.png"
        />
      </div>
      <p v-else-if="listError" class="text-red-500 text-center m-5">
        {{ listError }}
      </p>
      <p v-else-if="!feedbackStore.feedbackList.length" class="text-center m-5">
        No feedbacks found, please create a new one.
      </p>

      <div v-if="!feedbackStore.loadingList && !listError">
        <div
          v-for="feedback in list"
          :key="feedback._id"
          :class="{
            'bg-slate-200': feedbackStore.selectedFeedback === feedback,
          }"
          class="my-2 p-2 max-w-xl rounded-md hover:bg-slate-200 cursor-pointer flex"
          @click="feedbackStore.selectFeedback(feedback)"
        >
          <FeedbackListItem :feedback="feedback" />
        </div>
      </div>
    </div>

    <div
      class="h-12 border-t border-t-slate-200 w-full flex justify-between items-center px-4 py-5"
    >
      <FeedbackListPager />
    </div>
  </div>
</template>
