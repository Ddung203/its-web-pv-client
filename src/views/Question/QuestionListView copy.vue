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

  const toast = useToast();
  const authStore = useAuthStore();
  const questionStore = useQuestionStore();
  const receivedQuestions = ref([]);

  const getQuestionsHandle = async () => {
    try {
      await questionStore.getQuestionsHandle();

      receivedQuestions.value = questionStore.getQuestions;
      // questionStore
      // if (response && response?.success) {
      //   showNotification(
      //     toast,
      //     "info",
      //     "Thông báo",
      //     response?.message || "Lấy danh sách câu hỏi thành công!",
      //     1500
      //   );
      // }

      console.log("receivedQuestions.value :>> ", receivedQuestions.value);
    } catch (error) {
      // showNotification(
      //   toast,
      //   "error",
      //   "Thông báo",
      //   error?.error?.message.slice(14) || "Tài khoản không có quyền!",
      //   200
      // );
      console.log("error :>> ", error);
      return;
    }
  };

  // const questionChangedHandle = async (newQuestion) => {
  //   console.log("newQuestion :>> ", newQuestion);
  //   await getQuestionsHandle();
  // };

  onMounted(() => {
    getQuestionsHandle();
  });
</script>

<template>
  <Toast />

  <div>
    <div class="title">
      <TitleBanner :title="'Danh sách câu hỏi'"></TitleBanner>
    </div>

    <div class="qCard">
      <div v-if="receivedQuestions.length !== 0">
        <QuestionCardCanEdit
          :questions="receivedQuestions"
        ></QuestionCardCanEdit>
      </div>
    </div>

    <!-- ScrollToTop -->
    <ScrollToTop></ScrollToTop>
  </div>
</template>

<style scoped>
  /*  */
</style>
