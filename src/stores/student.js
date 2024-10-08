import { computed, ref } from "vue";
import { defineStore } from "pinia";
import HTTP from "../helper/axiosInstance";
import checkFalsy from "../utils/checkFalsyValue";

const useStudentStore = defineStore(
  "student",
  () => {
    const students = ref([]);

    async function getStudentsHandle() {
      try {
        const response = await HTTP.get(
          '/user/list?limit=500&skip=0&filter={"role":"user"}'
        );

        if (response?.success) {
          students.value = response?.payload?.users;
        } else {
          console.error("Invalid response structure", response);
        }
        return students.value;
      } catch (error) {
        // console.log("error :>> ", error);
        throw error;
      }
    }

    async function deleteStudentsHandle(studentCode) {
      try {
        const response = await HTTP.delete(`/user/remove/${studentCode}`);

        if (response?.success) {
          students.value = response?.payload?.users;
          await getStudentsHandle();

          return students.value;
        } else {
          console.error("Invalid response structure", response);
        }
      } catch (error) {
        throw error;
      }
    }

    async function signupHandle(data) {
      try {
        const response = await HTTP.post(`/auth/signup`, data);

        if (response?.success) {
          students.value = response?.payload?.users;
          await getStudentsHandle();

          return students.value;
        } else {
          console.error("Invalid response structure", response);
        }
      } catch (error) {
        console.log("error :>> ", error);
        throw error;
      }
    }

    async function updateHandle(data) {
      try {
        const {
          studentName,
          studentClass,
          studentPhone,
          studentHometown,
          password,
          role,
        } = data;

        if (
          checkFalsy({
            studentName,
            studentClass,
            studentPhone,
            password,
            studentHometown,
            role,
          })
        ) {
          throw new Error("Please fill in all required fields");
        }

        const response = await HTTP.put(`/user/update/${data.studentCode}`, {
          studentName,
          studentClass,
          studentPhone,
          studentHometown,
          password,
          role,
        });

        if (response?.success) {
          students.value = response?.payload?.users;
          await getStudentsHandle();

          return students.value;
        } else {
          console.error("Invalid response structure", response);
        }
      } catch (error) {
        throw error;
      }
    }

    return {
      students,
      getStudentsHandle,
      deleteStudentsHandle,
      signupHandle,
      updateHandle,
    };
  },
  {
    persist: true,
  }
);

export default useStudentStore;
