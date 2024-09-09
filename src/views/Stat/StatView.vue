<script setup>
  import { onMounted, ref } from "vue";
  import Header from "@/components/Header/Header.vue";
  import StatCard from "../../components/Stat/StatCard.vue";
  import Loading from "../../components/Loading/Loading.vue";
  import HTTP from "../../helper/axiosInstance";

  const show = ref(false);

  const isLoading = ref(false);
  const statObject = ref(null);

  const callAPI = async () => {
    show.value = true;
    isLoading.value = true;

    try {
      isLoading.value = true;

      const response = await HTTP.get(`stat/info`);
      statObject.value = response?.payload || null;

      isLoading.value = false;
    } catch (error) {
      isLoading.value = false;
    }
  };

  onMounted(callAPI);
</script>

<template>
  <Loading v-if="isLoading"></Loading>

  <Header></Header>

  <p class="px-5 pt-5 text-2xl font-bold lg:px-16 bg-[#fefefe]">Thông tin</p>
  <!-- ! Info Card -->
  <transition
    enter-active-class="animate__animated animate__fadeInDown"
    leave-active-class="animate__animated animate__fadeOut"
  >
    <div
      v-if="show"
      class="grid grid-cols-1 gap-5 p-5 lg:px-16 md:grid-cols-2 lg:grid-cols-4 bg-[#fefefe]"
    >
      <div class="flex border border-[#ccc] rounded-xl">
        <div class="flex items-center justify-center w-1/6 py-5">
          <i class="text-2xl text-[#ff9700] pi pi-info-circle" />
        </div>
        <div
          class="flex flex-col items-start justify-center w-5/6 gap-3 py-5 pr-5"
        >
          <div>
            <span class="text-lg text-[#ff9700] font-semibold"
              >Số lượt truy cập</span
            >
          </div>
          <div class="grid w-full grid-cols-2">
            <div>
              <span class="text-base">{{ statObject.websiteViews }}</span>
            </div>
            <div class="flex items-center justify-end text-green-500">
              <i class="pi pi-angle-up" />
              <span> 15%</span>
            </div>
          </div>
        </div>
      </div>
      <StatCard
        :title="'Tài khoản sinh viên'"
        :count="statObject.countUser"
      ></StatCard>
      <StatCard
        :title="'Sinh viên tham gia bài test'"
        :count="statObject.countUserTested"
      ></StatCard>
      <StatCard
        :title="'Sinh viên tham gia phỏng vấn'"
        :count="statObject.countUserInterviewed"
      ></StatCard>
      <StatCard
        :title="'Cộng tác viên mới'"
        :count="statObject.countUserPassed || 0"
      ></StatCard>
    </div>
  </transition>

  <!-- ! Chart -->
  <p class="px-5 pt-0 text-2xl font-bold lg:px-16 bg-[#fefefe]">
    Xuất danh sách
  </p>
  <transition
    enter-active-class="animate__animated animate__fadeIn"
    leave-active-class="animate__animated animate__fadeOut"
  >
    <div
      class="p-5 lg:px-16 bg-[#fefefe]"
      v-if="show"
    >
      <p>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quisquam
        consequatur ut ad voluptatum sequi soluta tempora dignissimos ex, ea
        consequuntur aliquid sit quasi qui adipisci mollitia reprehenderit unde
        dolorem praesentium.
      </p>
    </div>
  </transition>
</template>

<style scoped>
  /*  */
</style>
