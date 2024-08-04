<script setup>
  import { ref } from "vue";

  // const

  // Danh sách câu hỏi và đáp án
  const questions = ref([
    {
      id: 1,
      text: "Agreement or contract between countries?",
      image:
        "https://firebasestorage.googleapis.com/v0/b/upload-images-42481.appspot.com/o/logos%2FLogo_bo%203%20goc.png?alt=media&token=aeb9dfc2-e57d-403a-a884-9ffd9ed2fb53",
      options: [
        {
          id: "A",
          text: "Option 1: or contract between countries",
          isCorrect: true,
        },
        { id: "B", text: "Option 2", isCorrect: false },
        { id: "C", text: "Option 3", isCorrect: false },
        { id: "D", text: "Option 4", isCorrect: false },
      ],
    },
    // Thêm nhiều câu hỏi nếu cần
  ]);

  const currentQuestionIndex = ref(0);

  // Trạng thái của đáp án đã chọn
  const selectedOption = ref(null);

  // Hàm xử lý khi người dùng chọn đáp án
  const selectAnswer = (option) => {
    selectedOption.value = option;
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
          <span class="text-[#6366f1]"
            >Câu hỏi {{ currentQuestionIndex + 1 }}</span
          >
        </div>
        <div class="flex items-center justify-end">
          <span class="text-[#939bb4]"
            >{{ currentQuestionIndex + 1 }}/{{ questions.length }}</span
          >
        </div>
      </div>

      <!-- !content -->
      <div class="flex flex-col gap-5 pt-5 pb-[60px] content">
        <div class="h-[150px] flex justify-center">
          <img
            class="block h-[150px] object-contain"
            :src="questions[currentQuestionIndex].image"
            alt="Question Image"
            title="Click to zoom out"
          />
        </div>
        <p>{{ questions[currentQuestionIndex].text }}</p>
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
              v-for="option in questions[currentQuestionIndex].options"
              :key="option.id"
              @click="selectAnswer(option)"
              :class="{ 'selected-answer': selectedOption === option }"
              class="answer-option"
            >
              {{ option.text }}
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
