<script setup>
  import { ref, watch } from "vue";
  import { API_URL } from "../../config";

  const onlineStatus = ref(navigator.onLine);

  async function checkNetwork() {
    try {
      const response = await fetch(`${API_URL}/ping`, {
        method: "GET",
      });

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

  watch(onlineStatus, () => {
    onlineStatus.value
      ? console.log("Đã kết nối!")
      : console.log("Không có kết nối đến server!");
  });
</script>

<template></template>
