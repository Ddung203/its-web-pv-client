<script setup>
  import useAuthStore from "@/stores/auth";
  import useUIStore from "../../stores/ui";

  const authStore = useAuthStore();
  const UIStore = useUIStore();

  const header = authStore.getStudentName || "Guest";
</script>

<template>
  <Toast />

  <header class="w-[100vw] h-[66px]">
    <div class="">
      <div class="fixed top-0 left-0 w-[100%] z-40 bg-white shadow-c">
        <div
          class="flex flex-row-reverse items-center justify-between py-3 md:flex-row lg:grid lg:grid-cols-3 lg:grid-rows-1 lg:gap-0 px-7"
        >
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
          <section class="lg:flex lg:items-center lg:justify-between">
            <!-- LOGO -->
            <div class="logo">
              <router-link to="/introduction">
                <img
                  class="block h-[40px]"
                  src="@/public/assets/logos/logofull.png"
                  alt="Logo"
                />
              </router-link>
            </div>
          </section>
          <!--  -->
          <section
            class="hidden gap-5 md:flex lg:flex-row lg:justify-end right"
          >
            <Button
              :label="header"
              outlined
              icon="pi pi-user"
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
  .logo {
    margin: 0 auto;
  }
</style>
