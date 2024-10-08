import { computed, ref } from "vue";
import { defineStore } from "pinia";
import HTTP from "../helper/axiosInstance";

const useQuestionStore = defineStore(
  "question",
  () => {
    const questions = ref([]);
    const getQuestions = computed(() => questions.value);

    async function getQuestionsHandle() {
      try {
        const response = await HTTP.get("/question/list?limit=500");

        if (response?.success) {
          questions.value = response?.payload?.questions?.data;
        } else {
          console.error("Invalid response structure", response);
        }
        return questions.value;
      } catch (error) {
        console.log("error :>> ", error);
        throw error;
      }
    }

    async function deleteOneQuestionHandle(id) {
      if (!id) {
        console.error("Invalid id");
        return;
      }

      if (questions.value.length > 0) {
        try {
          const response = await HTTP.delete(`/question/delete/${id}`);
          if (response.success) {
            questions.value = await getQuestionsHandle();
          } else {
            console.error("Failed to delete question", response);
          }
        } catch (error) {
          console.log("error :>> ", error);
          throw error;
        }
        return questions.value;
      }
    }

    async function updateOneQuestionHandle(id, data) {
      if (!id || !data) {
        console.error("Invalid id or data");
        return;
      }

      if (questions.value.length > 0) {
        try {
          const response = await HTTP.put(`/question/update/${id}`, data);
          if (response.success) {
            questions.value = await getQuestionsHandle();
          } else {
            console.error("Failed to update question", response);
          }
        } catch (error) {
          console.log("error :>> ", error);
          throw error;
        }
        return questions.value;
      }
    }

    return {
      questions,
      getQuestions,
      getQuestionsHandle,
      deleteOneQuestionHandle,
      updateOneQuestionHandle,
    };
  },
  {
    persist: true,
  }
);

export default useQuestionStore;
