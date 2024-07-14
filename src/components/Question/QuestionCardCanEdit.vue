<script setup>
  import { ref } from "vue";
  import { uploadImageHandle } from "../../helper/uploadImageHandle";
  import HTTP from "../../helper/axiosInstance";
  import DeleteButton from "../Button/DeleteButton.vue";

  const props = defineProps({
    question: {
      type: Object,
      required: true,
    },

    role: {
      type: String,
      required: true,
    },
  });

  // TO SHOW
  const answers = ref([]);

  if (props.question) {
    answers.value = props.question.options.map((option) => {
      return {
        text: option.answer,
        isCorrect: props.question.correctAnswer == option.numbering,
        selected: false,
        name: `Ans.${option.numbering}`,
        code: option.numbering,
      };
    });
  }

  const selectAnswer = (answer) => {
    answers.value.forEach((ans) => (ans.selected = false));

    if (props.role !== "user") return;
    answer.selected = true;
  };

  // TO EDIT:
  const visible = ref(false);

  const correctAnswers = ref([]);
  const selectedCorrectAnswer = ref();

  const imageURL = ref("");
  const imageURLDefault = ref(props.question.imageURL);
  const uploadStatus = ref("error");

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

    console.log("dataToUpdate :>> ", dataToUpdate);

    try {
      const response = await HTTP.put(
        `/question/update/${props.question._id}`,
        dataToUpdate
      );
      console.log("response :>> ", response);
    } catch (error) {
      console.log("error :>> ", error);
    }
    visible.value = false;
  };
</script>

<template>
  <div
    class="max-w-md mx-auto my-3 overflow-hidden bg-white shadow-c rounded-xl md:max-w-2xl"
  >
    <div class="md:flex">
      <div class="md:shrink-0">
        <a
          :href="props.question.imageURL"
          target="_blank"
        >
          <img
            class="object-contain w-full h-48 md:h-full md:w-48"
            :src="props.question.imageURL"
            alt="Question image"
          />
        </a>
      </div>
      <div class="p-8">
        <div
          class="text-sm font-semibold tracking-wide text-indigo-500 uppercase"
        >
          Câu hỏi {{ props.question.code }} - {{ props.question._id }} -
          {{ props.question.level }}
        </div>
        <span class="block mt-1 text-lg font-medium leading-tight text-black">{{
          props.question.content
        }}</span>
        <!-- Đáp án -->
        <div class="mt-4">
          <div
            v-for="(answer, index) in answers"
            :key="index"
            class="p-2 mt-2 border rounded cursor-pointer"
            :class="{ 'bg-blue-200': answer.isCorrect }"
            @click="selectAnswer(answer)"
          >
            {{ answer.text }} - {{ answer.isCorrect }}
          </div>
        </div>

        <!-- Đáp án đúng -->
      </div>
    </div>

    <!-- !EDIT -->
    <div class="flex justify-end gap-4 md:gap-6 pb-2 pr-[32px] lg:pr-[40px]">
      <DeleteButton
        :urlPath="'/question/delete'"
        :idObject="props.question._id"
      ></DeleteButton>
      <Button
        label="Chỉnh sửa"
        @click="editQuestionHandle"
      />
    </div>
    <div class="flex card justify-content-center">
      <Dialog
        v-model:visible="visible"
        modal
        header="Chỉnh sửa câu hỏi"
        :style="{ width: '25rem' }"
      >
        <!--  -->
        <div class="flex items-center gap-3 mb-3">
          <label
            for="content"
            class="font-semibold w-6rem"
            >Nội dung</label
          >
          <InputText
            id="content"
            class="flex-auto"
            autocomplete="off"
            :value="props.question.content"
          />
        </div>
        <!--  -->
        <div
          v-for="(option, index) in props.question.options"
          :key="index"
        >
          <div class="flex items-center gap-3 mb-3">
            <label
              for="ans1"
              class="font-semibold w-6rem"
              >Ans.{{ option.numbering }}</label
            >
            <InputText
              :id="'ans' + option.numbering"
              class="flex-auto"
              autocomplete="off"
              :value="option.answer"
            />
          </div>
        </div>
        <!-- Dropbow Correct Answer -->
        <div class="flex flex-col items-start justify-center pb-3">
          <span class="pb-2 font-semibold text-red-500">Chọn đáp án đúng*</span>
          <Dropdown
            v-model="selectedCorrectAnswer"
            :options="correctAnswers"
            optionLabel="name"
            placeholder="-"
            class="w-full md:w-14rem"
          />
        </div>

        <!-- Dropbow Level Answer -->
        <div class="flex flex-col items-start justify-center pb-3">
          <span class="pb-2 font-semibold text-red-500">Chọn cấp độ</span>
          <Dropdown
            v-model="selectedLevel"
            :options="levels"
            optionLabel="name"
            placeholder="-"
            class="w-full md:w-14rem"
          />
        </div>

        <!-- Ảnh -->
        <div class="flex flex-col items-start justify-center pb-3">
          <span class="pb-2 font-semibold">Chọn ảnh</span>

          <input
            type="file"
            @change="handleFileUpload"
          />

          <p
            class="py-1 text-sm text-[#16a34a] uppercase"
            v-if="uploadStatus === 'success'"
          >
            Tải ảnh thành công!
          </p>
          <p
            class="py-1 text-sm text-red-500 uppercase"
            v-else
          >
            Nếu không chọn ảnh, ảnh mặc định sẽ được sử dụng.
          </p>
        </div>
        <!-- Dialog Bottom -->
        <div class="flex justify-end gap-6">
          <Button
            type="button"
            label="Hủy bỏ"
            severity="secondary"
            @click="visible = false"
          ></Button>
          <Button
            type="button"
            label="Cập nhật"
            severity="success"
            @click="updateQuestionHandle"
          ></Button>
        </div>
      </Dialog>
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
