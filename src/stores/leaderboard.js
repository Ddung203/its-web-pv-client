import { computed, ref } from "vue";
import { defineStore } from "pinia";
import HTTP from "../helper/axiosInstance";

const useLeaderboardStore = defineStore(
  "leaderboard",
  () => {
    const plays = ref([]);
    const getPlays = computed(() => plays.value);

    async function getLeaderboardHandle() {
      try {
        const response = await HTTP.get("/play/leaderboard");

        if (response?.success) {
          plays.value = response?.payload?.plays;
        } else {
          console.error("Invalid response structure", response);
        }
        return plays.value;
      } catch (error) {
        console.log("error :>> ", error);
        throw error;
      }
    }

    return {
      plays,
      getPlays,
      getLeaderboardHandle,
    };
  },

  {
    persist: true,
  }
);

export default useLeaderboardStore;
