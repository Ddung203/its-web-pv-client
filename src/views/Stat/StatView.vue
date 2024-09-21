<script setup>
  import { onMounted, ref } from "vue";
  import Header from "@/components/Header/Header.vue";
  import StatCard from "../../components/Stat/StatCard.vue";
  import Loading from "../../components/Loading/Loading.vue";
  import HTTP from "../../helper/axiosInstance";
  import { writeFile, utils } from "xlsx";

  const show = ref(false);
  const isLoading = ref(false);

  const statObject = ref({
    websiteViews: 0,
    countUser: 0,
    countUserTested: 0,
    countUserInterviewed: 0,
    countUserPassed: 0,
  });

  const callAPI = async () => {
    show.value = true;
    isLoading.value = true;

    try {
      const response = await HTTP.get(`stat/info`);

      if (response && response.payload) {
        statObject.value = response.payload;
      } else {
        statObject.value = {
          websiteViews: 0,
          countUser: 0,
          countUserTested: 0,
          countUserInterviewed: 0,
          countUserPassed: 0,
        };
      }
    } catch (error) {
      statObject.value = {
        websiteViews: 0,
        countUser: 0,
        countUserTested: 0,
        countUserInterviewed: 0,
        countUserPassed: 0,
      };
    } finally {
      isLoading.value = false;
    }
  };

  const exportExcelFile = (workbookName, worksheetName, objectArray) => {
    const workbook = utils.book_new();
    const worksheet = utils.json_to_sheet(objectArray);
    utils.book_append_sheet(workbook, worksheet, worksheetName);

    writeFile(workbook, workbookName);
  };

  const exportHandle = (fileName, caseType) => {
    switch (caseType) {
      case 1:
        exportExcelFile(`${fileName}.xlsx`, "Sheet1", [statObject.value]);
        break;
      case 2:
        exportExcelFile(
          `${fileName}.xlsx`,
          "Questions",
          statObject.value.questions
        );
        break;
      case 3:
        exportExcelFile(
          `${fileName}.xlsx`,
          "Tất cả user",
          statObject.value.users
        );
        break;
      case 4:
        exportExcelFile(
          `${fileName}.xlsx`,
          "Đã làm test",
          statObject.value.usersTested
        );
        break;
      case 5:
        exportExcelFile(
          `${fileName}.xlsx`,
          "Đã phỏng vấn",
          statObject.value.usersInterviewed
        );
        break;
      case 6:
        exportExcelFile(
          `${fileName}.xlsx`,
          "Cộng tác viên mới",
          statObject.value.usersPassed
        );
        break;
    }
  };

  onMounted(callAPI);
</script>

<template>
  <Loading v-if="isLoading"></Loading>
  <Header></Header>

  <p class="px-5 pt-5 text-2xl font-bold lg:px-16 bg-[#fefefe]">Thông tin</p>
  <!-- ! Info Card -->
  <transition
    enter-active-class="animate__animated animate__fadeInDown"
    leave-active-class="animate__animated animate__fadeOut"
  >
    <div
      v-if="show"
      class="grid grid-cols-1 gap-5 p-5 lg:px-16 md:grid-cols-2 lg:grid-cols-4 bg-[#fefefe]"
    >
      <!-- Các StatCard -->
      <StatCard
        :title="'Tài khoản sinh viên'"
        :count="statObject?.countUser || 0"
      ></StatCard>
      <StatCard
        :title="'Sinh viên tham gia bài test'"
        :count="statObject?.countUserTested || 0"
      ></StatCard>
      <StatCard
        :title="'Sinh viên tham gia PV'"
        :count="statObject?.countUserInterviewed || 0"
      ></StatCard>
      <StatCard
        :title="'Cộng tác viên mới'"
        :count="statObject?.countUserPassed || 0"
      ></StatCard>
    </div>
  </transition>

  <!-- Xuất danh sách -->
  <p class="px-5 pt-0 text-2xl font-bold lg:px-16 bg-[#fefefe]">
    Xuất danh sách
  </p>
  <transition
    enter-active-class="animate__animated animate__fadeIn"
    leave-active-class="animate__animated animate__fadeOut"
  >
    <div
      class="p-5 flex items-start gap-1 justify-center flex-col lg:px-16 bg-[#fefefe]"
      v-if="show"
    >
      <div class="flex items-center justify-start gap-5">
        <span>Thống kê cơ bản</span>
        <Button @click="exportHandle('Thống kê cơ bản', 1)"
          >Export Excel</Button
        >
      </div>

      <div class="flex items-center justify-start gap-5">
        <span>Danh sách câu hỏi</span>
        <Button @click="exportHandle('Danh sách câu hỏi', 2)"
          >Export Excel</Button
        >
      </div>

      <div class="flex items-center justify-start gap-5">
        <span>Danh sách tài khoản người dùng</span>
        <Button @click="exportHandle('Danh sách tài khoản người dùng', 3)"
          >Export Excel</Button
        >
      </div>

      <div class="flex items-center justify-start gap-5">
        <span>Danh sách người dùng đã làm bài test</span>
        <Button @click="exportHandle('Danh sách người dùng đã làm bài test', 4)"
          >Export Excel</Button
        >
      </div>

      <div class="flex items-center justify-start gap-5">
        <span>Danh sách người dùng đã được phỏng vấn</span>
        <Button
          @click="exportHandle('Danh sách người dùng đã được phỏng vấn', 5)"
          >Export Excel</Button
        >
      </div>

      <div class="flex items-center justify-start gap-5">
        <span>Danh sách cộng tác viên mới</span>
        <Button @click="exportHandle('Danh sách cộng tác viên mới', 6)"
          >Export Excel</Button
        >
      </div>
    </div>
  </transition>
</template>
