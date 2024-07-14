<script setup>
  import { useRoute } from "vue-router";
  import { computed } from "vue";
  import Header from "./components/Header/Header.vue";
  import Footer from "./components/Footer/Footer.vue";

  const route = useRoute();

  const showHeader = computed(() => {
    return route.path !== "/login";
  });
</script>

<template>
  <div>
    <Header v-if="showHeader" />
    <router-view />
    <Footer v-if="showHeader" />
  </div>
</template>

<style scoped></style>
