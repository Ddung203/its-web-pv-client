<script setup>
  import Header from "@/components/Header/Header.vue";
  import { ref, onMounted } from "vue";
  import Card from "primevue/card";
  import Toolbar from "primevue/toolbar";
  import HTTP from "../../helper/axiosInstance";
  import { errorNoti, successNoti } from "../../utils/showNotification";
  import Tag from "primevue/tag";
  import ScrollToTop from "../../components/Button/ScrollToTop.vue";
  import { useToast } from "primevue/usetoast";
  import Loading from "../../components/Loading/Loading.vue";

  const toast = useToast();
  const isLoading = ref(false);
  const visible = ref(false);
  const users = ref([]);
  const play = ref([]);
  const isPassedCount = ref(0);
  const isRejectedCount = ref(0);

  const fetchUsers = async ({ limit = 500, filter = {}, sort = {} } = {}) => {
    const query = `user/list?limit=${limit}&filter=${JSON.stringify(
      filter
    )}&sort=${JSON.stringify(sort)}`;

    try {
      isLoading.value = true;

      const response = await HTTP.get(query);

      users.value = response?.payload?.users || [];

      isPassedCount.value = 0;
      isRejectedCount.value = 0;

      users.value.forEach((u) => {
        if (u.isPassed) {
          isPassedCount.value++;
        } else {
          isRejectedCount.value++;
        }
      });
    } catch (error) {
      console.log(error);
    } finally {
      isLoading.value = false;
    }
  };

  const showStudentResult = async (userID, studentName) => {
    const response = await HTTP.get(
      `play/list?filter={"userID":${JSON.stringify(userID)}}`
    );
    play.value = response?.payload?.plays.data[0] || null;

    if (!play.value) {
      errorNoti(toast, "Không lấy được thông tin!");
      return;
    }

    play.value.comment = play.value.comment.replace(/\n/g, "<br />");
    play.value.studentName = studentName;

    visible.value = true;
  };

  const reviewUser = async (status) => {
    try {
      await HTTP.put(`user/update/${play.value.userID.studentCode}`, {
        isPassed: status,
      });

      visible.value = false;

      await fetchUsers({
        filter: { role: "user", isInterviewed: "1" },
        sort: { isPassed: -1 },
      });
    } catch (e) {
      console.log("e :>> ", e);
    }
  };

  const sendMailHandle = async (
    studentCode,
    studentName,
    studentClass,
    studentEmail,
    studentPhone,
    studentHometown
  ) => {
    const data = {
      senderSubject: "Thông báo kết quả xét tuyển Cộng tác viên năm 2024",
      recipients: [
        {
          studentCode,
          studentName,
          studentClass,
          studentEmail,
          studentPhone,
          studentHometown,
        },
      ],
    };
    try {
      isLoading.value = true;
      const response = await HTTP.post(`email/sendEmails`, data);

      if (response.success) {
        successNoti(toast, `Đã gửi mail đến ${studentName}`);
      }
    } catch (error) {
      errorNoti(toast, `Gửi mail đến ${studentName} thất bại!`);
    } finally {
      isLoading.value = false;
    }

    await fetchUsers({
      filter: { role: "user", isInterviewed: "1" },
      sort: { isPassed: -1 },
    });
  };

  const nameSearch = ref("");

  const searchBtnHandle = async () => {
    await fetchUsers({
      filter: {
        role: "user",
        isInterviewed: "1",
        studentName: { $regex: nameSearch.value, $options: "i" },
      },
      sort: { updatedAt: 1, isPassed: -1 },
    });
  };

  onMounted(() => {
    fetchUsers({
      filter: { role: "user", isInterviewed: "1" },
      sort: { updatedAt: 1, isPassed: -1 },
    });
  });
</script>

