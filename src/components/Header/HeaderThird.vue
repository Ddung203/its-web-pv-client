<script setup>
  import useAuthStore from "@/stores/auth";
  import useUIStore from "../../stores/ui";
  import { useToast } from "primevue/usetoast";
  import router from "../../routes";
  import NavBar from "../NavBar/NavBar.vue";

  const toast = useToast();
  const authStore = useAuthStore();
  const UIStore = useUIStore();

  const header = authStore.getStudentName || "Guest";
</script>

<template>
  <Toast />
  <header class="w-[100vw] h-[66px]">
    <div class="">
      <div class="fixed top-0 left-0 w-[100%] z-40 bg-white shadow-c">
        <div class="grid grid-cols-3 grid-rows-1 gap-0 py-3 px-7">
          <!--  -->
          <section class="left">
            <div class="flex gap-2 justify-content-center introduction-farm">
              <Button
                outlined
                icon="pi pi-align-justify"
                @click="UIStore.toggle"
              />
            </div>
          </section>

          <!-- Middle -->
          <section class="flex items-center justify-between">
            <!-- LOGO -->
            <div class="logo">
              <a href="#">
                <img
                  class="block max-h-[40px]"
                  src="@/public/assets/logos/logofull.png"
                  alt="Logo"
              /></a>
            </div>
          </section>
          <!--  -->
          <section class="hidden gap-5 md:flex lg:flex-row right"></section>
        </div>
      </div>
    </div>
  </header>
</template>

<style scoped>
  .shadow-c {
    box-shadow: rgba(17, 17, 26, 0.1) 0px 1px 0px;
  }
  .logo {
    margin: 0 auto;
  }

  header {
    -moz-user-select: none !important;
    -webkit-touch-callout: none !important;
    -webkit-user-select: none !important;
    -khtml-user-select: none !important;
    -moz-user-select: none !important;
    -ms-user-select: none !important;
    user-select: none !important;
  }
</style>
