<script setup>
  import { ref } from "vue";
  import Header from "../../components/Header/Header.vue";
  import router from "../../routes";
  import { useToast } from "primevue/usetoast";
  import usePlayStore from "../../stores/play";
  import { errorNoti } from "../../utils/showNotification";
  import verifyOTP from "../../utils/verifyOTP.js";
  import Loading from "../../components/Loading/Loading.vue";

  const toast = useToast();

  const playStore = usePlayStore();

  const token = ref("");
  const isLoading = ref(false);

  const startBtnHandle = async () => {
    const verifyResult = await verifyOTP(token.value);

    if (!verifyResult) {
      errorNoti(toast, "Bài thi không khả dụng!");
      return;
    }

    try {
      isLoading.value = true;
      await playStore.startPlay();
    } catch (e) {
      if (e.error.statusCode === 409) {
        errorNoti(toast, "Bạn chỉ được thực hiện bài test 1 lần!");
        return;
      }

      errorNoti(toast, "Lỗi máy chủ! Vui lòng thử lại sau!");
    } finally {
      isLoading.value = false;
    }

    router.push("/test");
  };
</script>

<template>
  <Loading v-if="isLoading"></Loading>
  <Toast></Toast>
  <Header></Header>

  <div>
    <div class="w-full h-[300px] back"></div>
  </div>

  <div
    class="px-[20px] lg:px-[200px] pt-7 lg:pt-0 grid grid-cols-1 grid-rows-1 lg:grid-cols-2 lg:grid-rows-2 gap-4 text-[#ffab32]"
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

  <form
    class="lg:px-[200px] px-[20px] mt-10 mb-14 lg:mb-0"
    @submit.prevent="startBtnHandle"
    autocomplete="off"
  >
    <div class="flex justify-center pb-5 card">
      <FloatLabel>
        <InputText
          id="token"
          v-model="token"
        />
        <label for="token">OTP code</label>
      </FloatLabel>
    </div>
    <Button
      :disabled="isLoading"
      type="submit"
      class="flex items-center justify-center w-full"
      >Bắt đầu</Button
    >
  </form>
</template>

<style scoped>
  .back {
    background-image: url("https://firebasestorage.googleapis.com/v0/b/upload-images-42481.appspot.com/o/cdn%2FExam1-01.png?alt=media&token=2a2fe10b-c117-4061-8826-c6d9ebaa9828");
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
