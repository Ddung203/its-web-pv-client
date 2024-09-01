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
          name: `${i.studentName} - ${i.studentCode}`,
          code: i.studentCode,
        });
      });

      return students;
    });

    async function getIntervieweesHandle() {
      try {
        const response = await HTTP.get(
          '/user/list?limit=50&skip=0&filter={"role":"user","isTested":1,"isInterviewed":0}'
        );

        if (response?.success) {
          interviewees.value = response?.payload?.users;
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
