<script setup>
  import { ref, onMounted } from "vue";
  import { useToast } from "primevue/usetoast";
  import { FilterMatchMode } from "primevue/api";

  import Toolbar from "primevue/toolbar";

  import DataTable from "primevue/datatable";
  import Column from "primevue/column";
  import Tag from "primevue/tag";
  import Loading from "../../components/Loading/Loading.vue";

  const toast = useToast();
  const dt = ref();
  const students = ref([]);
  const studentDialog = ref(false);
  const deleteStudentDialog = ref(false);
  const deleteStudentsDialog = ref(false);
  const student = ref({});
  const selectedStudents = ref([]);
  const submitted = ref(false);
  const loading = ref(false);

  const toggleLoading = () => {
    loading.value = !loading.value;

    setTimeout(() => {
      loading.value = false;
    }, 4000);
  };

  const filters = ref({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });

  const statuses = ref([
    { label: "Active", value: 1 },
    { label: "Inactive", value: 0 },
  ]);

  const roles = ref([
    { label: "Admin", value: "admin" },
    { label: "User", value: "user" },
    { label: "Interviewer", value: "interviewer" },
  ]);

  const studentsData = [
    {
      id: "1",
      studentCode: "2021602111",
      studentName: "Nguyễn Văn A",
      studentClass: "2021DHKTPM01",
      studentPhone: "0123456789",
      role: "user",
      isOnline: true,
      status: 1,
    },
    {
      id: "2",
      studentCode: "2021602112",
      studentName: "Trần Thị B",
      studentClass: "2021DHKTPM02",
      studentPhone: "0987654321",
      role: "interviewer",
      isOnline: false,
      status: 0,
    },
    {
      id: "3",
      studentCode: "2021602113",
      studentName: "Lê Thị C",
      studentClass: "2021DHKTPM03",
      studentPhone: "0945678910",
      role: "admin",
      isOnline: true,
      status: 1,
    },
    {
      id: "1",
      studentCode: "2021602111",
      studentName: "Nguyễn Văn A",
      studentClass: "2021DHKTPM01",
      studentPhone: "0123456789",
      role: "user",
      isOnline: true,
      status: 1,
    },
    {
      id: "2",
      studentCode: "2021602112",
      studentName: "Trần Thị B",
      studentClass: "2021DHKTPM02",
      studentPhone: "0987654321",
      role: "interviewer",
      isOnline: false,
      status: 0,
    },
    {
      id: "3",
      studentCode: "2021602113",
      studentName: "Lê Thị C",
      studentClass: "2021DHKTPM03",
      studentPhone: "0945678910",
      role: "admin",
      isOnline: true,
      status: 1,
    },
    {
      id: "1",
      studentCode: "2021602111",
      studentName: "Nguyễn Văn A",
      studentClass: "2021DHKTPM01",
      studentPhone: "0123456789",
      role: "user",
      isOnline: true,
      status: 1,
    },
    {
      id: "2",
      studentCode: "2021602112",
      studentName: "Trần Thị B",
      studentClass: "2021DHKTPM02",
      studentPhone: "0987654321",
      role: "interviewer",
      isOnline: false,
      status: 0,
    },
    {
      id: "3",
      studentCode: "2021602113",
      studentName: "Lê Thị C",
      studentClass: "2021DHKTPM03",
      studentPhone: "0945678910",
      role: "admin",
      isOnline: true,
      status: 1,
    },
    {
      id: "1",
      studentCode: "2021602111",
      studentName: "Nguyễn Văn A",
      studentClass: "2021DHKTPM01",
      studentPhone: "0123456789",
      role: "user",
      isOnline: true,
      status: 1,
    },
    {
      id: "2",
      studentCode: "2021602112",
      studentName: "Trần Thị B",
      studentClass: "2021DHKTPM02",
      studentPhone: "0987654321",
      role: "interviewer",
      isOnline: false,
      status: 0,
    },
    {
      id: "3",
      studentCode: "2021602113",
      studentName: "Lê Thị C",
      studentClass: "2021DHKTPM03",
      studentPhone: "0945678910",
      role: "admin",
      isOnline: true,
      status: 1,
    },
    {
      id: "1",
      studentCode: "2021602111",
      studentName: "Nguyễn Văn A",
      studentClass: "2021DHKTPM01",
      studentPhone: "0123456789",
      role: "user",
      isOnline: true,
      status: 1,
    },
    {
      id: "2",
      studentCode: "2021602112",
      studentName: "Trần Thị B",
      studentClass: "2021DHKTPM02",
      studentPhone: "0987654321",
      role: "interviewer",
      isOnline: false,
      status: 0,
    },
    {
      id: "3",
      studentCode: "2021602113",
      studentName: "Lê Thị C",
      studentClass: "2021DHKTPM03",
      studentPhone: "0945678910",
      role: "admin",
      isOnline: true,
      status: 1,
    },
    // Add more students as needed
  ];

  const openNew = () => {
    student.value = {};
    submitted.value = false;
    studentDialog.value = true;
  };

  const hideDialog = () => {
    studentDialog.value = false;
    submitted.value = false;
  };

  const editStudent = (studentData) => {
    student.value = { ...studentData };
    studentDialog.value = true;
  };

  const saveStudent = () => {
    submitted.value = true;

    if (student.value.studentName.trim()) {
      if (student.value.id) {
        const index = students.value.findIndex(
          (s) => s.id === student.value.id
        );
        if (index !== -1) {
          students.value[index] = { ...student.value };
          toast.add({
            severity: "success",
            summary: "Thành công",
            detail: "Đã cập nhật sinh viên",
            life: 3000,
          });
        }
      } else {
        student.value.id = createId();
        students.value.push({ ...student.value });
        toast.add({
          severity: "success",
          summary: "Thành công",
          detail: "Đã thêm sinh viên mới",
          life: 3000,
        });
      }

      studentDialog.value = false;
      student.value = {};
    }
  };

  const confirmDeleteStudent = (studentData) => {
    student.value = studentData;
    deleteStudentDialog.value = true;
  };

  const deleteStudent = () => {
    students.value = students.value.filter((s) => s.id !== student.value.id);
    deleteStudentDialog.value = false;
    student.value = {};
    toast.add({
      severity: "success",
      summary: "Thành công",
      detail: "Đã xóa sinh viên",
      life: 3000,
    });
  };

  const confirmDeleteSelected = () => {
    deleteStudentsDialog.value = true;
  };

  const deleteSelectedStudents = () => {
    students.value = students.value.filter(
      (s) => !selectedStudents.value.includes(s)
    );
    deleteStudentsDialog.value = false;
    selectedStudents.value = null;
    toast.add({
      severity: "success",
      summary: "Thành công",
      detail: "Đã xóa các sinh viên được chọn",
      life: 3000,
    });
  };

  const createId = () => {
    return Math.floor(Math.random() * 10000).toString();
  };

  const getRoleLabel = (role) => {
    switch (role) {
      case "admin":
        return "danger";
      case "user":
        return "info";
      case "interviewer":
        return "success";
      default:
        return null;
    }
  };

  const getStatusLabel = (status) => {
    return status === 1 ? "Đã phỏng vấn" : "Chưa phỏng vấn";
  };

  const getStatusSeverity = (status) => {
    return status === 1 ? "success" : "warning";
  };

  const getOnlineStatusClass = (isOnline) => {
    return isOnline
      ? "pi pi-circle-on  text-success"
      : "pi pi-circle-off text-danger";
  };

  const exportCSV = () => {
    dt.value.exportCSV();
  };

  onMounted(() => {
    students.value = studentsData;
  });
