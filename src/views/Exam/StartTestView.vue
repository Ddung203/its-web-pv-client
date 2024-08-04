<script setup>
  import { ref } from "vue";
  import Header from "../../components/Header/Header.vue";
  import router from "../../routes";
</script>

<template>
  <div class="max-w-[80vw] mx-auto mt-7">
    <Header></Header>
    <div class="py-14 px-14 shadow-c bg-[#f6f7fb]">
      <div class="grid grid-cols-1 grid-rows-2 gap-7 md:grid-cols-2">
        <div class="flex items-center text-[#51829B]">
          <i
            class="pi pi-clock"
            style="font-size: 2rem"
          ></i>
          <span class="pl-3 text-lg">Thời gian làm bài: 20 phút</span>
        </div>

        <div class="flex items-center text-[#51829B]">
          <i
            class="pi pi-question-circle"
            style="font-size: 2rem"
          ></i>
          <span class="pl-3 text-lg">Số lượng câu hỏi: 20</span>
        </div>
        <div class="flex items-center text-[#51829B]">
          <i
            class="pi pi-exclamation-circle"
            style="font-size: 2rem"
          ></i>
          <span class="pl-3 text-lg">Số lượt làm: 1</span>
        </div>

        <div></div>
      </div>
      <!-- Button -->
      <div class="flex items-center justify-center pt-16">
        <Button class="text-lg shadow-c2">Bắt đầu làm bài</Button>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .shadow-c {
    box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
      rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
  }
  .shadow-c2 {
    box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 6px -1px,
      rgba(0, 0, 0, 0.06) 0px 2px 4px -1px;
  }
</style>
