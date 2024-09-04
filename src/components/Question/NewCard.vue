<script setup>
  import { ref } from "vue";

  const props = defineProps({
    question: {
      type: Object,
      required: true,
    },
    index: {
      type: Number,
    },
    count: {
      type: Number,
    },
  });

  const emit = defineEmits(["userSelected"]);

  const selectedOption = ref(props.question.userAnswer);

  const selectAnswer = (userAnswer) => {
    selectedOption.value = userAnswer;

    emit("userSelected", { index: props.index, userAnswer: userAnswer });
  };
</script>

<template>
  <div class="container px-4 mx-auto">
    <div
      class="max-w-[712px] min-h-[420px] flex flex-col py-8 px-6 bg-white c-box-shadow rounded-xl mx-auto my-10"
    >
      <!-- !header -->
      <div class="grid grid-cols-2 gap-0 mb-4 header">
        <div class="flex items-center justify-start font-semibold">
          <span class="text-[#6366f1]">Câu hỏi {{ props.index + 1 }}</span>
        </div>
        <div class="flex items-center justify-end">
          <span class="text-[#939bb4]"
            >{{ props.index + 1 }}/{{ props.count }}</span
          >
        </div>
      </div>

      <!-- !content -->
      <div class="flex flex-col gap-5 pt-5 pb-[60px] content">
        <div class="h-[150px] flex justify-center">
          <img
            class="block h-[150px] object-contain"
            :src="question.imageURL"
            alt="Question Image"
            title="Click to zoom out"
          />
        </div>
        <p>{{ question.content }}</p>
      </div>

      <!-- !answer -->
      <div class="answer">
        <div class="pb-5">
          <span class="font-semibold text-[#586380]">
            Chọn câu trả lời đúng nhất
          </span>
        </div>
        <div class="flex flex-col gap-4">
          <div class="grid grid-cols-1 grid-rows-2 gap-4 md:grid-cols-2">
            <button
              v-for="option in props.question.options"
              :key="option.numbering"
              @click="selectAnswer(option.numbering)"
              :class="{
                'selected-answer': selectedOption === option.numbering,
              }"
              class="answer-option"
            >
              {{ option.answer }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .c-box-shadow {
    box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
      rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
  }

  .answer-option {
    @apply bg-gray-50 hover:bg-gray-200 text-black font-semibold py-3 px-4 rounded;
    transition: background-color 0.3s;
  }

  .selected-answer {
    background-color: #6366f1;
    color: white;
  }
</style>
