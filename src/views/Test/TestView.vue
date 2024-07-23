<script setup>
  import { ref } from "vue";
  import HeaderSecond from "../../components/Header/HeaderSecond.vue";
  import QuestionCard from "../../components/Question/QuestionCard.vue";
  import useQuestionStore from "../../stores/question";
  import { storeToRefs } from "pinia";
  import ScrollToTop from "../../components/Button/ScrollToTop.vue";
  import NavBar from "../../components/NavBar/NavBar.vue";

  const questionStore = useQuestionStore();
  const { questions } = storeToRefs(questionStore);
</script>

<template>
  <NavBar></NavBar>
  <div class="bg-[#f6f7fb]">
    <HeaderSecond></HeaderSecond>
    <div class="pb-8">
      <QuestionCard
        :questions="questions[0]"
        :role="'user'"
      ></QuestionCard>
      <QuestionCard
        :questions="questions[1]"
        :role="'user'"
      ></QuestionCard>
      <QuestionCard
        :questions="questions[2]"
        :role="'user'"
      ></QuestionCard>
      <QuestionCard
        :questions="questions[0]"
        :role="'user'"
      ></QuestionCard>
      <QuestionCard
        :questions="questions[1]"
        :role="'user'"
      ></QuestionCard>
    </div>

    <div class="flex flex-col items-center justify-center gap-6 pb-16">
      <img
        src="@/public/assets/imgs/ad.svg"
        alt=""
      />
      <p class="text-center">
        Tất cả đã xong! Bạn đã sẵn sàng gửi bài kiểm tra?
      </p>
      <Button
        label="Hoàn thành"
        severity="secondary"
        outlined
      />
    </div>
    <ScrollToTop></ScrollToTop>
  </div>
</template>

<style scoped>
  /*  */
</style>
