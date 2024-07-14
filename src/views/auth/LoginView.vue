<script setup>
  import { ref } from "vue";
  import useAuthStore from "../../stores/auth";
  import showNotification from "../../utils/showNotification";
  import { useToast } from "primevue/usetoast";
  import router from "../../routes";

  const toast = useToast();
  const authStore = useAuthStore();

  const studentCode = ref("2021602111");
  const password = ref("123456");

  const loginHandle = async () => {
    const loginData = {
      studentCode: studentCode.value,
      password: password.value,
    };
    try {
      await authStore.login(loginData);
    } catch (error) {
      // console.log(error);
      showNotification(
        toast,
        "error",
        "Thông báo",
        error?.error?.message || "Tài khoản hoặc mật khẩu không đúng",
        1500
      );

      return;
    }

    if (authStore.isLoggedIn) {
      showNotification(
        toast,
        "success",
        "Thông báo",
        "Đăng nhập thành công",
        1500
      );

      setTimeout(() => {
        router.push("/import");
      }, 1500);
    }
  };

  const forgotPasswordHandle = () => {
    console.log("Quên mật khẩu");
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
                class="outline-1 outline-[#ffcd94]"
                v-model="studentCode"
              />
              <label for="studentCode">Mã sinh viên</label>
            </FloatLabel>
          </div>
          <!-- Password -->
          <div>
            <FloatLabel>
              <InputText
                id="password"
                type="password"
                class="outline-1 outline-[#ffcd94]"
                v-model="password"
              />
              <label for="password">Mật khẩu</label>
            </FloatLabel>
          </div>
          <!-- Quên mật khẩu -->
          <div class="flex justify-end">
            <a
              href="#"
              @click.prevent="forgotPasswordHandle"
              class="text-blue-500 hover:underline"
              >Quên mật khẩu?</a
            >
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
    background-image: url("../../public/assets/imgs/DDT00475.png");
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
