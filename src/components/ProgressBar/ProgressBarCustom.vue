<script setup>
  import { ref, computed, watch } from "vue";

  const progress = ref(0);

  const handleClick = (event) => {
    const rect = event.target.getBoundingClientRect();
    const clickPosition = event.clientX - rect.left;
    const newProgress = Math.round((clickPosition / rect.width) * 100);
    progress.value = Math.max(0, Math.min(100, newProgress));
  };

  const progressBarStyle = computed(() => ({
    width: `${progress.value}%`,
  }));
</script>

<template>
  <div class="flex flex-col items-center space-y-4">
    <div
      @click="handleClick"
      class="relative w-64 h-8 overflow-hidden bg-gray-200 rounded-full cursor-pointer"
    >
      <div
        :style="progressBarStyle"
        class="absolute top-0 left-0 h-full duration-300 bg-blue-500 transition-width"
      ></div>
    </div>

    <div>
      <span>{{ progress }}</span>
    </div>
  </div>
</template>
