<script setup>
  import { onMounted, reactive } from "vue";
  import ScrollToTop from "@/components/Button/ScrollToTop.vue";
  import useAuthStore from "../../stores/auth";
  import useQuestionStore from "../../stores/question";
  import showNotification from "../../utils/showNotification";
  import { useToast } from "primevue/usetoast";
  import QuestionList from "../../components/Question/QuestionList.vue";
  import { storeToRefs } from "pinia";

  import Toolbar from "primevue/toolbar";

  const toast = useToast();
  const authStore = useAuthStore();
  const questionStore = useQuestionStore();
  const { questions } = storeToRefs(questionStore);

  const getQuestionsHandle = async () => {
    try {
      await questionStore.getQuestionsHandle();

      if (questions.value.length > 0) {
        // showNotification(
        //   toast,
        //   "info",
        //   "Thông báo",
        //   "Lấy danh sách câu hỏi thành công!",
        //   1000
        // );
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
      <Toolbar class="mb-4">
        <template #start>
          <Button
            label="Thêm"
            icon="pi pi-plus"
            severity="success"
            class="mr-2"
            @click="openNewQuestion"
          />
          <Button
            label="Xóa câu hỏi"
            icon="pi pi-trash"
            severity="danger"
            @click="confirmDeleteSelectedQuestions"
            :disabled="!selectedQuestions || !selectedQuestions.length"
          />
        </template>
        <template #end>
          <div class="pr-5">
            <Button
              :disabled="loading"
              :icon="loading ? 'pi pi-refresh pi-spin' : 'pi pi-refresh'"
              @click="toggleLoading"
            />
          </div>
          <Button
            label="Export"
            icon="pi pi-upload"
            severity="help"
            @click="exportQuestionsCSV"
          />
        </template>
      </Toolbar>
    </div>

    <!-- T -->
    <div class="px-[1rem] md:px-[2rem] pb-[1rem]">
      <div
        class="grid md:grid-cols-2 grid-cols-1 grid-rows-1 gap-4 border-b border-b-[#e2e8f0] pb-[10px]"
      >
        <div class="flex items-center justify-center md:justify-start">
          <span class="text-2xl font-semibold uppercase text-[#334155]"
            >Danh sách câu hỏi</span
          >
        </div>
        <div class="flex justify-center md:justify-end">
          <IconField iconPosition="left">
            <InputIcon>
              <i class="pi pi-search" />
            </InputIcon>
            <InputText placeholder="Tìm kiếm câu hỏi..." />
          </IconField>
        </div>
      </div>
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
  .title {
    padding: 0 1rem;
    padding-top: 1rem;
  }
</style>
