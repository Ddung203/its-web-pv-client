<script setup>
  import { useRoute } from "vue-router";
  import { computed } from "vue";
  import Header from "./components/Header/Header.vue";
  import Footer from "./components/Footer/Footer.vue";
  import NavBar from "./components/NavBar/NavBar.vue";
  import useUIStore from "./stores/ui";
  import useAuthStore from "./stores/auth";
  import useIntervieweeStore from "./stores/interviewee";
  import useInterviewerStore from "./stores/interviewer";
  import useLeaderboardStore from "./stores/leaderboard";
  import useQuestionStore from "./stores/question";

  const route = useRoute();

  const UIStore = useUIStore();
  const authStore = useAuthStore();
  const intervieweeStore = useIntervieweeStore();
  const interviewerStore = useInterviewerStore();
  const leaderboardStore = useLeaderboardStore();
  const questionStore = useQuestionStore();

  const showComponent = computed(() => {
    return route.path !== "/login" && route.path !== "/test";
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
