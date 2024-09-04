import { computed, ref } from "vue";
import { defineStore } from "pinia";
import HTTP from "../helper/axiosInstance";

const usePlayStore = defineStore(
  "play",
  () => {
    const play = ref(null);
    const questions = ref([]);

    const getPlay = computed(() => play.value);
    const getQuestions = computed(() => questions.value);

    const startPlay = async () => {
      const response = await HTTP.get("/play/start");

      play.value = response?.payload?.play;
      questions.value = response?.payload?.questions;
    };

    const updateOneQuestion = (index, newQuestion) => {
      questions.value[index] = newQuestion;
    };

    const finishTest = async () => {
      const response = await HTTP.post("/play/end", {
        answerArray: questions.value,
      });

      return response?.payload;
    };

    return {
      play,
      questions,

      getPlay,
      getQuestions,
      startPlay,
      updateOneQuestion,
      finishTest,
    };
  },
  {
    persist: true,
  }
);

export default usePlayStore;
