<script setup>
  import { onMounted, ref } from "vue";
  import useAuthStore from "../../stores/auth";
  import { errorNoti, successNoti } from "../../utils/showNotification";
  import { useToast } from "primevue/usetoast";
  import router from "../../routes";
  import Loading from "../../components/Loading/Loading.vue";
  import checkFalsy from "../../utils/checkFalsyValue";

  const loading = ref(false);
  const toast = useToast();
  const authStore = useAuthStore();

  const show = ref(false);

  const studentCode = ref("");
  const password = ref("");

  const loginHandle = async () => {
    const loginData = {
      studentCode: studentCode.value.trim(),
      password: password.value,
    };
    try {
      loading.value = true;

      if (checkFalsy(loginData)) {
        throw new Error();
      }

      await authStore.login(loginData);
    } catch (error) {
      errorNoti(toast, "Tài khoản hoặc mật khẩu không đúng");

      return;
    } finally {
      loading.value = false;
    }

    if (authStore.isLoggedIn) {
      successNoti(toast, "Đăng nhập thành công", 500);
      router.push("/introduction");
    }
  };

  onMounted(() => {
    show.value = true;
  });
</script>

<template>
  <Toast />
  <Loading v-if="loading"></Loading>

  <div class="fontP">
    <div class="background-container"></div>
    <div class="flex items-center justify-center min-h-screen">
      <!-- Animate -->
      <transition
        enter-active-class="animate__animated animate__fadeInDown"
        leave-active-class="animate__animated animate__fadeOut"
      >
        <div
          v-if="show"
          class="p-6 form-custom"
        >
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
                  :feedback="false"
                  toggleMask
                />
                <label for="password">Mật khẩu</label>
              </FloatLabel>
            </div>
            <!-- Button submit -->
            <div>
              <Button
                :disabled="loading"
                class="flex items-center justify-center w-full"
                type="submit"
                >Đăng nhập</Button
              >
            </div>
          </form>

          <div class="pt-6 text-sm text-center text-black">
            Bạn chưa có tài khoản?
            <router-link to="/previous-registration"
              ><span class="text-gray-100 underline">
                Đăng ký</span
              ></router-link
            >
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<style scoped>
  .background-container {
    font-family: "Poppins", sans-serif;
    background-image: url("https://firebasestorage.googleapis.com/v0/b/upload-images-42481.appspot.com/o/cdn%2FDDT00475_fixed.jpg?alt=media&token=e9c39dfe-3a0e-4f98-9682-b104110a1bd5");
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
