<script setup>
  import { onMounted, ref } from "vue";
  import Leaderboard from "../../components/Leaderboard/Leaderboard.vue";
  import TitleBannerMini from "../../components/Banner/TitleBannerMini.vue";
  import useLeaderboardStore from "../../stores/leaderboard";
  import { errorNoti } from "../../utils/showNotification";
  import Loading from "../../components/Loading/Loading.vue";
  import { useToast } from "primevue/usetoast";
  import Header from "../../components/Header/Header.vue";
  import Footer from "../../components/Footer/Footer.vue";

  const toast = useToast();
  const leaderboardStore = useLeaderboardStore();
  const loading = ref(false);

  const callAPI = async () => {
    loading.value = true;
    try {
      await leaderboardStore.getLeaderboardHandle();
    } catch (error) {
      errorNoti(
        toast,
        "Đã xảy ra lỗi máy chủ. Vui lòng tải lại trang hoặc thử lại sau ít phút!"
      );
    }
    loading.value = false;
  };

  onMounted(callAPI);
</script>

<template>
  <div>
    <Header></Header>
    <Loading v-if="loading"></Loading>
    <div class="py-5">
      <TitleBannerMini :title="'Bảng xếp hạng'"></TitleBannerMini>
      <div
        v-if="leaderboardStore.getPlays.length !== 0"
        class="px-6"
      >
        <Leaderboard :playsData="leaderboardStore.getPlays"></Leaderboard>
      </div>
      <p
        v-else
        class="pt-5 text-lg font-normal text-center"
      >
        Hiện chưa có dữ liệu
      </p>
    </div>
    <Footer
      :class="{
        hidden:
          leaderboardStore.getPlays.length >= 0 &&
          leaderboardStore.getPlays.length <= 10,
      }"
    ></Footer>
  </div>
</template>

<style scoped>
  /*  */
</style>