<template>
  <Loading v-if="isLoading"></Loading>
  <Toast></Toast>
  <Header></Header>

  <!-- Toolbar -->
  <Toolbar class="px-[25px] lg:px-10 mb-6">
    <template #start>
      <h1 class="text-2xl font-bold uppercase">Duyệt danh sách CTV</h1>
    </template>

    <template #center>
      <form
        class="flex items-center justify-center gap-3"
        autocomplete="off"
      >
        <IconField>
          <InputText
            v-model="nameSearch"
            placeholder="Tìm tên"
          />
        </IconField>
        <Button
          icon="pi pi-search"
          aria-label="Search"
          @click="searchBtnHandle"
        />
      </form>
    </template>

    <template #end>
      <div class="flex flex-wrap gap-3">
        <Button
          :label="`CTV: ${isPassedCount}`"
          severity="success"
          rounded
          @click="
            fetchUsers({
              filter: { role: 'user', isInterviewed: '1', isPassed: '1' },
              sort: { updatedAt: 1, isPassed: -1 },
            })
          "
        />
        <Button
          :label="`Loại: ${isRejectedCount}`"
          severity="info"
          rounded
          @click="
            fetchUsers({
              filter: { role: 'user', isInterviewed: '1', isPassed: '0' },
              sort: { updatedAt: 1, isPassed: -1 },
            })
          "
        />
        <Button
          label="Tất cả"
          severity="warn"
          rounded
          @click="
            fetchUsers({
              filter: { role: 'user', isInterviewed: '1' },
              sort: { updatedAt: 1, isPassed: -1 },
            })
          "
        />
      </div>
    </template>
  </Toolbar>

  <!-- Danh sách người dùng -->
  <div
    class="grid grid-cols-1 gap-4 px-5 pb-8 md:grid-cols-2 lg:grid-cols-4 md:justify-start lg:px-20"
  >
    <template
      v-for="(user, index) in users"
      :key="index"
    >
      <div class="flex items-center justify-center">
        <Card style="width: 20rem; overflow: hidden">
          <template #header>
            <div class="flex items-center justify-center">
              <img
                class="h-[200px] pt-5 cursor-pointer"
                alt="user image"
                :src="user.image"
                @click="showStudentResult(user._id, user.studentName)"
              />
            </div>
          </template>
          <template #title>{{ user.studentName }}</template>
          <template #subtitle>{{ user.studentCode }}</template>
          <template #content>
            <p class="m-0 mb-1">
              Lớp: <strong>{{ user.studentClass }}</strong>
            </p>
            <p class="m-0 mb-1">
              Quê quán: <strong>{{ user.studentHometown }}</strong>
            </p>
            <p class="m-0 mb-1">
              Email: <strong>{{ user.studentEmail }}</strong>
            </p>
            <div v-if="user.isPassed">
              <span>Xếp loại: </span>
              <Tag
                class="uppercase"
                icon="pi pi-check"
                severity="success"
                value="Cộng tác viên"
              ></Tag>
            </div>
            <div v-else>
              <span>Xếp loại: </span>
              <Tag
                class="uppercase"
                icon="pi pi-times"
                severity="danger"
                value="Bị loại"
              ></Tag>
            </div>
          </template>
          <template #footer>
            <div class="flex gap-4 mt-1">
              <Button
                label="Chi tiết"
                class="w-full"
                @click="showStudentResult(user._id, user.studentName)"
              />
              <Button
                v-if="!user.isReceivedMail"
                :disabled="!user.isPassed"
                severity="info"
                label="Gửi mail"
                class="w-full"
                @click="
                  sendMailHandle(
                    user.studentCode,
                    user.studentName,
                    user.studentClass,
                    user.studentEmail,
                    user.studentPhone,
                    user.studentHometown
                  )
                "
              />
              <Button
                v-if="user.isReceivedMail"
                severity="secondary"
                label="Đã gửi mail"
                disabled
                class="w-full"
              />
            </div>
          </template>
        </Card>
      </div>
    </template>
  </div>

  <!-- Dialog -->
  <div class="flex justify-center card">
    <Dialog
      v-model:visible="visible"
      modal
      header="Thông tin"
      :style="{ width: '25rem' }"
      maximizable
    >
      <!-- Nội dung phỏng vấn -->
      <div class="flex flex-col items-center justify-center">
        <div class="mb-5">
          <a
            :href="play.userID.image"
            target="_blank"
          >
            <img
              class="max-h-[200px]"
              :src="play.userID.image"
              alt="User"
            />
          </a>
        </div>
        <div>
          <p>
            Sinh viên: <strong>{{ play.studentName }}</strong>
          </p>
          <p>
            Người phỏng vấn: <strong>{{ play.interviewer }}</strong>
          </p>
          <p>
            Thời gian kết thúc: <strong>{{ play.endTime }}</strong>
          </p>
          <p>
            Điểm bài test: <strong>{{ play.score }}</strong>
          </p>
          <p>
            Điểm phỏng vấn: <strong>{{ play.interviewScore }}</strong>
          </p>

          <p>Nhận xét: <strong v-html="play.comment"></strong></p>
        </div>
      </div>
      <!-- Nút Duyệt/Từ chối -->
      <div class="flex justify-end gap-5 mt-11">
        <Button
          type="button"
          label="Đóng"
          severity="secondary"
          @click="visible = false"
        ></Button>
        <Button
          v-if="play.userID.isPassed !== 0"
          type="button"
          label="Từ chối"
          @click="reviewUser(0)"
        ></Button>
        <Button
          v-if="play.userID.isPassed === 0"
          type="button"
          label="Duyệt CTV"
          @click="reviewUser(1)"
        ></Button>
      </div>
    </Dialog>
  </div>

  <ScrollToTop></ScrollToTop>
</template>
