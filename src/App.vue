<script setup>
  import { useRoute } from "vue-router";
  import { computed } from "vue";
  import Header from "./components/Header/Header.vue";
  import Footer from "./components/Footer/Footer.vue";
  import NavBar from "./components/NavBar/NavBar.vue";

  const route = useRoute();

  const showComponent = computed(() => {
    return (
      route.path !== "/login" &&
      route.path !== "/test" &&
      route.path !== "/introduction"
    );
  });
</script>

<template>
  <div>
    <Header v-if="showComponent" />
    <NavBar v-if="showComponent" />
    <router-view />
    <Footer v-if="showComponent" />
  </div>
</template>

<style scoped></style>
