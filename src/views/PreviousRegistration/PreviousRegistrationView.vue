<script setup>
  import { onMounted, ref } from "vue";
  import FileUpload from "primevue/fileupload";
  import HeaderThird from "@/components/Header/HeaderThird.vue";
  import Loading from "../../components/Loading/Loading.vue";
  import { uploadImageHandle } from "../../helper/uploadImageHandle.js";
  import { errorNoti, successNoti } from "../../utils/showNotification.js";
  import { useToast } from "primevue/usetoast";
  import checkFalsy from "../../utils/checkFalsyValue.js";
  import HTTP from "../../helper/axiosInstance.js";
  import router from "../../routes/index.js";

  const toast = useToast();

  const isLoading = ref(false);
  const visible = ref(false);
  const show = ref(false);

  const fileupload = ref(null);
  const imageURL = ref("");

  const studentCode = ref("");
  const studentName = ref("");
  const studentClass = ref("");
  const studentPhone = ref("");
  const studentHometown = ref("");
  const studentEmail = ref("");
  const studentFacebook = ref("");

  const userCode = ref("Lỗi");
  const userPassword = ref("Lỗi");

  const selectedHometown = ref({});
  const hometownList = ref([]);

  const onUpload = async () => {
    isLoading.value = true;
    setTimeout(() => {
      isLoading.value = false;
    }, 10000);

    const file = fileupload.value?.files[0] || null;
    const fileName = `${Date.now()}-${file.name}`;
    const folderName = "user-pre-upload";

    const result = await uploadImageHandle(file, fileName, folderName);

    if (result.status === "success") {
      imageURL.value = result.url;
    } else {
      imageURL.value = "";
      errorNoti(
        toast,
        "Xảy ra lỗi khi tải ảnh lên server. Vui lòng thử lại sau ít phút!"
      );
    }
    isLoading.value = false;
  };

  const onSubmit = async () => {
    if (imageURL.value === "") {
      errorNoti(toast, "Vui lòng chọn lại ảnh!");
      return;
    }
    const data = {
      studentCode: studentCode.value.trim(),
      studentName: studentName.value.trim(),
      studentClass: studentClass.value.trim(),
      studentPhone: studentPhone.value.trim(),
      studentHometown: selectedHometown.value.name,
      studentEmail: studentEmail.value.trim(),
      studentFacebook: studentFacebook.value.trim(),
      image: imageURL.value.trim(),
      role: "user",
    };

    if (checkFalsy(data)) {
      errorNoti(toast, "Vui lòng điền đầy đủ thông tin cần thiết!");
      return;
    }

    try {
      const response = await HTTP.post(`/auth/pre-signup`, data);
      imageURL.value = "";
      if (response.success) {
        userCode.value = response.payload.studentCode;
        userPassword.value = response.payload.password;

        visible.value = true;

        successNoti(
          toast,
          "Đăng ký thành công! Hẹn gặp lại bạn tại buổi phỏng vấn!"
        );
      }
    } catch (e) {
      // console.error("Error during endInterviewHandle:", e);

      if (e.error.reason === "Conflict") {
        errorNoti(toast, "Thông tin mã sinh viên bị trùng!");
        alert(
          "Nếu bạn cho rằng mã sinh viên của bạn bị sử dụng trái phép. Hãy liên hệ với chúng mình qua fanpage facebook.com/itsupporter.haui"
        );
        return;
      }

      if (e.error.name === "ValidationError") {
        errorNoti(toast, "Thông tin không hợp lệ!");
        return;
      }

      errorNoti(toast, "Có lỗi xảy ra khi gửi dữ liệu. Vui lòng thử lại sau!");
    }
  };

  const copyToClipboard = async () => {
    try {
      if (!navigator.clipboard) {
        alert(
          `Thiết bị không hỗ trợ. Mã sinh viên: ${userCode.value}. Mật khẩu: ${userPassword.value}`
        );
        return;
      } else {
        await navigator.clipboard.writeText(
          `${userCode.value}/${userPassword.value}`
        );
      }
    } catch (error) {
      errorNoti(toast, "Lỗi khi sao chép vào bộ nhớ tạm!");
    }
  };

  const getProvinces = async () => {
    show.value = true;

    const response = await HTTP.get("provinces");
    hometownList.value = response?.payload?.provinces;
  };

  const exitHandle = () => {
    router.push("/introduction");
  };

  onMounted(getProvinces);
