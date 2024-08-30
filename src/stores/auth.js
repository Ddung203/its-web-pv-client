import { defineStore } from "pinia";
import { ref } from "vue";
import HTTP from "../helper/axiosInstance";

const useAuthStore = defineStore("auth", {
  state: () => ({
    isLoggedIn: ref(false),
    user: ref(null),
  }),
  persist: true,
  getters: {
    getIsLoggedIn: (state) => state.isLoggedIn || false,
    getStudentName: (state) =>
      state.user?.studentName + ` - ${state.user?.role}` || "Guest",
    getRole: (state) => state.user?.role || "guest",
  },
  actions: {
    async login({ studentCode, password }) {
      localStorage.clear();
      try {
        const response = await HTTP.post("/auth/login", {
          studentCode,
          password,
        });

        if (response?.success && response?.success === true) {
          this.user = response.payload.user;
          this.isLoggedIn = true;

          localStorage.setItem(
            "accessToken",
            JSON.stringify(response.payload.accessToken)
          );
          localStorage.setItem(
            "refreshToken",
            JSON.stringify(response.payload.refreshToken)
          );
          localStorage.setItem("user", JSON.stringify(response.payload.user));

          return response;
        }
      } catch (error) {
        throw error;
      }
    },

    logout() {
      console.log("BYE");
      this.$reset();
      localStorage.clear();
    },
  },
});

export default useAuthStore;
