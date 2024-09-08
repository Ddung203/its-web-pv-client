<script setup>
  import { onMounted, ref, watch } from "vue";
  import { API_URL } from "../../config";
  import HTTP from "../../helper/axiosInstance";
  import { errorNoti, successNoti } from "../../utils/showNotification";
  import { useToast } from "primevue/usetoast";

  const toast = useToast();

  const onlineStatus = ref(navigator.onLine);
  const previousStatus = ref(navigator.onLine);

  async function checkNetwork() {
    try {
      const response = await HTTP.get(`${API_URL}/ping`);

      if (response.success) {
        onlineStatus.value = true;
      } else {
        onlineStatus.value = false;
      }
    } catch (error) {
      onlineStatus.value = false;
    }
  }

  setInterval(checkNetwork, 3000);

  watch(onlineStatus, (newStatus) => {
    if (newStatus !== previousStatus.value) {
      newStatus
        ? successNoti(toast, "Bạn đang trực tuyến")
        : errorNoti(toast, "Không có kết nối mạng");

      previousStatus.value = newStatus;
    }
  });

  onMounted(async () => {
    try {
      document.addEventListener("keydown", function (event) {
        if (event.key === "F12" || event.keyCode === 123) {
          event.preventDefault();
        }
      });

      document.addEventListener("contextmenu", function (event) {
        event.preventDefault();
      });

      window.addEventListener("beforeunload", function (event) {
        event.preventDefault();
        event.returnValue = "";
        return "Bạn có chắc chắn muốn rời khỏi trang này?";
      });

      await HTTP.get("stat/visit");
    } catch (error) {}
  });
</script>

<template>
  <Toast></Toast>
</template>