</script>

<template>
  <Loading v-if="loading"></Loading>
  <div class="card">
    <Toolbar class="mb-4">
      <template #start>
        <Button
          label="Thêm"
          icon="pi pi-plus"
          severity="success"
          class="mr-2"
          @click="openNew"
        />
        <Button
          label="Xóa"
          icon="pi pi-trash"
          severity="danger"
          @click="confirmDeleteSelected"
          :disabled="!selectedStudents || !selectedStudents.length"
        />
      </template>
      <template #end>
        <div class="pr-5">
          <Button
            :disabled="loading"
            :icon="loading ? 'pi pi-refresh pi-spin' : 'pi pi-refresh'"
            @click="toggleLoading"
          />
        </div>
        <Button
          label="Export"
          icon="pi pi-upload"
          severity="help"
          @click="exportCSV($event)"
        />
      </template>
    </Toolbar>

    <DataTable
      scrollable
      scrollHeight="430px"
      ref="dt"
      :value="students"
      v-model:selection="selectedStudents"
      dataKey="id"
      :paginator="true"
      :rows="10"
      :filters="filters"
      paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
      :rowsPerPageOptions="[5, 10, 25]"
      currentPageReportTemplate="{first} - {last} / {totalRecords} sinh viên"
    >
      <template #header>
        <div class="flex flex-wrap justify-between gap-2 align-center">
          <!-- <p class="">Quản lý sinh viên</p> -->
          <div class="flex items-center justify-center text-2xl uppercase">
            <span>Quản lý sinh viên</span>
          </div>
          <div>
            <IconField iconPosition="left">
              <InputIcon>
                <i class="pi pi-search" />
              </InputIcon>
              <InputText
                v-model="filters['global'].value"
                placeholder="Tìm kiếm..."
              />
            </IconField>
          </div>
        </div>
      </template>

      <Column
        selectionMode="multiple"
        style="width: 3rem"
        :exportable="false"
      ></Column>
      <Column
        field="studentCode"
        header="Mã sinh viên"
        sortable
        style="min-width: 12rem"
      ></Column>
      <Column
        field="studentName"
        header="Họ tên"
        sortable
        style="min-width: 16rem"
      ></Column>
      <Column
        field="studentClass"
        header="Lớp"
        sortable
        style="min-width: 12rem"
      ></Column>
      <Column
        field="studentPhone"
        header="Số điện thoại"
        sortable
        style="min-width: 12rem"
      ></Column>
      <Column
        field="role"
        header="Vai trò"
        sortable
        style="min-width: 12rem"
      >
        <template #body="slotProps">
          <Tag
            :value="slotProps.data.role"
            :severity="getRoleLabel(slotProps.data.role)"
          />
        </template>
      </Column>
      <Column
        field="isOnline"
        header="Trực tuyến"
        sortable
        style="min-width: 10rem"
      >
        <template #body="slotProps">
          <i
            :class="getOnlineStatusClass(slotProps.data.isOnline)"
            style="font-size: 1.5rem"
          ></i>
        </template>
      </Column>
      <Column
        field="status"
        header="Tình trạng"
        sortable
        style="min-width: 12rem"
      >
        <template #body="slotProps">
          <Tag
            :value="getStatusLabel(slotProps.data.status)"
            :severity="getStatusSeverity(slotProps.data.status)"
          />
        </template>
      </Column>
      <Column
        :exportable="false"
        style="min-width: 8rem"
      >
        <template #body="slotProps">
          <Button
            icon="pi pi-pencil"
            outlined
            rounded
            class="mr-2"
            @click="editStudent(slotProps.data)"
          />
          <Button
            icon="pi pi-trash"
            outlined
            rounded
            severity="danger"
            @click="confirmDeleteStudent(slotProps.data)"
          />
        </template>
      </Column>
    </DataTable>

    <Dialog
      v-model:visible="studentDialog"
      :style="{ width: '450px' }"
      header="Chi tiết sinh viên"
      :modal="true"
      class="p-fluid"
    >
      <div class="field">
        <label for="studentCode">Mã sinh viên</label>
        <InputText
          id="studentCode"
          v-model.trim="student.studentCode"
          required
          autofocus
          :invalid="submitted && !student.studentCode"
        />
        <small
          class="p-error"
          v-if="submitted && !student.studentCode"
          >Mã sinh viên không được để trống.</small
        >
      </div>
      <div class="field">
        <label for="studentName">Họ tên</label>
        <InputText
          id="studentName"
          v-model.trim="student.studentName"
          required
          :invalid="submitted && !student.studentName"
        />
        <small
          class="p-error"
          v-if="submitted && !student.studentName"
          >Họ tên không được để trống.</small
        >
      </div>
      <div class="field">
        <label for="studentClass">Lớp</label>
        <InputText
          id="studentClass"
          v-model.trim="student.studentClass"
          required
          :invalid="submitted && !student.studentClass"
        />
        <small
          class="p-error"
          v-if="submitted && !student.studentClass"
          >Lớp không được để trống.</small
        >
      </div>
      <div class="field">
        <label for="studentPhone">Số điện thoại</label>
        <InputText
          id="studentPhone"
          v-model.trim="student.studentPhone"
          required
          :invalid="submitted && !student.studentPhone"
        />
        <small
          class="p-error"
          v-if="submitted && !student.studentPhone"
          >Số điện thoại không được để trống.</small
        >
      </div>
      <div class="field">
        <label for="role">Vai trò</label>
        <Dropdown
          id="role"
          v-model="student.role"
          :options="roles"
          optionLabel="label"
          placeholder="Chọn vai trò"
        />
      </div>
      <div class="field">
        <label
          for="status"
          class="mb-3"
          >Tình trạng</label
        >
        <Dropdown
          id="status"
          v-model="student.status"
          :options="statuses"
          optionLabel="label"
          placeholder="Chọn tình trạng"
        />
      </div>

      <template #footer>
        <Button
          label="Hủy"
          icon="pi pi-times"
          text
          @click="hideDialog"
        />
        <Button
          label="Lưu"
          icon="pi pi-check"
          text
          @click="saveStudent"
        />
      </template>
    </Dialog>

    <Dialog
      v-model:visible="deleteStudentDialog"
      :style="{ width: '450px' }"
      header="Xác nhận"
      :modal="true"
    >
      <div class="confirmation-content">
        <i
          class="mr-3 pi pi-exclamation-triangle"
          style="font-size: 2rem"
        />
        <span v-if="student"
          >Bạn có chắc chắn muốn xóa <b>{{ student.studentName }}</b
          >?</span
        >
      </div>
      <template #footer>
        <Button
          label="Không"
          icon="pi pi-times"
          text
          @click="deleteStudentDialog = false"
        />
        <Button
          label="Có"
          icon="pi pi-check"
          text
          @click="deleteStudent"
        />
      </template>
    </Dialog>

    <Dialog
      v-model:visible="deleteStudentsDialog"
      :style="{ width: '450px' }"
      header="Xác nhận"
      :modal="true"
    >
      <div class="confirmation-content">
        <i
          class="mr-3 pi pi-exclamation-triangle"
          style="font-size: 2rem"
        />
        <span v-if="student"
          >Bạn có chắc chắn muốn xóa các sinh viên đã chọn?</span
        >
      </div>
      <template #footer>
        <Button
          label="Không"
          icon="pi pi-times"
          text
          @click="deleteStudentsDialog = false"
        />
        <Button
          label="Có"
          icon="pi pi-check"
          text
          @click="deleteSelectedStudents"
        />
      </template>
    </Dialog>
  </div>
</template>

<style scoped>
  .card {
    padding: 2rem;
  }

  .p-fluid .field label {
    font-weight: bold;
  }

  .confirmation-content {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .pi-circle-on {
    color: green;
  }

  .pi-circle-off {
    color: red;
  }
</style>
