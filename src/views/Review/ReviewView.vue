<script setup>
  import Header from "@/components/Header/Header.vue";
  import { ref, onMounted } from "vue";
  import DataTable from "primevue/datatable";
  import Column from "primevue/column";
  import MultiSelect from "primevue/multiselect";
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

  const columns = ref([
    { field: "studentName", header: "Họ tên" },
    { field: "image", header: "Image" },
    { field: "quantity", header: "Quantity" },
  ]);
  const selectedColumns = ref(columns.value);

  const onToggle = (val) => {
    selectedColumns.value = columns.value.filter((col) => val.includes(col));
  };

  //
  const visible = ref(false);
  const users = ref([]);
  const play = ref([]);
  const isPassedCount = ref(0);
  const isRejectedCount = ref(0);

  const fetchUsers = async () => {
    const response = await HTTP.get(
      `user/list?limit=500&filter={"role":"user","isInterviewed":"1"}&sort={"isPassed":-1}`
    );

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
  };

  const showStudentResult = async (userID) => {
    const response = await HTTP.get(
      `play/list?filter={"userID":${JSON.stringify(userID)}}`
    );
    play.value = response?.payload?.plays.data[0] || null;

    if (!play.value) {
      errorNoti(toast, "Không lấy được thông tin!");
      return;
    }

    visible.value = true;
  };

  const reviewUser = async (status) => {
    try {
      await HTTP.put(`user/update/${play.value.userID.studentCode}`, {
        isPassed: status,
      });

      visible.value = false;

      await fetchUsers();
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
          studentEmail: "duongvandung2k3@gmail.com",
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
      isLoading.value = false;
    } catch (error) {
      isLoading.value = false;
      errorNoti(toast, `Gửi mail đến ${studentName} thất bại!`);
    }

    await fetchUsers();
  };

  onMounted(() => {
    fetchUsers();
  });
</script>

<template>
  <Loading v-if="isLoading"></Loading>
  <Toast></Toast>
  <Header></Header>
  <div class="flex flex-wrap items-center justify-center p-5 lg:py-8 lg:px-20">
    <h1 class="text-2xl font-bold uppercase">
      Danh sách sinh viên đã được phỏng vấn
    </h1>
  </div>
  <!-- ! -->
  <Toolbar class="mb-6">
    <template #end>
      <div class="flex flex-wrap gap-3">
        <Button
          :label="`Cộng tác viên: ${isPassedCount}`"
          severity="success"
          rounded
        />
        <Button
          :label="`Loại: ${isRejectedCount}`"
          severity="info"
          rounded
        />
        <Button
          :label="`Tổng phỏng vấn: ${isPassedCount + isRejectedCount}`"
          severity="warn"
          rounded
        />
      </div>
    </template>
  </Toolbar>
  <!-- ! -->
  <div class="hidden">
    <DataTable
      :value="users"
      tableStyle="min-width: 50rem"
    >
      <template #header>
        <div style="text-align: right">
          <MultiSelect
            :modelValue="selectedColumns"
            :options="columns"
            optionLabel="header"
            @update:modelValue="onToggle"
            display="chip"
            placeholder="Select Columns"
          />
        </div>
      </template>
      <Column
        field="studentCode"
        header="Mã sinh viên"
      />
      <Column
        v-for="(col, index) of selectedColumns"
        :field="col.field"
        :header="col.header"
        :key="col.field + '_' + index"
      ></Column>
    </DataTable>
  </div>

  <!-- ! -->
  <div
    class="flex flex-wrap items-center justify-center gap-6 px-5 pb-8 lg:px-20"
  >
    <template
      v-for="(user, index) in users"
      :key="index"
    >
      <Card style="width: 20rem; overflow: hidden">
        <template #header>
          <div class="flex items-center justify-center">
            <img
              class="h-[200px] pt-5"
              alt="user image"
              :src="user.image"
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
              label="Thông tin phỏng vấn"
              class="w-full"
              @click="showStudentResult(user._id)"
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

      <!--  -->
    </template>
  </div>

  <!-- !DIALOG -->
  <div class="flex justify-center card">
    <Dialog
      v-model:visible="visible"
      modal
      header="Thông tin"
      :style="{ width: '25rem' }"
      maximizable
    >
      <!-- TT -->
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
          <p>
            Nhận xét: <strong>{{ play.comment }}</strong>
          </p>
        </div>
      </div>
      <!--  -->
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
          label="Duyệt"
          @click="reviewUser(1)"
        ></Button>
      </div>
    </Dialog>
  </div>

  <ScrollToTop></ScrollToTop>
</template>

<style scoped>
  /*  */
</style>
