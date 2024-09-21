<script setup>
  import { ref, onMounted } from "vue";
  import axios from "axios";

  const ipAddress = ref("");

  // Gọi API để lấy địa chỉ IP public của client
  const getPublicIP = async () => {
    try {
      const response = await axios.get("https://api.ipify.org?format=json");
      ipAddress.value = response.data.ip;

      // Gửi IP lên server
      await axios.post("http://your-server-api.com/save-ip", {
        ip: ipAddress.value,
      });
    } catch (error) {
      console.error("Error fetching IP:", error);
    }
  };

  onMounted(() => {
    getPublicIP();
  });
</script>

<template>
  <div>
    <p>Your IP Address: {{ ipAddress }}</p>
  </div>
</template>
