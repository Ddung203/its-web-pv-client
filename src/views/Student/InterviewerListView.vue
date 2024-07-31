<script setup>
  import { ref, onMounted } from "vue";
  import { useToast } from "primevue/usetoast";
  import { FilterMatchMode } from "primevue/api";
  import Toolbar from "primevue/toolbar";
  import DataTable from "primevue/datatable";
  import Column from "primevue/column";
  import Tag from "primevue/tag";
  import Loading from "../../components/Loading/Loading.vue";
  import useInterviewerStore from "../../stores/interviewer";
  import useStudentStore from "../../stores/student.js";
  import Header from "../../components/Header/Header.vue";

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
  const interviewerStore = useInterviewerStore();
  const studentStore = useStudentStore();
  const typeAction = ref("");

  const callAPI = async () => {
    students.value = await interviewerStore.getInterviewersHandle();
  };

  const toggleLoading = async () => {
    loading.value = !loading.value;

    await callAPI();

    loading.value = false;
  };

  const filters = ref({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });

  const roles = ref([
    { label: "Admin", value: "admin" },
    { label: "User", value: "user" },
    { label: "Interviewer", value: "interviewer" },
  ]);

  const openNew = () => {
    student.value = {};
    submitted.value = false;
    studentDialog.value = true;
    typeAction.value = "create";
  };

  const hideDialog = () => {
    studentDialog.value = false;
    submitted.value = false;
    typeAction.value = "";
  };

  const editStudent = (studentData) => {
    student.value = { ...studentData };
    studentDialog.value = true;

    typeAction.value = "update";
  };

  const saveStudent = async () => {
    submitted.value = true;

    switch (typeAction.value) {
      case "create":
        {
          if (student.value?.studentName?.trim()) {
            student.value.role = student.value.role.value;

            try {
              await studentStore.signupHandle(student.value);
              await callAPI();
              toast.add({
                severity: "success",
                summary: "Thành công",
                detail: "Đã thêm sinh viên mới",
                life: 3000,
              });
            } catch (error) {
              console.log(error);
            }

            studentDialog.value = false;
            student.value = {};
          }
        }
        break;
      case "update":
        {
          if (student.value?.studentName.trim()) {
            student.value.role = student.value.role.value
              ? student.value.role.value
              : student.value.role;

            try {
              console.log("UPDATING");
              await studentStore.updateHandle(student.value);
              await callAPI();

              toast.add({
                severity: "success",
                summary: "Thành công",
                detail: "Sửa thông tin sinh viên thành công!",
                life: 3000,
              });
            } catch (error) {
              console.log(error);
            }

            studentDialog.value = false;
            student.value = {};
          }
        }
        break;

      default:
        break;
    }
  };

  const confirmDeleteStudent = (studentData) => {
    student.value = studentData;
    deleteStudentDialog.value = true;
  };

  const deleteStudent = async (code) => {
    await studentStore.deleteStudentsHandle(code);
    await callAPI();
    deleteStudentDialog.value = false;

    toast.add({
      severity: "success",
      summary: "Thành công",
      detail: "Đã xóa sinh viên",
      life: 2000,
    });
  };

  const confirmDeleteSelected = () => {
    deleteStudentsDialog.value = true;
  };

  const deleteSelectedStudents = () => {
    // students.value = students.value.filter(
    //   (s) => !selectedStudents.value.includes(s)
    // );
    // TODO: Call API here
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

  const exportCSV = () => {
    // TODO: Handle if needed
    // dt.value.exportCSV();
  };

  onMounted(async () => {
    await callAPI();
    // students.value = studentsData;
  });
</script>

<template>
  <Header></Header>
  <Loading v-if="loading"></Loading>
  <div class="card">
    <!-- ! ACTIONS -->
    <Toolbar class="mb-4">
      <template #start>
        <!-- Button Thêm mới -->
        <Button
          label="Thêm"
          icon="pi pi-plus"
          severity="success"
          class="mr-2"
          @click="openNew"
        />
        <!-- Button Xóa nhiều -->
        <Button
          label="Xóa"
          icon="pi pi-trash"
          severity="danger"
          disabled
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
          disabled
          @click="exportCSV($event)"
        />
      </template>
    </Toolbar>

    <!-- ! SHOW DATA -->
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
      <!-- ! HEADER DATA TABLE -->
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

      <!-- <Column
        selectionMode="multiple"
        style="width: 3rem"
        :exportable="false"
      ></Column> -->
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
        field="password"
        header="Mật khẩu"
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

    <!-- ! UPDATE -->
    <Dialog
      v-model:visible="studentDialog"
      :style="{ width: '450px' }"
      header="Nhập thông tin sinh viên"
      :modal="true"
      class="p-fluid"
    >
      <div class="field">
        <label for="studentCode">Mã sinh viên</label>
        <InputText
          id="studentCode"
          v-model.trim="student.studentCode"
          autofocus
          :invalid="submitted && !student.studentCode"
          :disabled="typeAction !== 'create'"
          :required="typeAction === 'create'"
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
        <label for="studentHometown">Địa chỉ</label>
        <InputText
          id="studentHometown"
          v-model.trim="student.studentHometown"
          required
          :invalid="submitted && !student.studentHometown"
        />
        <small
          class="p-error"
          v-if="submitted && !student.studentHometown"
          >Trường này không được để trống.</small
        >
      </div>

      <template #footer>
        <Button
          label="Hủy bỏ"
          icon="pi pi-times"
          text
          outlined
          @click="hideDialog"
        />
        <Button
          label="Lưu"
          icon="pi pi-check"
          severity="success"
          @click="saveStudent"
        />
      </template>
    </Dialog>

    <!-- Dialog Xóa 1 -->
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
          severity="danger"
          @click="deleteStudentDialog = false"
        />
        <Button
          label="Có"
          icon="pi pi-check"
          text
          outlined
          severity="success"
          @click="deleteStudent(student.studentCode)"
        />
      </template>
    </Dialog>

    <!-- Dialog Xóa nhiều -->
    <!-- <Dialog
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
    </Dialog> -->
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
