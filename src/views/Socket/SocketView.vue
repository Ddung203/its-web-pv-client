<script setup>
  import { ref } from "vue";
  import useSocketStore from "../../stores/socket";
  import Header from "../../components/Header/Header.vue";

  const socketStore = useSocketStore();

  const disconnectSocketHandler = async () => {
    try {
      await socketStore.disconnectSocket();
    } catch (error) {
      console.log(error);
    }
  };

  import NewCard from "@/components/Question/NewCard.vue";
</script>

<template>
  <Header></Header>

  <NewCard></NewCard>

  <!-- <h1>useSocketStore</h1>
  <Button @click="socketStore.initializeSocket">Init</Button>
  <Button @click="disconnectSocketHandler">Disconnect</Button> -->
</template>

<style scoped></style>
