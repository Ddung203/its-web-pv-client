<script setup>
  import { ref } from "vue";
  import Header from "../../components/Header/Header.vue";
  import router from "../../routes";
  import { useRoute } from "vue-router";

  const $route = useRoute();
  const remaining = $route.query.remaining;
  const score = $route.query.score;
</script>

<template>
  <Header></Header>
  <div>
    <div class="w-full h-[300px] back"></div>
  </div>

  <!-- <div
    class="px-[20px] lg:px-[200px] pt-7 grid grid-cols-1 grid-rows-1 lg:grid-cols-2 lg:grid-rows-2 gap-4 text-[#ffab32]"
  >
    <div class="flex items-center justify-center bs-1">
      <i
        class="pi pi-question-circle"
        style="font-size: 2rem"
      ></i>
      <span class="pl-3 text-lg">Số lượng câu hỏi: {{ score / 5 }} /20</span>
    </div>
    <div class="flex items-center justify-center bs-1">
      <i
        class="pi pi-clock"
        style="font-size: 2rem"
      ></i>
      <span class="pl-3 text-lg"
        >Thời gian còn lại:
        {{ remaining === "out" ? "0 phút 0 giây" : remaining }}</span
      >
    </div>
    <div class="flex items-center justify-center lg:row-start-2 bs-1">
      <i
        class="pi pi-exclamation-circle"
        style="font-size: 2rem"
      ></i>
      <span class="pl-3 text-lg">Số lần thực hiện: 1</span>
    </div>
    <div class="flex items-center justify-center lg:row-start-2 bs-1">
      <i
        class="pi pi-check-circle"
        style="font-size: 2rem"
      ></i>
      <span class="pl-3 text-lg">Điểm số: {{ score }}</span>
    </div>
  </div> -->

  <div class="p-[20px]">
    <p class="text-3xl text-[#ffab32] font-semibold text-center">
      Chúc mừng bạn đã hoàn thành bài test
    </p>
  </div>

  <div class="lg:px-[200px] px-[20px] mt-10 mb-14 lg:mb-0">
    <router-link to="/introduction">
      <Button class="flex items-center justify-center w-full"
        >Quay về Trang chủ</Button
      >
    </router-link>
  </div>
</template>

<style scoped>
  .back {
    background-image: url("@/public/assets/imgs/Exam1-01.png");
    background-size: cover;
    background-position: center;
  }

  .bs-1 {
    box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
    padding: 20px 30px;
  }

  .inner {
    padding: 20px 30px;
  }
</style>
