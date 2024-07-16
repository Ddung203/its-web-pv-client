<script setup>
  import { onMounted, ref } from "vue";
  import Leaderboard from "../../components/Leaderboard/Leaderboard.vue";
  import TitleBannerMini from "../../components/Banner/TitleBannerMini.vue";

  import HTTP from "@/helper/axiosInstance.js";

  const playsData = ref([]);

  const fetchData = async () => {
    try {
      const response = await HTTP.get("/play/leaderboard");
      playsData.value = response.payload.plays;

      console.log("playsData.value :>> ", playsData.value);
    } catch (error) {
      console.error(error);
    }
  };

  onMounted(() => fetchData());
</script>

<template>
  <div class="p-5">
    <TitleBannerMini :title="'Bảng xếp hạng'"></TitleBannerMini>
    <Leaderboard :playsData="playsData"></Leaderboard>
  </div>
</template>

<style scoped>
  /*  */
</style>
