<script setup>
  import { ref } from "vue";

  const onlineStatus = ref(navigator.onLine);

  async function checkNetwork() {
    try {
      const response = await fetch(
        "https://web-pv-be.onrender.com/api/v1/ping",
        {
          method: "GET",
        }
      );
      if (response.ok) {
        onlineStatus.value = true;
      } else {
        onlineStatus.value = false;
      }
    } catch (error) {
      onlineStatus.value = false;
    }
  }

  setInterval(checkNetwork, 5000);
</script>

<template>
  <div>
    <p v-if="onlineStatus">Bạn đang trực tuyến</p>
    <p v-else>Không có kết nối mạng</p>
  </div>
</template>
