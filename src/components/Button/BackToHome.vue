<script setup>
  import router from "../../routes";

  const handleBackToHome = () => {
    router.push("/");
  };
</script>

<template>
  <div>
    <Button
      @click="handleBackToHome"
      severity="info"
      outlined
    >
      <i
        class="pi pi-arrow-left"
        style="font-size: 1rem"
      ></i>
      <span> Quay lại</span>
    </Button>
  </div>
</template>

<style scoped>
  /*  */
</style>
