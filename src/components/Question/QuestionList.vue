<script setup>
  import { ref } from "vue";
  import DeleteButton from "../Button/DeleteButton.vue";
  import UpdateQuestionButton from "../Button/UpdateQuestionButton.vue";
  import useQuestionStore from "../../stores/question";
  import { storeToRefs } from "pinia";

  const questionStore = useQuestionStore();
  let { questions } = storeToRefs(questionStore);

  const deleteOneQuestion = async (id) => {
    questions.value = await questionStore.deleteOneQuestionHandle(id);
  };

  const updateOneQuestion = async (dataToUpdate) => {
    // console.log("dataToUpdate :>> ", dataToUpdate);

    await questionStore.updateOneQuestionHandle(
      dataToUpdate.id,
      dataToUpdate.question
    );
  };
</script>

<template>
  <div>
    <div
      v-for="(question, index) in questions"
      :key="index"
      class="max-w-md mx-auto my-3 overflow-hidden bg-white shadow-c rounded-xl md:max-w-2xl"
    >
      <!-- !TOP -->
      <div class="md:flex">
        <!-- ! LEFT -->
        <div class="md:shrink-0">
          <a
            :href="question.imageURL"
            target="_blank"
          >
            <img
              class="object-contain w-full h-48 md:h-full md:w-48"
              :src="question.imageURL"
              alt="Question image"
            />
          </a>
        </div>

        <!-- ! RIGHT -->
        <div class="p-8">
          <div
            class="text-sm font-semibold tracking-wide text-indigo-500 uppercase"
          >
            Câu hỏi {{ question.code }} - {{ question.level }}
          </div>
          <span
            class="block mt-1 text-lg font-medium leading-tight text-black"
            >{{ question.content }}</span
          >
          <!-- Đáp án -->
          <div class="mt-4">
            <div
              v-for="(option, index) in question.options"
              :key="index"
              class="p-2 mt-2 border rounded cursor-pointer"
              :class="{
                'bg-blue-200': question.correctAnswer == option.numbering,
              }"
            >
              {{ option.answer }} -
              {{ question.correctAnswer == option.numbering }}
            </div>
          </div>
        </div>
      </div>

      <!-- !EDIT -->
      <div class="flex justify-end gap-4 p-8">
        <DeleteButton
          :idObject="question._id"
          @delete="deleteOneQuestion"
        />
        <UpdateQuestionButton
          :index="index"
          @update="updateOneQuestion"
        />
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
