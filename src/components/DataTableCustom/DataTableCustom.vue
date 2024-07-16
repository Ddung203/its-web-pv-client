<script setup>
  import { ref } from "vue";
  import DataTable from "primevue/datatable";
  import Column from "primevue/column";

  const props = defineProps({
    arrayData: { type: Array },
    titleArray: { type: Array },
  });

  const fields = Object.keys(props.arrayData[0]);

  const styleValue = ref(`width: ${100 / fields.length}%`);
</script>

<template>
  <div class="">
    <DataTable
      :value="props.arrayData"
      tableStyle="min-width: 50rem"
    >
      <template
        v-for="(col, index) in fields"
        :key="index"
      >
        <Column
          :field="col"
          :header="titleArray[index].title"
          :style="styleValue"
          :sortable="titleArray[index].sortable"
        />
      </template>
    </DataTable>
  </div>
</template>

<style scoped>
  /*  */
</style>
