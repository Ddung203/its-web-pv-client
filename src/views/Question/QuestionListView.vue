<script setup>
  import { onMounted, ref } from "vue";
  import HTTP from "@/helper/axiosInstance.js";
  import UploadImage from "@/components/Image/UploadImage.vue";
  import QuestionCardCanEdit from "@/components/Question/QuestionCardCanEdit.vue";
  import ScrollToTop from "@/components/Button/ScrollToTop.vue";
  import useAuthStore from "../../stores/auth";
  import showNotification from "../../utils/showNotification";
  import { useToast } from "primevue/usetoast";
  import TitleBanner from "../../components/Banner/TitleBanner.vue";

  const authStore = useAuthStore();
  const receivedQuestions = ref([]);
  const toast = useToast();

  const getQuestionsHandle = async () => {
    try {
      const response = await HTTP.get("/question/list");
      console.log("response :>> ", response);
      receivedQuestions.value = response.payload?.questions?.data;
      // if (response && response?.success) {
      //   showNotification(
      //     toast,
      //     "success",
      //     "Thông báo",
      //     response?.message || "Nhập câu hỏi thành công!",
      //     3000
      //   );
      //   handleQuestionsReset();
      // }
    } catch (error) {
      // showNotification(
      //   toast,
      //   "error",
      //   "Thông báo lỗi",
      //   error?.error?.message.slice(14) || "Tài khoản không có quyền!",
      //   3000
      // );
      console.log("error :>> ", error);
      return;
    }
  };
</script>

<template>
  <Toast />

  <div>
    <div class="title">
      <TitleBanner :title="'Danh sách câu hỏi'"></TitleBanner>
    </div>

    <Button @click="getQuestionsHandle">GET</Button>

    <div class="qCard">
      <div v-if="receivedQuestions.length !== 0">
        <template
          v-for="question in receivedQuestions"
          :key="question.id"
        >
          <!-- dev -->
          <QuestionCardCanEdit
            :role="'admin'"
            :question="question"
          ></QuestionCardCanEdit>
          <!-- <QuestionCardCanEdit
            :role="authStore?.getRole"
            :questions="question"
          ></QuestionCardCanEdit> -->
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
