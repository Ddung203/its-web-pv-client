<script setup>
  import { ref } from "vue";
  import useAuthStore from "@/stores/auth";
  const authStore = useAuthStore();
</script>

<template>
  <Toast />

  <header class="w-[100vw] h-[66px]">
    <div class="">
      <div class="fixed top-0 left-0 w-[100%] z-40 bg-white shadow-c">
        <div class="flex flex-row items-center justify-between py-3 px-7">
          <!--  -->
          <section class="left">
            <div class="logo">
              <img
                class="block h-[40px]"
                src="https://firebasestorage.googleapis.com/v0/b/upload-images-42481.appspot.com/o/logos%2FLogo_bo%203%20goc.png?alt=media&token=aeb9dfc2-e57d-403a-a884-9ffd9ed2fb53"
                alt="Logo"
              />
            </div>
          </section>

          <!--  -->
          <p>{{ authStore.getRole }}</p>

          <!--  -->
          <section class="flex gap-5 lg:flex-row right">
            <Button
              label="Đăng xuất"
              severity="danger"
              rounded
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
