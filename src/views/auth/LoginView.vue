<script setup>
  import { ref } from "vue";
  import useAuthStore from "../../stores/auth";
  import { errorNoti, successNoti } from "../../utils/showNotification";
  import { useToast } from "primevue/usetoast";
  import router from "../../routes";

  const toast = useToast();
  const authStore = useAuthStore();

  const studentCode = ref("");
  const password = ref("");

  const loginHandle = async () => {
    const loginData = {
      studentCode: studentCode.value.trim(),
      password: password.value,
    };
    try {
      await authStore.login(loginData);
    } catch (error) {
      console.log(error);
      errorNoti(
        toast,
        error?.error?.message || "Tài khoản hoặc mật khẩu không đúng"
      );

      return;
    }

    if (authStore.isLoggedIn) {
      successNoti(toast, "Đăng nhập thành công");

      setTimeout(() => {
        router.push("/introduction");
      }, 1500);
    }
  };
</script>

<template>
  <Toast />

  <div class="fontP">
    <div class="background-container"></div>
    <div class="flex items-center justify-center min-h-screen">
      <!-- <div class="p-6 bg-white bg-opacity-75 rounded-md shadow-lg"> -->
      <div class="p-6 form-custom">
        <form
          @submit.prevent="loginHandle"
          autocomplete="off"
          class="flex flex-col max-w-[300px] gap-6"
        >
          <span class="mb-4 text-3xl font-bold text-center text-[#fff]">
            Đăng nhập
          </span>
          <!-- Username -->
          <div>
            <FloatLabel>
              <InputText
                id="studentCode"
                class="outline-1 outline-[#ffcd94] w-full"
                v-model="studentCode"
              />
              <label for="studentCode">Mã sinh viên</label>
            </FloatLabel>
          </div>
          <!-- Password -->
          <div class="pt-4">
            <FloatLabel>
              <Password
                id="password"
                v-model="password"
                toggleMask
              />
              <label for="password">Mật khẩu</label>
            </FloatLabel>
          </div>
          <!-- Button submit -->
          <div>
            <Button
              class="flex items-center justify-center w-full"
              type="submit"
              >Đăng nhập</Button
            >
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .background-container {
    font-family: "Poppins", sans-serif;
    background-image: url("../../public/assets/imgs/DDT00475_fixed.jpg");
    background-size: cover;
    background-position: center;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
  }

  .form-custom {
    background-color: rgba(255, 255, 255, 0.13);
    border-radius: 10px;
    backdrop-filter: blur(10px);
    border: 2px solid rgba(255, 255, 255, 0.1);
    box-shadow: 0 0 40px rgba(8, 7, 16, 0.6);
  }

  .fontP {
    font-family: "Poppins", sans-serif;
  }
</style>
