<script setup>
  import { ref } from "vue";
  import { uploadImageHandle } from "../../helper/uploadImageHandle";
  import HTTP from "../../helper/axiosInstance";
  import DeleteButton from "../Button/DeleteButton.vue";
  import UpdateQuestionButton from "../Button/UpdateQuestionButton.vue";

  const props = defineProps({
    questions: {
      type: Array,
      required: true,
    },
  });

  // TO SHOW
  const answers = ref([]);

  // if (props.questions) {
  //   props.questions.forEach((q) => {
  //     q.options.forEach((option) => {
  //       answers.value.push({
  //         text: option.answer,
  //         isCorrect: option.numbering === q.correctAnswer,
  //         selected: false,
  //         name: `Ans.${option.numbering}`,
  //         code: option.numbering,
  //       });
  //     });
  //   });

  //   console.log("answers.value :>> ", answers.value);
  // }

  // TO EDIT:
  const visible = ref(false);
  const emit = defineEmits(["question-changed"]);

  const correctAnswers = ref([]);
  const selectedCorrectAnswer = ref();

  const imageURL = ref("");
  const imageURLDefault = ref(props.questions?.imageURL);
  const uploadStatus = ref("error");

  const levels = ref([
    { name: "easy", code: "easy" },
    { name: "normal", code: "normal" },
    { name: "medium", code: "medium" },
    { name: "hard", code: "hard" },
  ]);

  const orginalSelectedLevel = levels.value.find(
    (level) => level.code === props.questions?.level
  );

  const selectedLevel = ref(orginalSelectedLevel);

  const editQuestionHandle = () => {
    visible.value = true;
    correctAnswers.value = answers.value;
    selectedCorrectAnswer.value = correctAnswers.value.find(
      (ans) => ans.isCorrect
    );
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
        `/question/update/${props.question._id}`,
        dataToUpdate
      );
      console.log("question/update response :>> ", response);
      // if (response.success) {
      //   // Emit
      //   emit("question-changed", response.payload?.question);
      // }
    } catch (error) {
      console.log("error :>> ", error);
    }

    visible.value = false;
  };
</script>

<template>
  <div
    v-for="(question, index) in questions"
    :key="index"
  >
    <div
      class="max-w-md mx-auto my-3 overflow-hidden bg-white shadow-c rounded-xl md:max-w-2xl"
    >
      <div class="md:flex">
        <div class="md:shrink-0">
          <a
            :href="question.imageURL"
            target="_blank"
          >
            <img
              class="object-contain w-full h-48 md:h-full md:w-48"
              :src="question.imageURL"
              alt="Question image"
            />
          </a>
        </div>
        <div class="p-8">
          <div
            class="text-sm font-semibold tracking-wide text-indigo-500 uppercase"
          >
            Câu hỏi {{ question.code }} - {{ question.level }}
          </div>
          <span
            class="block mt-1 text-lg font-medium leading-tight text-black"
            >{{ question.content }}</span
          >
          <!-- Đáp án -->
          <div class="mt-4">
            <div
              v-for="(option, index) in question.options"
              :key="index"
              class="p-2 mt-2 border rounded cursor-pointer"
              :class="{
                'bg-blue-200': question.correctAnswer == option.numbering,
              }"
            >
              {{ option.answer }} -
              {{ question.correctAnswer == option.numbering }}
            </div>
          </div>
        </div>
      </div>

      <!-- !EDIT -->
      <div class="flex justify-end gap-4 md:gap-6 pb-2 pr-[32px] lg:pr-[40px]">
        <DeleteButton
          :urlPath="'/question/delete'"
          :idObject="question._id"
        ></DeleteButton>
        <Button
          label="Chỉnh sửa"
          @click="editQuestionHandle"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
  .bg-blue-200 {
    background-color: #bbe9ff;
  }

  .shadow-c {
    box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
  }
</style>
