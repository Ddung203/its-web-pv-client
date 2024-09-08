<script setup>
  import { onMounted, ref } from "vue";
  import Header from "@/components/Header/Header.vue";
  import Footer from "@/components/Footer/Footer.vue";
  import { useToast } from "primevue/usetoast";
  import HTTP from "../../helper/axiosInstance";
  import { errorNoti } from "../../utils/showNotification";

  const studentCode = ref("");
  const isPassed = ref("1");
  const visible = ref(false);

  const toast = useToast();

  const studentPassed = ref(false);

  const show = ref(false);

  const onSubmitHandle = async () => {
    studentPassed.value = false;
    if (studentCode.value.trim() == "") {
      errorNoti(toast, "Mã sinh viên không được để trống!");
      return;
    }

    try {
      const response = await HTTP.get(
        `/user/find-result?studentCode=${studentCode.value.trim()}&isPassed=${
          isPassed.value
        }`
      );

      if (response.success) {
        visible.value = true;
        studentPassed.value = true;
      }
    } catch (e) {
      visible.value = true;
      studentPassed.value = false;
    }
  };

  onMounted(() => {
    show.value = true;
  });
</script>

<template>
  <Header></Header>

  <div class="bg-[#fefefe]">
    <div class="top-content">
      <p class="pt-11 text-4xl text-center font-bold text-[#ff9800] uppercase">
        Tra cứu kết quả chính thức
      </p>

      <div class="flex items-center justify-center gap-[30px] mt-5">
        <div class="h-1 bg-[#ff9800] w-28"></div>
        <div class="text-[#ff9800]">
          <i class="text-4xl pi pi-star-fill"></i>
        </div>
        <div class="h-1 bg-[#ff9800] w-28"></div>
      </div>

      <p class="pt-7 px-[20px] text-xl text-center font-[400] text-[#ff9800]">
        Nhập thông tin của bạn (mã sinh viên) để xem kết quả 😘
      </p>
    </div>

    <!--  -->
    <transition
      enter-active-class="animate__animated animate__fadeInDown"
      leave-active-class="animate__animated animate__fadeOut"
    >
      <div v-if="show">
        <form
          @submit.prevent="onSubmitHandle"
          autocomplete="off"
        >
          <div
            class="grid grid-cols-1 lg:grid-cols-2 grid-rows-1 gap-12 mt-6 pt-4 lg:pt-0 px-[20px] lg:px-[160px]"
          >
            <div class="flex flex-col items-center justify-center w-full gap-4">
              <FloatLabel class="w-full">
                <InputText
                  class="w-full"
                  id="studentCode"
                  v-model="studentCode"
                />
                <label for="studentCode">Mã sinh viên</label>
              </FloatLabel>

              <Button
                class="w-full"
                label="Tra cứu"
                @click="onSubmitHandle"
              ></Button>
            </div>
            <div class="hidden overflow-hidden rounded-md lg:block">
              <img
                class="block max-w-full"
                src="../../public/assets/imgs/2v2.png"
                alt="It's you and me"
              />
            </div>
          </div>
        </form>
      </div>
    </transition>
  </div>

  <!-- Dialog -->

  <Dialog
    v-model:visible="visible"
    modal
    header=" "
    :style="{ width: '25rem' }"
  >
    <div
      class="passed"
      v-if="studentPassed"
    >
      <div class="flex items-center justify-center text-green-600">
        <i class="text-6xl pi pi-check-circle"></i>
      </div>

      <p class="pt-4 pb-8 text-xl text-center text-green-600">
        Chúc mừng bạn đã trở thành cộng tác viên của CLB Hỗ trợ kỹ thuật IT
        Supporter HaUI. <br /><br />Thông tin chi tiết vui lòng kiểm tra email
        của bạn 😘
      </p>
    </div>

    <div
      class="no-passed"
      v-if="!studentPassed"
    >
      <div class="flex items-center justify-center text-red-500">
        <i class="text-6xl pi pi-times-circle"></i>
      </div>
      <p class="pt-4 pb-6 text-xl text-center text-red-500">
        Không tìm thấy mã sinh viên hoặc bạn đã không đủ điều kiện trúng tuyển!
      </p>
    </div>
  </Dialog>

  <div class="absolute bottom-0 left-0 w-full">
    <Footer></Footer>
  </div>
</template>

<style scoped>
  /*  */
</style>
