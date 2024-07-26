import { computed, ref } from "vue";
import { defineStore } from "pinia";
import HTTP from "../helper/axiosInstance";

const useIntervieweeStore = defineStore(
  "interviewee",
  () => {
    const interviewees = ref([]);
    const getInterviewees = computed(() => interviewees.value);
    const getStudents = computed(() => {
      const students = [];
      interviewees.value.forEach((i) => {
        students.push({
          name: `${i.userID.studentName} - ${i.userID.studentCode}`,
          code: i.userID.studentCode,
        });
      });

      return students;
    });

    async function getIntervieweesHandle() {
      try {
        const response = await HTTP.get("/play/status?interviewed=false");

        if (response?.success) {
          interviewees.value = response?.payload?.plays;
        } else {
          console.error("Invalid response structure", response);
        }
        return interviewees.value;
      } catch (error) {
        console.log("error :>> ", error);
        throw error;
      }
    }

    return {
      interviewees,
      getInterviewees,
      getStudents,
      getIntervieweesHandle,
    };
  },
  {
    persist: true,
  }
);

export default useIntervieweeStore;
