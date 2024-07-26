import { computed, ref } from "vue";
import { defineStore } from "pinia";
import HTTP from "../helper/axiosInstance";

const useInterviewerStore = defineStore(
  "interviewer",
  () => {
    const interviewers = ref([]);

    const getInterviewers = computed(() => {
      const students = [];
      interviewers.value.forEach((i) => {
        students.push({
          name: `${i.studentName} - ${i.studentCode}`,
          code: i.studentCode,
        });
      });

      return students;
    });

    async function getInterviewersHandle() {
      try {
        const response = await HTTP.get("/user/role?role=interviewer");

        if (response?.success) {
          interviewers.value = response?.payload?.users;
        } else {
          console.error("Invalid response structure", response);
        }
        return interviewers.value;
      } catch (error) {
        console.log("error :>> ", error);
        throw error;
      }
    }

    return {
      interviewers,
      getInterviewers,
      getInterviewersHandle,
    };
  },
  {
    persist: true,
  }
);

export default useInterviewerStore;
