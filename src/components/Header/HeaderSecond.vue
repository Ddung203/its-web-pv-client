<script setup>
  import useAuthStore from "@/stores/auth";
  import { API_URL } from "../../config";
  import useUIStore from "../../stores/ui";
  import { useToast } from "primevue/usetoast";
  import router from "../../routes";

  const toast = useToast();
  const authStore = useAuthStore();
  const UIStore = useUIStore();

  console.log(`${API_URL}/ping`);
</script>

<template>
  <Toast />
  <header class="w-[100vw] h-[66px]">
    <div class="">
      <div class="fixed top-0 left-0 w-[100%] z-40 bg-white shadow-c">
        <div
          class="flex flex-row items-center justify-between md:grid md:grid-cols-3 md:grid-rows-1 md:gap-0 px-[20px] py-3"
        >
          <!-- Left -->
          <section class="left">
            <div class="flex gap-2 justify-content-center introduction-farm">
              <Button
                icon="pi pi-align-justify"
                @click="UIStore.toggle"
                outlined
              />
            </div>
          </section>

          <!-- Middle -->
          <section class="flex flex-col items-center justify-center">
            <p class="hidden md:block">Đã chọn</p>
            <span class="font-bold">0/20</span>
          </section>
          <!-- Right -->
          <section class="md:flex md:justify-end lg:flex-row right">
            <Button
              label="Hoàn thành"
              severity="secondary"
              outlined
            />
          </section>
        </div>
      </div>
    </div>
  </header>
</template>

<style scoped>
  .shadow-c {
    box-shadow: rgba(17, 17, 26, 0.1) 0px 1px 0px;
  }
</style>
