<script setup>
  import { onMounted, ref } from "vue";
  import Leaderboard from "../../components/Leaderboard/Leaderboard.vue";
  import TitleBannerMini from "../../components/Banner/TitleBannerMini.vue";
  import useLeaderboardStore from "../../stores/leaderboard";

  const leaderboardStore = useLeaderboardStore();

  onMounted(leaderboardStore.getLeaderboardHandle);
</script>

<template>
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
