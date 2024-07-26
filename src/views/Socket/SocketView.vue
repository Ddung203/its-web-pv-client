<script setup>
  import { ref } from "vue";
  import useSocketStore from "../../stores/socket";
  const socketStore = useSocketStore();

  const disconnectSocketHandler = async () => {
    try {
      await socketStore.disconnectSocket();
    } catch (error) {
      console.log(error);
    }
  };
</script>

<template>
  <h1>useSocketStore</h1>
  <Button @click="socketStore.initializeSocket">Init</Button>
  <Button @click="disconnectSocketHandler">Disconnect</Button>
</template>

<style scoped>
  /*  */
</style>