</script>

<template>
  <HeaderThird></HeaderThird>
  <Loading v-if="isLoading"></Loading>

  <!-- Dialog -->

  <div class="flex card justify-content-center">
    <Dialog
      v-model:visible="visible"
      modal
      header="ĐĂNG KÝ THÀNH CÔNG"
      :style="{ width: '25rem' }"
    >
      <p class="block p-text-secondary">Đây là tài khoản của bạn</p>
      <p class="mt-2 mb-5 font-bold text-red-500 uppercase">
        Vui lòng lưu lại trước khi thoát
      </p>
      <div class="flex flex-col gap-3 mb-3 lg:flex-row align-items-center">
        <label
          for="userCode"
          class="font-semibold w-6rem"
          >Mã sinh viên</label
        >
        <InputText
          id="userCode"
          class="flex-auto"
          autocomplete="off"
          v-model="userCode"
          readonly
        />
      </div>
      <div class="flex flex-col gap-3 mb-5 lg:flex-row align-items-center">
        <label
          for="userPassword"
          class="font-semibold w-6rem"
          >Mật khẩu</label
        >
        <InputText
          id="userPassword"
          class="flex-auto"
          autocomplete="off"
          v-model="userPassword"
          readonly
        />
      </div>
      <div class="flex justify-end gap-2">
        <Button
          type="button"
          label="Thoát"
          severity="secondary"
          @click="exitHandle"
        ></Button>
        <Button
          type="button"
          label="Lưu vào bộ nhớ tạm"
          @click="copyToClipboard"
        ></Button>
      </div>
    </Dialog>
  </div>

  <div>
    <!-- Main conent -->
    <div
      class="grid grid-cols-1 lg:grid-cols-2 min-h-[100vh] grid-rows-1 gap-2 overflow-hidden"
    >
      <div class="p-10 lg:p-20 layout-left">
        <p class="text-3xl font-semibold leading-normal">
          Đăng ký tham gia tuyển cộng tác viên <br />
          CLB Hỗ trợ kỹ thuật IT Supporter
        </p>

        <div
          class="flex items-center justify-center m-5 overflow-hidden demo-img"
        >
          <img
            class="block rounded-xl"
            width="250"
            src="../../public/assets/imgs/Hà-new.jpg"
            alt="Demo Image"
          />
        </div>

        <p class="text-lg font-medium note">
          Lưu ý 1: Chọn một bức ảnh của bản thân mà bạn cảm thấy tự tin, ưng ý
          nhất. Nhưng lưu ý phải đủ rõ ràng và có duy nhất một khuôn mặt trong
          khung hình nhé!
        </p>

        <div class="flex items-center justify-center m-5 demo-img">
          <img
            width="250"
            class="block rounded-xl"
            src="../../public/assets/imgs/luu-y.png"
            alt="Demo Image"
          />
        </div>

        <p class="text-lg font-medium note">
          Lưu ý 2: Lưu lại Thông tin tài khoản của bạn trước khi thoát!
        </p>
      </div>

      <div
        class="relative layout-right min-h-[100vh] bg-[#fefefe] py-[40px] px-[30px] lg:px-[80px]"
      >
        <div class="absolute hidden lg:block top-0 left-[-150px] cloud">
          <img
            class="block object-contain h-full"
            src="../../public/assets/imgs/cloud.png"
            alt="cloud image"
          />
        </div>

        <!-- ! FORM -->
        <transition
          enter-active-class="animate__animated animate__fadeInRight"
          leave-active-class="animate__animated animate__fadeOut"
        >
          <div v-if="show">
            <form
              autocomplete="off"
              @submit.prevent="onSubmit"
            >
              <div class="form-group">
                <div class="flex items-start gap-1 mb-2">
                  <span class="font-medium">Mã sinh viên</span>
                  <i
                    class="text-red-600 pi pi-asterisk"
                    style="font-size: 0.56rem"
                  ></i>
                </div>

                <!--  -->
                <div class="mb-5">
                  <InputText
                    class="w-full"
                    type="text"
                    placeholder="2021602195"
                    v-model="studentCode"
                  />
                </div>
              </div>

              <div class="form-group">
                <div class="flex items-start gap-1 mb-2">
                  <span class="font-medium">Họ và tên</span>
                  <i
                    class="text-red-600 pi pi-asterisk"
                    style="font-size: 0.56rem"
                  ></i>
                </div>

                <!--  -->
                <div class="mb-5">
                  <InputText
                    class="w-full"
                    type="text"
                    placeholder="Dương Văn Dũng"
                    v-model="studentName"
                  />
                </div>
              </div>

              <div class="form-group">
                <div class="flex items-start gap-1 mb-2">
                  <span class="font-medium">Lớp - Khóa</span>
                  <i
                    class="text-red-600 pi pi-asterisk"
                    style="font-size: 0.56rem"
                  ></i>
                </div>

                <!--  -->
                <div class="mb-5">
                  <InputText
                    class="w-full"
                    type="text"
                    placeholder="KTPM02 - K16"
                    v-model="studentClass"
                  />
                </div>
              </div>

              <div class="form-group">
                <div class="flex items-start gap-1 mb-2">
                  <span class="font-medium">Email</span>
                  <i
                    class="text-red-600 pi pi-asterisk"
                    style="font-size: 0.56rem"
                  ></i>
                </div>

                <!--  -->
                <div class="mb-5">
                  <InputText
                    class="w-full"
                    type="text"
                    placeholder="cuoicuoi1000@gmail.com"
                    v-model="studentEmail"
                  />
                </div>
              </div>

              <div class="form-group">
                <div class="flex items-start gap-1 mb-2">
                  <span class="font-medium">Số điện thoại</span>
                  <i
                    class="text-red-600 pi pi-asterisk"
                    style="font-size: 0.56rem"
                  ></i>
                </div>

                <!--  -->
                <div class="mb-5">
                  <InputText
                    class="w-full"
                    type="text"
                    placeholder="0383420623"
                    v-model="studentPhone"
                  />
                </div>
              </div>

              <div class="form-group">
                <div class="flex items-start gap-1 mb-2">
                  <span class="font-medium">Quê quán</span>
                  <i
                    class="text-red-600 pi pi-asterisk"
                    style="font-size: 0.56rem"
                  ></i>
                </div>

                <!--  -->
                <div class="mb-5">
                  <!-- ! -->
                  <div class="flex justify-center card">
                    <FloatLabel class="w-full md:w-14rem">
                      <Dropdown
                        v-model="selectedHometown"
                        inputId="dd-city"
                        :options="hometownList"
                        optionLabel="name"
                        class="w-full"
                        filter
                      />
                    </FloatLabel>
                  </div>
                </div>
              </div>

              <div class="form-group">
                <div class="flex items-start gap-1 mb-2">
                  <span class="font-medium">Link Facebook</span>
                  <i
                    class="text-red-600 pi pi-asterisk"
                    style="font-size: 0.56rem"
                  ></i>
                </div>

                <!--  -->
                <div class="mb-5">
                  <InputText
                    class="w-full"
                    type="text"
                    placeholder="https://www.facebook.com/ddung203"
                    v-model="studentFacebook"
                  />
                </div>
              </div>

              <div class="mb-10 form-group">
                <div class="flex items-start gap-1 mb-2">
                  <span class="font-medium">Checkin bằng ảnh</span>
                  <i
                    class="text-red-600 pi pi-asterisk"
                    style="font-size: 0.56rem"
                  ></i>
                </div>

                <!-- studentImage -->
                <div
                  class="flex flex-col items-center justify-start gap-4 mb-5 lg:flex-row lg:relative"
                >
                  <FileUpload
                    ref="fileupload"
                    mode="basic"
                    name="demo[]"
                    accept="image/*"
                    :maxFileSize="30000000"
                    :customUpload="true"
                    @change="onUpload"
                  />
                  <div
                    class="flex items-center justify-center lg:absolute lg:top-0 lg:right-0"
                  >
                    <a
                      :href="imageURL"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img
                        v-if="imageURL"
                        class="max-h-[150px]"
                        :src="imageURL"
                        alt="Preview Image"
                      />
                    </a>
                  </div>
                </div>
              </div>

              <!-- ! -->
              <div
                class="flex items-center justify-center w-full lg:mt-28 form-group"
              >
                <Button
                  type="submit"
                  class="flex items-center justify-center w-full"
                >
                  Đăng ký
                </Button>
              </div>
            </form>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .layout-left {
    background-image: linear-gradient(to right, #fdd359, #f5945d);

    color: #fff;
  }
</style>
