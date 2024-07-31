<script setup>
  import { onMounted, ref } from "vue";
  import Leaderboard from "../../components/Leaderboard/Leaderboard.vue";
  import TitleBannerMini from "../../components/Banner/TitleBannerMini.vue";
  import useLeaderboardStore from "../../stores/leaderboard";
  import showNotification from "../../utils/showNotification";
  import Loading from "../../components/Loading/Loading.vue";
  import { useToast } from "primevue/usetoast";
  import Header from "../../components/Header/Header.vue";

  const toast = useToast();
  const leaderboardStore = useLeaderboardStore();
  const loading = ref(false);

  const callAPI = async () => {
    loading.value = true;
    try {
      await leaderboardStore.getLeaderboardHandle();
    } catch (error) {
      showNotification(
        toast,
        "error",
        "Thông báo lỗi",
        "Đã xảy ra lỗi máy chủ. Vui lòng tải lại trang hoặc thử lại sau ít phút!",
        3000
      );
    }
    loading.value = false;
  };

  onMounted(callAPI);
</script>

<template>
  <Header></Header>
  <Loading v-if="loading"></Loading>
  <div class="p-5">
    <TitleBannerMini :title="'Bảng xếp hạng'"></TitleBannerMini>
    <div v-if="leaderboardStore.getPlays.length !== 0">
      <Leaderboard :playsData="leaderboardStore.getPlays"></Leaderboard>
    </div>
  </div>
</template>

<style scoped>
  /*  */
</style>
