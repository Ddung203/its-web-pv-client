<script setup>
  const props = defineProps({
    title: {
      type: String,
      required: true,
    },
  });
</script>

<template>
  <div>
    <div
      class="border border-[#ccc] min-h-[60px] flex flex-col items-center justify-center bg-c"
    >
      <div class="flex flex-col px-5 banner">
        <h2 class="">{{ props.title }}</h2>
      </div>

      <!-- INPUT -->
    </div>
  </div>
</template>

<style scoped>
  .banner {
    color: #fff;
    font-family: Open Sans;
    font-size: 30px;
    font-weight: 700;
    line-height: 36px;
    margin: 0px 0px;
    text-align: left;
  }

  .p-c {
    color: #fff;
    font-family: Open Sans;
    font-size: 15px;
    line-height: 21.75px;
    margin: 0px 0px 15px;
    text-align: left;
  }

  .bg-c {
    background-image: linear-gradient(to left, #e9ff97, #ffa38f);
  }

  .i-none {
    display: none;
  }

  h2 {
    font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  }
</style>
