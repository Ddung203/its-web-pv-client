<script setup>
  import { ref } from "vue";
  import Header from "../../components/Header/Header.vue";
  import router from "../../routes";
</script>

<template>
  <Header></Header>
  <div>
    <div class="w-full h-[300px] back"></div>
  </div>

  <div
    class="px-[20px] lg:px-[200px] pt-7 grid grid-cols-1 grid-rows-1 lg:grid-cols-2 lg:grid-rows-2 gap-4 text-[#ffab32]"
  >
    <div class="flex items-center justify-center bs-1">
      <i
        class="pi pi-question-circle"
        style="font-size: 2rem"
      ></i>
      <span class="pl-3 text-lg">Số lượng câu hỏi: 20</span>
    </div>
    <div class="flex items-center justify-center bs-1">
      <i
        class="pi pi-clock"
        style="font-size: 2rem"
      ></i>
      <span class="pl-3 text-lg">Thời gian: 20 phút</span>
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
      <span class="pl-3 text-lg">Điểm tối đa: 100</span>
    </div>
  </div>

  <div class="lg:px-[200px] px-[20px] mt-10 mb-14 lg:mb-0">
    <Button class="flex items-center justify-center w-full">Bắt đầu</Button>
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
