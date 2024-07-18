<script setup>
  import { onMounted, ref } from "vue";
  import HTTP from "@/helper/axiosInstance.js";
  import UploadImage from "@/components/Image/UploadImage.vue";
  import QuestionCardCanEdit from "@/components/Question/QuestionCardCanEdit.vue";
  import ScrollToTop from "@/components/Button/ScrollToTop.vue";
  import useAuthStore from "../../stores/auth";
  import useQuestionStore from "../../stores/question";
  import showNotification from "../../utils/showNotification";
  import { useToast } from "primevue/usetoast";
  import TitleBanner from "../../components/Banner/TitleBanner.vue";
  import QuestionList from "../../components/Question/QuestionList.vue";
  import { storeToRefs } from "pinia";

  const toast = useToast();
  const authStore = useAuthStore();
  const questionStore = useQuestionStore();
  const { questions } = storeToRefs(questionStore);

  const getQuestionsHandle = async () => {
    try {
      await questionStore.getQuestionsHandle();

      if (questions.value.length > 0) {
        showNotification(
          toast,
          "info",
          "Thông báo",
          "Lấy danh sách câu hỏi thành công!",
          1000
        );
      }
    } catch (error) {
      showNotification(
        toast,
        "error",
        "Thông báo",
        "Xảy ra lỗi khi lấy danh sách câu hỏi!",
        2000
      );
      console.log("error :>> ", error);
      return;
    }
  };

  onMounted(() => {
    getQuestionsHandle();
  });
</script>

<template>
  <Toast />

  <div>
    <!-- TitleBanner -->
    <div class="title">
      <TitleBanner :title="'Danh sách câu hỏi'"></TitleBanner>
    </div>

    <!-- Question List -->

    <div v-if="questions">
      <QuestionList></QuestionList>
    </div>

    <!-- ScrollToTop -->
    <ScrollToTop></ScrollToTop>
  </div>
</template>

<style scoped>
  /*  */
</style>
