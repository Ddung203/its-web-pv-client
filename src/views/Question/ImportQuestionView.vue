<script setup>
  import { ref } from "vue";
  import HTTP from "@/helper/axiosInstance.js";
  import ImportQuestion from "@/components/Question/ImportQuestion.vue";
  import QuestionCard from "@/components/Question/QuestionCard.vue";
  import BackToHome from "@/components/Button/BackToHome.vue";
  import ScrollToTop from "@/components/Button/ScrollToTop.vue";
  import useAuthStore from "../../stores/auth";
  import showNotification from "../../utils/showNotification";
  import { useToast } from "primevue/usetoast";
  import Header from "../../components/Header/Header.vue";
  import Footer from "../../components/Footer/Footer.vue";

  const receivedQuestions = ref([]);
  const toast = useToast();

  const saveQuestionsHandle = async () => {
    const bodyData = { questions: receivedQuestions.value };

    try {
      const response = await HTTP.post("/question/insert", bodyData);

      if (response && response?.success) {
        showNotification(
          toast,
          "success",
          "Thông báo",
          response?.message || "Nhập câu hỏi thành công!",
          3000
        );
        handleQuestionsReset();
      }
    } catch (error) {
      showNotification(
        toast,
        "error",
        "Thông báo lỗi",
        error?.error?.message.slice(14) || "Tài khoản không có quyền!",
        3000
      );
      return;
    }
  };

  const handleQuestionsUpdated = (questions) => {
    receivedQuestions.value = questions;
  };

  const handleQuestionsReset = () => {
    receivedQuestions.value = [];
  };
</script>

<template>
  <Toast />
  <Header></Header>

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
      <BackToHome urlPath="questions"></BackToHome>
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
          <QuestionCard
            :role="'admin'"
            :questions="question"
          ></QuestionCard>
        </template>
      </div>
    </div>

    <!-- ScrollToTop -->
    <ScrollToTop></ScrollToTop>
    <Footer v-if="receivedQuestions.length > 0"></Footer>
  </div>
</template>

<style scoped>
  /*  */
</style>
