<script setup>
  import { onMounted, ref } from "vue";
  import useAuthStore from "../../stores/auth";
  import useQuestionStore from "../../stores/question";
  import showNotification from "../../utils/showNotification";
  import { useToast } from "primevue/usetoast";
  import { storeToRefs } from "pinia";

  import DataTable from "primevue/datatable";
  import Column from "primevue/column";
  import ColumnGroup from "primevue/columngroup"; // optional
  import Row from "primevue/row"; // optional

  const toast = useToast();
  const authStore = useAuthStore();
  const questionStore = useQuestionStore();

  const searchValue = ref("");

  const products = ref([
    {
      id: "1000",
      code: "f230fh0g3",
      name: "Bamboo Watch",
      description: "Product Description",
      image: "bamboo-watch.jpg",
      price: 65,
      category: "Accessories",
      quantity: 24,
      inventoryStatus: "INSTOCK",
      rating: 5,
    },
  ]);
</script>

<template>
  <div>
    <div class="px-4 py-5 md:px-8">
      <div class="header">
        <div class="header-top">
          <div class="grid grid-cols-2 grid-rows-1 gap-4">
            <div class="flex flex-col gap-1">
              <span class="text-xl font-semibold">Danh sách sinh viên</span>
              <span class="text-sm text-[#6d7c91]">Role: User</span>
            </div>
            <div class="flex items-center justify-end">
              <Button
                outlined
                label="950"
                icon="pi pi-circle"
              />
            </div>
          </div>
        </div>
        <div class="pt-4 md:pt-8 header-bottom">
          <div class="grid grid-cols-1 grid-rows-1 gap-4 md:grid-cols-2">
            <div class="flex justify-center md:block">
              <div>
                <IconField iconPosition="left">
                  <InputIcon class="pi pi-search"> </InputIcon>
                  <InputText
                    v-model="searchValue"
                    placeholder="Search"
                  />
                </IconField>
              </div>
            </div>
            <div class="flex items-center justify-center gap-3 md:justify-end">
              <Button
                outlined
                icon="pi pi-refresh"
              />
              <Button
                label="1 of 2"
                outlined
              />
              <Button
                outlined
                icon="pi pi-angle-left"
              />
              <Button
                outlined
                icon="pi pi-angle-right"
              />
            </div>
          </div>
        </div>
      </div>
      <div
        class="table overflow-hidden border border-[#fbd596] w-full mt-5 rounded-md"
      >
        <div class="card">
          <DataTable
            :value="products"
            stripedRows
            tableStyle="min-width: 50rem"
          >
            <Column
              field="code"
              header="Code"
              sortable
            ></Column>
            <Column
              field="name"
              header="Name"
            ></Column>
            <Column
              field="category"
              header="Category"
            ></Column>
            <Column
              field="quantity"
              header="Quantity"
            ></Column>
          </DataTable>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
  /*  */
</style>
