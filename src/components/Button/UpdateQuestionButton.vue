<script setup>
  import { ref, computed, watch } from "vue";
  import { uploadImageHandle } from "@/helper/uploadImageHandle.js";

  // GET Question
  const props = defineProps({
    question: { type: Object, required: true },
  });

  const header = `Chỉnh sửa câu hỏi - ${props.question.code}`;

  const questionWillUpdate = ref(props.question);

  // Watch for changes in props.question to update the local state
  watch(
    () => props.question,
    (newQuestion) => {
      questionWillUpdate.value = newQuestion;
      resetQuestionToUpdate();
    }
  );

  // TO UPDATE
  const visible = ref(false);
  const content = ref("");
  const options = ref([]);
  const levels = ref([
    { name: "easy", code: "easy" },
    { name: "normal", code: "normal" },
    { name: "medium", code: "medium" },
    { name: "hard", code: "hard" },
  ]);

  const selectedCorrectAnswer = ref(null);
  const selectedLevel = ref(null);

  const uploadStatus = ref("error");
  const imageURL = ref("");
  const defaultImageURL =
    "https://firebasestorage.googleapis.com/v0/b/upload-images-42481.appspot.com/o/logos%2FLogo_bo%203%20goc.png?alt=media&token=aeb9dfc2-e57d-403a-a884-9ffd9ed2fb53";

  const handleFileUpload = async (event) => {
    uploadStatus.value = "error";

    const file = event.target.files[0];
    if (!file) {
      imageURL.value = imageURL.value === "" ? defaultImageURL : imageURL.value;
      console.log("No file selected!");
      return;
    }

    const fileType = file.type.split("/")[0];
    if (fileType !== "image") {
      imageURL.value = imageURL.value === "" ? defaultImageURL : imageURL.value;
      console.log("Invalid file type. Only images are allowed.");
      return;
    }

    const fileName = `Question_${questionWillUpdate.value.code}_${Date.now()}.${
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
    if (!questionWillUpdate.value) return;

    content.value = questionWillUpdate.value.content;
    options.value = JSON.parse(
      JSON.stringify(questionWillUpdate.value.options)
    );

    selectedCorrectAnswer.value =
      questionWillUpdate.value.options.find(
        (o) => o.numbering == questionWillUpdate.value.correctAnswer
      ) || null;

    selectedLevel.value =
      levels.value.find((l) => l.code == questionWillUpdate.value.level) ||
      null;

    uploadStatus.value = "error";
    imageURL.value = questionWillUpdate.value.imageURL || defaultImageURL;

    visible.value = false;
  };

  // Initial setup
  resetQuestionToUpdate();

  const emit = defineEmits(["update"]);

  const setQuestionToUpdate = () => {
    const dataToUpdate = {
      id: questionWillUpdate.value._id,
      question: {
        imageURL: imageURL.value ? imageURL.value : defaultImageURL,
        content: content.value,
        options: options.value,
        correctAnswer: `${selectedCorrectAnswer.value.numbering}`,
        level: selectedLevel.value.code,
      },
    };

    emit("update", dataToUpdate);
    visible.value = false;
  };
</script>

<template>
  <div v-if="questionWillUpdate">
    <!-- ! BUTTON -->
    <Button
      label="Sửa câu hỏi"
      @click="visible = true"
    />

    <!-- ! FORM -->
    <div class="flex card justify-content-center">
      <Dialog
        v-model:visible="visible"
        modal
        :header="header"
        :style="{ width: '25rem' }"
      >
        <!-- ! NỘI DUNG CÂU HỎI -->
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

        <!-- ! 4 ĐÁP ÁN -->
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

        <!-- ! Dropbow Chọn đáp án đúng -->
        <div class="flex flex-col items-start justify-center pb-3">
          <span class="pb-2 font-semibold text-red-500">Chọn đáp án đúng*</span>

          <Dropdown
            v-model="selectedCorrectAnswer"
            :options="options"
            optionLabel="numbering"
            placeholder="-"
            class="w-full md:w-14rem"
          />
        </div>

        <!-- ! Dropbow Level câu hỏi -->
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

        <!-- ! CHỌN ẢNH -->
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
            class="py-1 text-sm text-red-500"
            v-else
          >
            Chưa tải ảnh!
          </p>
        </div>

        <!-- !Dialog Bottom -->
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
