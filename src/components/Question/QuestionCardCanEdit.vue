<script setup>
  import { ref } from "vue";

  const props = defineProps({
    questions: {
      type: Object,
      required: true,
    },

    role: {
      type: String,
      required: true,
    },
  });

  const answers = ref([]);

  const visible = ref(false);

  const selectedCorrectAnswer = ref();
  const correctAnswers = ref([
    { name: "New York", code: "NY" },
    { name: "Rome", code: "RM" },
    { name: "London", code: "LDN" },
    { name: "Istanbul", code: "IST" },
  ]);

  if (props.questions) {
    answers.value = props.questions.options.map((option) => {
      return {
        text: option.answer,
        isCorrect: false,
        selected: false,
      };
    });
  }

  const selectAnswer = (answer) => {
    answers.value.forEach((ans) => (ans.selected = false));

    if (props.role !== "user") return;
    answer.selected = true;
  };

  // TODO: sửa lại correctAnswers, update link ảnh
</script>

<template>
  <div
    class="max-w-md mx-auto my-3 overflow-hidden bg-white shadow-c rounded-xl md:max-w-2xl"
  >
    <div class="md:flex">
      <div class="md:shrink-0">
        <a
          :href="props.questions.imageURL"
          target="_blank"
        >
          <img
            class="object-contain w-full h-48 md:h-full md:w-48"
            :src="props.questions.imageURL"
            alt="Question image"
          />
        </a>
      </div>
      <div class="p-8">
        <div
          class="text-sm font-semibold tracking-wide text-indigo-500 uppercase"
        >
          Câu hỏi {{ props.questions.id }}
        </div>
        <span class="block mt-1 text-lg font-medium leading-tight text-black">{{
          props.questions.content
        }}</span>
        <!-- Đáp án -->
        <div class="mt-4">
          <div
            v-for="(answer, index) in answers"
            :key="index"
            class="p-2 mt-2 border rounded cursor-pointer"
            :class="{ 'bg-blue-200': answer.selected }"
            @click="selectAnswer(answer)"
          >
            {{ answer.text }}
          </div>
        </div>
      </div>
    </div>

    <!-- !EDIT -->
    <div class="flex justify-end pb-2 pr-2">
      <Button
        label="Chỉnh sửa"
        @click="visible = true"
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
          />
        </div>
        <!--  -->
        <div class="flex items-center gap-3 mb-3">
          <label
            for="ans1"
            class="font-semibold w-6rem"
            >A</label
          >
          <InputText
            id="ans1"
            class="flex-auto"
            autocomplete="off"
          />
        </div>
        <!--  -->
        <div class="flex items-center gap-3 mb-3">
          <label
            for="ans2"
            class="font-semibold w-6rem"
            >B</label
          >
          <InputText
            id="ans2"
            class="flex-auto"
            autocomplete="off"
          />
        </div>
        <!--  -->
        <div class="flex items-center gap-3 mb-3">
          <label
            for="ans3"
            class="font-semibold w-6rem"
            >C
          </label>
          <InputText
            id="ans3"
            class="flex-auto"
            autocomplete="off"
          />
        </div>
        <!--  -->
        <div class="flex items-center gap-3 mb-3">
          <label
            for="ans4"
            class="font-semibold w-6rem"
            >D
          </label>
          <InputText
            id="ans4"
            class="flex-auto"
            autocomplete="off"
          />
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

        <!-- Ảnh -->
        <div class="flex flex-col items-start justify-center pb-3">
          <span class="pb-2 font-semibold">Chọn ảnh</span>

          <input
            type="file"
            @change="handleFileUpload"
          />
        </div>
        <!-- Dialog Bottom -->
        <div class="flex gap-2 justify-content-end">
          <Button
            type="button"
            label="Cancel"
            severity="secondary"
            @click="visible = false"
          ></Button>
          <Button
            type="button"
            label="Save"
            @click="visible = false"
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
