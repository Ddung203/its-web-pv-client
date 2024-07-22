<script setup>
  import { ref } from "vue";

  import ProgressBarCustom from "@/components/ProgressBar/ProgressBarCustom.vue";
  import OnlineStatus from "@/components/OnlineStatus/OnlineStatus.vue";

  const value = ref(40);

  function increaseValue() {
    if (value.value < 100) {
      value.value += 5;
    }
  }

  function decreaseValue() {
    if (value.value > 0) {
      value.value -= 5;
    }
  }
</script>

<template>
  <div class="mt-8 px-[30px]">
    <div class="grid grid-cols-1 grid-rows-1 gap-5 md:grid-cols-3">
      <div>
        <div class="card">
          <ProgressBar :value="value"> {{ value }}/100 </ProgressBar>
          <button
            @click="increaseValue"
            class="mt-2 btn btn-primary"
          >
            Increase
          </button>
          <button
            @click="decreaseValue"
            class="mt-2 btn btn-secondary"
          >
            Decrease
          </button>
        </div>
      </div>
      <div>
        <ProgressBarCustom></ProgressBarCustom>
      </div>
      <div><OnlineStatus></OnlineStatus></div>
    </div>
  </div>
</template>

<style scoped>
  /* Add some basic styling for buttons if needed */
  .btn {
    display: inline-block;
    padding: 10px 20px;
    margin: 5px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }

  .btn-primary {
    background-color: #007bff;
    color: white;
  }

  .btn-secondary {
    background-color: #6c757d;
    color: white;
  }
</style>
