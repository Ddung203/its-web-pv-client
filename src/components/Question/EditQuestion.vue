<script setup>
  import { ref, watch } from "vue";
  import { uploadImageHandle } from "../../helper/uploadImageHandle";
  import HTTP from "../../helper/axiosInstance";
  import { useToast } from "primevue/usetoast";
  import showNotification from "../../utils/showNotification";

  const props = defineProps({
    question: {
      type: Object,
      required: true,
    },
  });

  const emit = defineEmits(["question-updated"]);

  const visible = ref(false);
  const answers = ref([]);
  const correctAnswers = ref([]);
  const selectedCorrectAnswer = ref();
  const imageURL = ref("");
  const imageURLDefault = ref(props.question.imageURL);
  const uploadStatus = ref("error");
  const toast = useToast();

  const levels = ref([
    { name: "easy", code: "easy" },
    { name: "normal", code: "normal" },
    { name: "medium", code: "medium" },
    { name: "hard", code: "hard" },
  ]);

  const orginalSelectedLevel = levels.value.find(
    (level) => level.code === props.question.level
  );
  const selectedLevel = ref(orginalSelectedLevel);

  watch(
    () => props.question,
    (newQuestion) => {
      if (newQuestion) {
        answers.value = newQuestion.options.map((option) => ({
          text: option.answer,
          isCorrect: option.numbering === newQuestion.correctAnswer,
          selected: false,
          name: `Ans.${option.numbering}`,
          code: option.numbering,
        }));
        imageURLDefault.value = newQuestion.imageURL;
        selectedLevel.value = levels.value.find(
          (level) => level.code === newQuestion.level
        );
        selectedCorrectAnswer.value = answers.value.find(
          (ans) => ans.isCorrect
        );
      }
    },
    { immediate: true }
  );

  const editQuestionHandle = () => {
    visible.value = true;
  };

  const handleFileUpload = async (event) => {
    uploadStatus.value = "error";
    const file = event.target.files[0];

    if (!file) {
      uploadStatus.value = "error";
      imageURL.value = null;
      alert("No file selected");
      return;
    }

    const fileType = file.type.split("/")[0];
    if (fileType !== "image") {
      uploadStatus.value = "error";
      imageURL.value = null;
      console.log("Invalid file type. Only images are allowed.");
      return;
    }

    const fileName = `Question_${props.question.code}_${Date.now()}.${
      file.type.split("/")[1]
    }`;

    const result = await uploadImageHandle(file, fileName);

    uploadStatus.value = result.status;
    if (result.status === "success") {
      imageURL.value = result.url;
    } else {
      imageURL.value = null;
    }
  };

  const updateQuestionHandle = async () => {
    const dataToUpdate = {
      imageURL: imageURL.value || imageURLDefault.value,
      content: document.getElementById("content").value,
      options: answers.value.map((ans, index) => ({
        numbering: ans.code,
        answer: document.getElementById(`ans${ans.code}`).value,
      })),
      correctAnswer: `${selectedCorrectAnswer.value.code}`,
      level: selectedLevel.value.code,
    };

    try {
      const response = await HTTP.put(
        `/question-service/api/v1/question/update/${props.question._id}`,
        dataToUpdate
      );
      if (response.success) {
        emit("question-updated", response.payload?.question);
        showNotification(
          toast,
          "success",
          "Thông báo",
          "Cập nhật thành công",
          1500
        );
      }
    } catch (error) {
      console.log("error :>> ", error);
      showNotification(toast, "error", "Thông báo", "Cập nhật thất bại", 1500);
    }

    visible.value = false;
  };
</script>

<template>
  <div v-if="visible">
    <div>
      <label for="content">Nội dung câu hỏi:</label>
      <input
        type="text"
        id="content"
        :value="question.content"
      />
    </div>
    <div>
      <label for="file-upload">Upload ảnh:</label>
      <input
        type="file"
        id="file-upload"
        @change="handleFileUpload"
      />
    </div>
    <div>
      <label for="level">Mức độ:</label>
      <select
        id="level"
        v-model="selectedLevel"
      >
        <option
          v-for="level in levels"
          :key="level.code"
          :value="level"
        >
          {{ level.name }}
        </option>
      </select>
    </div>
    <div
      v-for="(ans, index) in answers"
      :key="index"
    >
      <label :for="`ans${ans.code}`">{{ ans.name }}:</label>
      <input
        type="text"
        :id="`ans${ans.code}`"
        :value="ans.text"
      />
      <input
        type="radio"
        :id="`correct${ans.code}`"
        v-model="selectedCorrectAnswer"
        :value="ans"
      />
    </div>
    <button @click="updateQuestionHandle">Cập nhật</button>
    <button @click="visible = false">Hủy bỏ</button>
  </div>
</template>

<style scoped>
  /*  */
</style>
