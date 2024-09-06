<script setup>
  import { onMounted, ref } from "vue";
  import NewCard from "../../components/Question/NewCard.vue";
  import { storeToRefs } from "pinia";
  import ScrollToTop from "../../components/Button/ScrollToTop.vue";
  import usePlayStore from "../../stores/play";
  import countdownFunction from "../../utils/countdownFunction";
  import router from "../../routes";
  import useAuthStore from "../../stores/auth";
  import useUIStore from "../../stores/ui";

  const UIStore = useUIStore();
  const playStore = usePlayStore();
  const authStore = useAuthStore();
  const { questions, play } = storeToRefs(playStore);
  const { isTested } = storeToRefs(authStore);

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
      const payload = await playStore.finishTest();

      isTested.value = true;

      router.push({
        path: "/finish-test",
        query: { remaining: remaining.value, score: payload?.result?.score },
      });
    } catch (error) {
      alert(error);
      router.push("/introduction");
    }
  };
</script>

<template>
  <div class="bg-[#f6f7fb]">
    <header class="w-[100vw] h-[66px]">
      <div class="">
        <div class="fixed top-0 left-0 w-[100%] z-40 bg-white shadow-c">
          <div
            class="flex flex-row items-center justify-between md:grid md:grid-cols-3 md:grid-rows-1 md:gap-0 px-[20px] py-3"
          >
            <!-- Left -->
            <section class="left">
              <div class="flex gap-2 justify-content-center introduction-farm">
                <Button
                  icon="pi pi-align-justify"
                  @click="UIStore.toggle"
                  outlined
                />
              </div>
            </section>

            <!-- Middle -->
            <section class="flex flex-col items-center justify-center">
              <div class="hidden logo md:block">
                <a href="#">
                  <img
                    class="block max-h-[40px]"
                    src="@/public/assets/logos/logofull.png"
                    alt="Logo"
                /></a>
              </div>
            </section>
            <!-- Right -->
            <section class="md:flex md:justify-end lg:flex-row right">
              <Button
                v-if="countdown"
                class="uppercase"
                :label="countdown == 'out' ? 'Hết thời gian' : countdown"
                severity="secondary"
                outlined
              />
            </section>
          </div>
        </div>
      </div>
    </header>

    <!-- !MAIN -->
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
        Tất cả đã xong? Bấm hoàn thành để gửi bài kiểm tra!
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
  .shadow-c {
    box-shadow: rgba(17, 17, 26, 0.1) 0px 1px 0px;
  }
</style>
