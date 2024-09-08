<script setup>
  import NavBar from "./components/NavBar/NavBar.vue";
  import OnlineStatus from "./components/OnlineStatus/OnlineStatus.vue";
</script>

<template>
  <div>
    <OnlineStatus></OnlineStatus>
    <NavBar />
    <router-view />
  </div>
</template>

<style scoped></style>
