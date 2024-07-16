<script setup>
  import { useRoute } from "vue-router";
  import { computed } from "vue";
  import Header from "./components/Header/Header.vue";
  import Footer from "./components/Footer/Footer.vue";
  import NavBar from "./components/NavBar/NavBar.vue";
  import useUIStore from "./stores/ui";
  import useAuthStore from "./stores/auth";

  const route = useRoute();
  const UIStore = useUIStore();
  const authStore = useAuthStore();

  const showHeader = computed(() => {
    return route.path !== "/login";
  });
</script>

<template>
  <div>
    <Header v-if="showHeader" />
    <NavBar v-if="showHeader" />
    <router-view />
    <Footer v-if="showHeader" />
  </div>
</template>

<style scoped></style>
