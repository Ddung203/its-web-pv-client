// QuestionList.vue
<script setup>
  import { ref, watch } from "vue";
  import ConfirmPopup from "primevue/confirmpopup";
  import { useToast } from "primevue/usetoast";
  import { useConfirm } from "primevue/useconfirm";
  import UpdateQuestionButton from "../Button/UpdateQuestionButton.vue";
  import useQuestionStore from "../../stores/question";
  import { storeToRefs } from "pinia";

  const toast = useToast();
  const confirm = useConfirm();
  const questionStore = useQuestionStore();
  const { questions } = storeToRefs(questionStore);

  const props = defineProps({
    currentData: {
      type: Array,
    },
  });

  // ! DELETE

  const confirmDelete = (event, id) => {
    confirm.require({
      target: event.currentTarget,
      message: "Bạn có muốn xóa câu hỏi?",
      icon: "pi pi-info-circle",
      rejectClass: "p-button-secondary p-button-outlined p-button-sm",
      acceptClass: "p-button-danger p-button-sm",
      rejectLabel: "Hủy",
      acceptLabel: "Xác nhận",
      accept: async () => {
        await questionStore.deleteOneQuestionHandle(id);
        successNoti(toast, "Đã xóa 1 câu hỏi!");
      },
      reject: () => {
        console.log("Rejecting");
      },
    });
  };

  // ! UPDATE
  const updateOneQuestion = async (dataToUpdate) => {
    // console.log("dataToUpdate :>> ", dataToUpdate);

    await questionStore.updateOneQuestionHandle(
      dataToUpdate.id,
      dataToUpdate.question
    );
  };
</script>

<template>
  <div class="px-3 md:px-0">
    <div
      v-for="(question, index) in props.currentData"
      :key="index"
      class="max-w-md mx-auto my-3 overflow-hidden bg-white md:my-0 md:mb-8 shadow-c rounded-xl md:max-w-2xl"
    >
      <!-- !TOP -->
      <div class="md:flex">
        <!-- ! LEFT -->
        <div class="md:shrink-0">
          <a
            :href="question.imageURL"
            target="_blank"
          >
            <img
              class="object-contain w-full h-48 pt-4 pl-4 md:h-full md:w-48"
              :src="question.imageURL"
              alt="Question image"
            />
          </a>
        </div>

        <!-- ! RIGHT -->
        <div class="p-8">
          <!-- Câu hỏi -->
          <div
            class="text-sm font-semibold tracking-wide text-indigo-500 uppercase"
          >
            Câu hỏi {{ index + 1 }}/{{ props.currentData.length }} -
            {{ question.level }}
          </div>
          <span
            class="block mt-1 text-lg font-medium leading-tight text-black"
            >{{ question.content }}</span
          >
          <!-- Đáp án -->
          <div class="mt-4">
            <p
              v-for="(option, index) in question.options"
              :key="index"
              class="p-2 mt-2 border rounded cursor-pointer text-wrap"
              :class="{
                'bg-blue-200': question.correctAnswer == option.numbering,
              }"
            >
              {{ option.answer }} -
              {{ question.correctAnswer == option.numbering }}
            </p>
          </div>
        </div>
      </div>

      <!-- !EDIT -->
      <div class="flex justify-end gap-4 p-8">
        <!-- ! DELETE -->
        <Toast />
        <ConfirmPopup></ConfirmPopup>
        <div class="flex flex-wrap gap-2 card justify-content-center">
          <Button
            @click="confirmDelete($event, question._id)"
            label="Xóa"
            severity="danger"
            outlined
          ></Button>
        </div>

        <!-- ! UPDATE -->
        <UpdateQuestionButton
          :question="question"
          @update="updateOneQuestion"
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
