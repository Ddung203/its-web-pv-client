<script setup>
  import { ref } from "vue";

  const props = defineProps({
    questionWillUpdate: { type: String, required: true },
  });

  // const emit = defineEmits([""]);

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
  <div>
    <Button @click="updateQuestionHandle">Chỉnh sửa</Button>
  </div>
</template>

<style scoped>
  /*  */
</style>
