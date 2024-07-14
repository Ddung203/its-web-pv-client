<script setup>
  import { ref } from "vue";

  const props = defineProps({
    questions: {
      type: Object,
      required: true,
    },

    role: {
      type: String,
      required: true,
    },
  });

  const answers = ref([]);

  if (props.questions) {
    answers.value = props.questions.options.map((option) => {
      return {
        text: option.answer,
        isCorrect: false,
        selected: false,
      };
    });
  }

  const selectAnswer = (answer) => {
    answers.value.forEach((ans) => (ans.selected = false));

    if (props.role !== "user") return;
    answer.selected = true;
  };
</script>

<template>
  <div
    class="max-w-md mx-auto my-3 overflow-hidden bg-white shadow-c rounded-xl md:max-w-2xl"
  >
    <div class="md:flex">
      <div class="md:shrink-0">
        <a
          :href="props.questions.imageURL"
          target="_blank"
        >
          <img
            class="object-contain w-full h-48 md:h-full md:w-48"
            :src="props.questions.imageURL"
            alt="Question image"
          />
        </a>
      </div>
      <div class="p-8">
        <div
          class="text-sm font-semibold tracking-wide text-indigo-500 uppercase"
        >
          Câu hỏi {{ props.questions.code }}
        </div>
        <span
          class="block mt-1 text-lg font-medium leading-tight text-black hover:underline"
          >{{ props.questions.content }}</span
        >
        <!-- Đáp án -->
        <div class="mt-4">
          <div
            v-for="(answer, index) in answers"
            :key="index"
            class="p-2 mt-2 border rounded cursor-pointer"
            :class="{ 'bg-blue-200': answer.selected }"
            @click="selectAnswer(answer)"
          >
            {{ answer.text }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .bg-blue-200 {
    background-color: #bbe9ff;
  }

  .shadow-c {
    box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
  }
</style>
