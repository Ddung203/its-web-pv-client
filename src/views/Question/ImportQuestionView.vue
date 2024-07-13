<script setup>
  import { ref } from "vue";
  import HTTP from "@/helper/axiosInstance.js";
  import ImportQuestion from "@/components/Question/ImportQuestion.vue";
  import UploadImage from "@/components/Image/UploadImage.vue";
  import QuestionCard from "@/components/Question/QuestionCard.vue";
  import QuestionCardCanEdit from "@/components/Question/QuestionCardCanEdit.vue";
  import BackToHome from "@/components/Button/BackToHome.vue";
  import ScrollToTop from "@/components/Button/ScrollToTop.vue";
  import useAuthStore from "../../stores/auth";

  const authStore = useAuthStore();
  const receivedQuestions = ref([]);

  const saveQuestionsHandle = async () => {
    const bodyData = { questions: receivedQuestions.value };

    const response = await HTTP.post("/question/insert", bodyData);

    console.log("responsev :>> ", response);
  };

  const handleQuestionsUpdated = (questions) => {
    receivedQuestions.value = questions;
  };

  const handleQuestionsReset = () => {
    receivedQuestions.value = [];
  };
</script>

<template>
  <div>
    <div class="import">
      <ImportQuestion
        @questions-updated="handleQuestionsUpdated"
      ></ImportQuestion>
    </div>

    <div
      v-if="receivedQuestions.length === 0"
      class="flex justify-end gap-4 px-8 py-4 actions"
    >
      <BackToHome></BackToHome>
    </div>

    <div
      v-if="receivedQuestions.length !== 0"
      class="flex justify-between gap-4 px-8 py-4 actions"
    >
      <Button
        @click="handleQuestionsReset"
        severity="danger"
        outlined
        >Hủy nhập</Button
      >
      <Button
        severity="info"
        @click="saveQuestionsHandle"
        >Lưu lại</Button
      >
    </div>

    <div class="qCard">
      <div v-if="receivedQuestions.length !== 0">
        <template
          v-for="question in receivedQuestions"
          :key="question.id"
        >
          <!-- dev -->
          <!-- <QuestionCard
            :role="'user'"
            :questions="question"
          ></QuestionCard>
          -->
          <QuestionCardCanEdit
            :role="'admin'"
            :questions="question"
          ></QuestionCardCanEdit>
          <!-- <QuestionCard
            :role="authStore?.getRole"
            :questions="question"
          ></QuestionCard> -->
        </template>
      </div>
    </div>

    <!-- ScrollToTop -->
    <ScrollToTop></ScrollToTop>
    <!-- <UploadImage></UploadImage> -->
  </div>
</template>

<style scoped>
  /*  */
</style>
