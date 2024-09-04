<script setup>
  import { onMounted, ref } from "vue";
  import HeaderSecond from "../../components/Header/HeaderSecond.vue";
  import NewCard from "../../components/Question/NewCard.vue";
  import { storeToRefs } from "pinia";
  import ScrollToTop from "../../components/Button/ScrollToTop.vue";
  import usePlayStore from "../../stores/play";
  import countdownFunction from "../../utils/countdownFunction";
  import router from "../../routes";

  const playStore = usePlayStore();
  const { questions, play, isTested } = storeToRefs(playStore);

  const countdown = ref(null);
  const remaining = ref(null);
  const endFn = ref(null);

  onMounted(() => {
    endFn.value = countdownFunction(countdown, play.value.timeOut, remaining);
  });

  const userSelectedHandle = (data) => {
    const newQuestion = {
      ...questions.value[data.index],
      userAnswer: data.userAnswer,
    };
    playStore.updateOneQuestion(data.index, newQuestion);
  };

  const endPlay = async () => {
    try {
      endFn.value();
      isTested.value = true;
      const payload = await playStore.finishTest();

      router.push({
        path: "/finish-test",
        query: { remaining: remaining.value, score: payload?.result?.score },
      });
    } catch (error) {
      console.log("error :>> ", error);
      // router.push("/introduction");
    }

    // router.push("/finish-test");
    // router.push("/introduction");
  };
</script>

<template>
  <div class="bg-[#f6f7fb]">
    <HeaderSecond></HeaderSecond>
    <p v-if="countdown">{{ countdown }}</p>

    <div
      :class="{
        hidden: countdown == 'out',
      }"
      class="pb-8"
      v-if="questions.length > 0"
    >
      <template
        v-for="(item, index) in questions"
        :key="index"
      >
        <!-- <QuestionCard :questions="questions[index]"></QuestionCard> -->
        <NewCard
          :question="item"
          :index="index"
          :count="questions.length"
          @userSelected="userSelectedHandle"
        ></NewCard>
      </template>
    </div>

    <div class="flex flex-col items-center justify-center gap-6 pb-16">
      <img
        src="@/public/assets/imgs/finish-test.svg"
        alt=""
      />
      <p class="text-center">
        Tất cả đã xong! Bạn đã sẵn sàng gửi bài kiểm tra?
      </p>
      <Button
        label="Hoàn thành"
        severity="secondary"
        outlined
        @click="endPlay"
      />
    </div>
    <ScrollToTop></ScrollToTop>
  </div>
</template>

<style scoped>
  /*  */
</style>
