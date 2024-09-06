<script setup>
  import { ref, computed } from "vue";
  import SingleSearch from "../Search/SingleSearch.vue";
  import Paginator from "primevue/paginator";
  import DataTableCustom from "../DataTableCustom/DataTableCustom.vue";

  const props = defineProps({
    playsData: { type: Array, required: true },
  });

  const selectedData = props.playsData?.map(
    ({ score, interviewScore, totalScore, userDetails }) => ({
      studentCode: userDetails.studentCode,
      studentName: userDetails.studentName,
      studentClass: userDetails.studentClass,
      score,
      interviewScore,
      totalScore,
    })
  );

  const plays = ref(selectedData);

  const titles = [
    { title: "Mã sinh viên", sortable: true },
    { title: "Họ tên", sortable: false },
    { title: "Lớp", sortable: false },
    { title: "Điểm bài kiểm tra", sortable: true },
    { title: "Điểm phỏng vấn", sortable: true },
    { title: "Tổng điểm", sortable: true },
  ];

  const nameSearch = ref("");
  const rowsPerPage = ref(10);
  const first = ref(0);

  const filteredPlays = computed(() => {
    if (!nameSearch.value) {
      return plays.value;
    }
    return plays.value.filter((play) =>
      play.studentName.toLowerCase().includes(nameSearch.value.toLowerCase())
    );
  });

  const paginatedPlays = computed(() => {
    const start = first.value;
    const end = start + rowsPerPage.value;
    return filteredPlays.value.slice(start, end);
  });

  const onPageChange = (event) => {
    first.value = event.first;
  };
</script>
<template>
  <div>
    <!-- SingleSearch.vue -->
    <div>
      <SingleSearch
        v-model="nameSearch"
        placeholder="Tìm theo tên"
      />
    </div>

    <!-- Data Table -->
    <div>
      <DataTableCustom
        :arrayData="paginatedPlays"
        :titleArray="titles"
      ></DataTableCustom>
    </div>

    <!-- Paginator -->
    <div v-if="paginatedPlays.length !== 0">
      <Paginator
        :rows="rowsPerPage"
        :totalRecords="filteredPlays.length"
        :first="first"
        @page="onPageChange"
        template="FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
        currentPageReportTemplate="{first} to {last} of {totalRecords}"
      />
    </div>
  </div>

  <!-- No Data -->
  <div
    v-if="paginatedPlays.length === 0"
    class="flex justify-center"
  >
    <img
      class="block md:h-[600px]"
      src="@/public/assets/imgs/nodata.png"
      alt=""
    />
  </div>
</template>
