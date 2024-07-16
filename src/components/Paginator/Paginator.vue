<script setup>
  import { ref } from "vue";
  import Paginator from "primevue/paginator";

  const props = defineProps({
    rows: { type: Number, required: true },
    totalRecords: { type: Number, required: true },
  });

  const first = ref(0);
</script>

<template>
  <div class="card">
    <Paginator
      :rows="props.rows"
      :totalRecords="props.totalRecords"
      template="FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
      currentPageReportTemplate="Showing {first} to {last} of {totalRecords}"
    />
  </div>
</template>
