<script setup>
  import { ref } from "vue";
  import { uploadImageHandle } from "@/helper/uploadImageHandle.js";
  import { storeToRefs } from "pinia";
  import useQuestionStore from "../../stores/question";

  // GET Question
  const props = defineProps({
    index: { type: Number, required: true },
  });

  const questionStore = useQuestionStore();

  let { questions } = storeToRefs(questionStore);

  const questionWillUpdate = questions.value[props.index];

  // TO UPDATE
  const visible = ref(false);

  const content = ref(questionWillUpdate.content);

  const options = ref(questionWillUpdate.options);

  const levels = ref([
    { name: "easy", code: "easy" },
    { name: "normal", code: "normal" },
    { name: "medium", code: "medium" },
    { name: "hard", code: "hard" },
  ]);

  const selectedCorrectAnswer = ref(
    options.value.length > 0
      ? options.value.find(
          (o) => o.numbering == questionWillUpdate.correctAnswer
        )
      : null
  );

  const selectedLevel = ref(
    questionWillUpdate
      ? levels.value.find((l) => l.code == questionWillUpdate?.level)
      : null
  );

  const uploadStatus = ref("error"); //
  const imageURL = ref("");
  const defaultImageURL =
    "https://firebasestorage.googleapis.com/v0/b/upload-images-42481.appspot.com/o/logos%2FLogo_bo%203%20goc.png?alt=media&token=aeb9dfc2-e57d-403a-a884-9ffd9ed2fb53"; // logo its

  const handleFileUpload = async (event) => {
    uploadStatus.value = "error";

    const file = event.target.files[0];

    // Check if the file is already
    if (!file) {
      uploadStatus.value = "error";
      imageURL.value = defaultImageURL;
      console.log("No file selected!");
      return;
    }

    // Check if the file type is correct
    const fileType = file.type.split("/")[0];
    if (fileType !== "image") {
      uploadStatus.value = "error";
      imageURL.value = defaultImageURL;
      console.log("Invalid file type. Only images are allowed.");
      return;
    }

    // Set the file name
    const fileName = `Question_${questionWillUpdate.code}_${Date.now()}.${
      file.type.split("/")[1]
    }`;

    const result = await uploadImageHandle(file, fileName);

    uploadStatus.value = result.status;

    if (result.status === "success") {
      imageURL.value = result.url;
    } else {
      imageURL.value = defaultImageURL;
    }
  };

  const resetQuestionToUpdate = () => {
    // Important Reset

    content.value = questionWillUpdate.content;
    console.log("questionWillUpdate.options :>> ", questionWillUpdate.options);
    options.value = questionWillUpdate.options;
    //
    selectedCorrectAnswer.value = questionWillUpdate
      ? questionWillUpdate?.options.find(
          (o) => o.numbering == questionWillUpdate.correctAnswer
        )
      : null;
    visible.value = false;

    selectedLevel.value = questionWillUpdate
      ? levels.value.find((l) => l.code == questionWillUpdate?.level)
      : null;

    imageURL.value = defaultImageURL;
  };

  const emit = defineEmits(["update"]);

  const setQuestionToUpdate = () => {
    const dataToUpdate = {
      id: questionWillUpdate._id,
      question: {
        imageURL: imageURL.value ? imageURL.value : defaultImageURL,
        content: content.value,
        options: options.value,
        correctAnswer: selectedCorrectAnswer.value,
        level: selectedLevel.value.code,
      },
    };

    emit("update", dataToUpdate);
  };
</script>

<template>
  <div v-if="questionWillUpdate">
    <Button
      label="Edit"
      @click="visible = true"
    />

    <!-- ! FORM -->
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
            v-model="content"
          />
        </div>
        <!--  -->
        <div
          v-for="(option, index) in options"
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
              v-model="option.answer"
            />
          </div>
        </div>
        <!-- Dropbow Correct Answer -->
        <div class="flex flex-col items-start justify-center pb-3">
          <span class="pb-2 font-semibold text-red-500">Chọn đáp án đúng*</span>

          <!-- ! BUG -->
          <Dropdown
            v-model="selectedCorrectAnswer"
            :options="options"
            optionLabel="numbering"
            placeholder="-"
            class="w-full md:w-14rem"
          />
        </div>

        <!-- Dropbow Level Answer -->
        <div class="flex flex-col items-start justify-center pb-3">
          <span class="pb-2 font-semibold text-red-500">Chọn cấp độ</span>

          <!-- ! BUG -->
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

          <!-- !BUG -->
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
            class="py-1 text-sm text-red-500"
            v-else
          >
            Chưa tải ảnh!
          </p>
        </div>
        <!-- Dialog Bottom -->
        <div class="flex justify-end gap-6">
          <Button
            type="button"
            label="Hủy bỏ"
            severity="secondary"
            @click="resetQuestionToUpdate"
          ></Button>
          <Button
            type="button"
            label="Cập nhật"
            severity="success"
            @click="setQuestionToUpdate"
          ></Button>
        </div>
      </Dialog>
    </div>
  </div>
</template>

<style scoped>
  /*  */
</style>
