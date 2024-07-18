import { computed, ref } from "vue";
import { defineStore } from "pinia";
import HTTP from "../helper/axiosInstance";

const useQuestionStore = defineStore("question", () => {
  const questions = ref([]);
  const getQuestions = computed(() => questions.value);

  async function getQuestionsHandle() {
    try {
      const response = await HTTP.get("/question/list");

      questions.value = response?.payload?.questions?.data;

      return questions.value;
    } catch (error) {
      console.log("error :>> ", error);
      throw error;
    }
  }

  async function deleteOneQuestionHandle(id) {
    if (questions.value.length > 0) {
      try {
        await HTTP.delete(`/question/delete/${id}`);
        await getQuestionsHandle();
      } catch (error) {
        console.log("error :>> ", error);
        throw error;
      }
      return questions.value;
    }
  }

  async function updateOneQuestionHandle(id, data) {
    if (questions.value.length > 0) {
      try {
        await HTTP.put(`/question/update/${id}`, data);
        await getQuestionsHandle();
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
});

export default useQuestionStore;
