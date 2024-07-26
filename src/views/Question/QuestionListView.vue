<script setup>
  import { onMounted, ref, watch } from "vue";
  import ScrollToTop from "@/components/Button/ScrollToTop.vue";
  import useQuestionStore from "../../stores/question";
  import showNotification from "../../utils/showNotification";
  import { useToast } from "primevue/usetoast";
  import QuestionList from "../../components/Question/QuestionList.vue";
  import { storeToRefs } from "pinia";
  import Toolbar from "primevue/toolbar";
  import Loading from "../../components/Loading/Loading.vue";
  import Paginator from "primevue/paginator";
  import { debounce } from "lodash";
  import router from "@/routes/index.js";

  const toast = useToast();
  const questionStore = useQuestionStore();
  const { questions } = storeToRefs(questionStore);
  const loading = ref(false);
  const first = ref(0);
  const rowsPerPage = ref(10);
  const totalRecords = ref(0);
  const searchValue = ref("");
  const filteredQuestions = ref([]);

  const getQuestionsHandle = async () => {
    try {
      loading.value = true;
      await questionStore.getQuestionsHandle();
      filteredQuestions.value = questions.value;

      totalRecords.value = questions.value.length;

      if (questions.value.length > 0) {
        showNotification(
          toast,
          "info",
          "Thông báo",
          "Lấy danh sách câu hỏi thành công!",
          1000
        );
      }

      loading.value = false;
    } catch (error) {
      loading.value = false;
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

  const toggleLoading = async () => {
    await getQuestionsHandle();
  };

  const exportQuestionsCSV = () => {};

  const openNewQuestion = () => {
    router.push("/import-questions");
  };

  const currentData = ref(
    filteredQuestions.value.slice(first.value, first.value + rowsPerPage.value)
  );

  // Hàm xử lý khi trang thay đổi
  function onPageChange(event) {
    first.value = event.first;
    rowsPerPage.value = event.rows;

    const start = first.value;
    const end = start + rowsPerPage.value;

    currentData.value = filteredQuestions.value.slice(start, end);
  }

  const debouncedSearch = debounce(() => {
    first.value = 0;

    if (searchValue.value === "") {
      filteredQuestions.value = questions.value;
    } else {
      filteredQuestions.value = questions.value.filter((item) => {
        return item.content.includes(searchValue.value);
      });
    }

    totalRecords.value = filteredQuestions.value.length;
    currentData.value = filteredQuestions.value.slice(
      first.value,
      first.value + rowsPerPage.value
    );
  }, 500);

  watch(searchValue, debouncedSearch);

  watch(filteredQuestions, () => {
    currentData.value = filteredQuestions.value.slice(
      first.value,
      first.value + rowsPerPage.value
    );
  });

  watch(questions, () => {
    first.value = 0;

    if (searchValue.value === "") {
      filteredQuestions.value = questions.value;
    } else {
      filteredQuestions.value = questions.value.filter((item) => {
        return item.content.includes(searchValue.value);
      });
    }

    totalRecords.value = filteredQuestions.value.length;
    currentData.value = filteredQuestions.value.slice(
      first.value,
      first.value + rowsPerPage.value
    );
  });

  onMounted(() => {
    getQuestionsHandle();
  });
</script>

<template>
  <Toast />
  <Loading v-if="loading"></Loading>
  <div>
    <!-- TitleBanner -->
    <div class="title">
      <Toolbar class="mb-4">
        <template #start>
          <Button
            label="Thêm câu hỏi"
            icon="pi pi-plus"
            severity="success"
            class="mr-2"
            @click="openNewQuestion"
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
            disabled
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
            <InputText
              v-model="searchValue"
              placeholder="Tìm kiếm câu hỏi..."
            />
          </IconField>
        </div>
      </div>
    </div>

    <!-- filter -->
    <div class="card">
      <Paginator
        :rows="rowsPerPage"
        :totalRecords="totalRecords"
        :first="first"
        @page="onPageChange"
        template="FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
        currentPageReportTemplate="Showing {first} to {last} of {totalRecords}"
      />
    </div>

    <!-- Question List -->

    <div v-if="currentData">
      <QuestionList :currentData="currentData"></QuestionList>
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
