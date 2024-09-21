<script setup>
  import Header from "../../components/Header/Header.vue";
  import { useRoute } from "vue-router";

  const $route = useRoute();
</script>

<template>
  <Header></Header>
  <div>
    <div class="w-full h-[300px] back"></div>
  </div>
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
