// useAuthStore.js
import { ref, computed } from "vue";
import { defineStore } from "pinia";
import HTTP from "../helper/axiosInstance";

const useAuthStore = defineStore(
  "auth",
  () => {
    const isLoggedIn = ref(false);
    const user = ref(null);
    const isTested = ref(false);

    const getIsLoggedIn = computed(() => isLoggedIn.value || false);
    const getStudentName = computed(
      () => `${user.value?.studentName} - ${user.value?.role}` || "Guest"
    );
    const getRole = computed(() => user.value?.role || "guest");
    const getIsTested = computed(() => isTested.value || false);

    const login = async ({ studentCode, password }) => {
      localStorage.clear();
      try {
        const response = await HTTP.post("/auth/login", {
          studentCode,
          password,
        });

        if (response?.success && response?.success === true) {
          user.value = response.payload.user;
          isLoggedIn.value = true;
          isTested.value = response.payload.user.isTested;

          localStorage.setItem(
            "accessToken",
            JSON.stringify(response.payload.accessToken)
          );
          // localStorage.setItem(
          //   "refreshToken",
          //   JSON.stringify(response.payload.refreshToken)
          // );

          return response;
        }
      } catch (error) {
        throw error;
      }
    };

    const logout = () => {
      // console.log("BYE");
      resetStore();
      localStorage.clear();
    };

    const resetStore = () => {
      isLoggedIn.value = false;
      user.value = null;
      isTested.value = false;
    };

    return {
      isLoggedIn,
      user,
      isTested,

      getIsLoggedIn,
      getStudentName,
      getRole,
      getIsTested,

      login,
      logout,
      resetStore,
    };
  },
  {
    persist: true,
  }
);

export default useAuthStore;
