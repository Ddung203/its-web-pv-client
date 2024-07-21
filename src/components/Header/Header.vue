<script setup>
  import useAuthStore from "@/stores/auth";
  import { API_URL } from "../../config";
  import useUIStore from "../../stores/ui";
  import showNotification from "../../utils/showNotification";
  import { useToast } from "primevue/usetoast";
  import router from "../../routes";

  const toast = useToast();
  const authStore = useAuthStore();
  const UIStore = useUIStore();

  console.log(`${API_URL}/ping`);

  const logOutHandle = () => {
    // setTimeout(() => {
    //   authStore.logout();
    //   router.push("/login");
    // }, 1000);
  };
</script>

<template>
  <Toast />

  <header class="w-[100vw] h-[66px]">
    <div class="">
      <div class="fixed top-0 left-0 w-[100%] z-40 bg-white shadow-c">
        <div class="flex flex-row items-center justify-between py-3 px-7">
          <!--  -->
          <section class="left">
            <div class="flex gap-2 justify-content-center introduction-farm">
              <Button
                icon="pi pi-align-justify"
                @click="UIStore.toggle"
              />
            </div>
          </section>

          <!-- Middle -->
          <section>
            <!-- LOGO -->
            <router-link to="/introduction">
              <div class="logo">
                <img
                  class="block h-[40px]"
                  src="@/public/assets/imgs/logofull.png"
                  alt="Logo"
                />
              </div>
            </router-link>
          </section>
          <!--  -->
          <section class="hidden gap-5 md:flex lg:flex-row right">
            <Button
              icon="pi pi-wrench"
              rounded
              @click="logOutHandle"
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
