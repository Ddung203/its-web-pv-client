<script setup>
  import { ref } from "vue";
  import HTTP from "../../helper/axiosInstance";
  import showNotification from "../../utils/showNotification";
  import { useToast } from "primevue/usetoast";
  import router from "../../routes";

  // toPath: {
  //     type: String,
  //     required: true,
  //   },
  const props = defineProps({
    urlPath: {
      type: String,
      required: true,
    },

    idObject: {
      type: String,
      required: true,
    },
  });

  const toast = useToast();

  const deleteHandle = async () => {
    try {
      await HTTP.delete(`${props.urlPath}/${props.idObject}`);
      showNotification(toast, "success", "Thông báo", "Xóa thành công", 1500);
      // router.push("/");
    } catch (error) {
      console.log("error :>> ", error);
      showNotification(
        toast,
        "error",
        "Thông báo",
        error?.error?.message || "Xóa thất bại",
        1500
      );
    }
  };
</script>

<template>
  <Toast />
  <div>
    <Button
      type="button"
      label="Xóa"
      severity="danger"
      @click="deleteHandle"
    ></Button>
  </div>
</template>

<style scoped>
  /*  */
</style>
