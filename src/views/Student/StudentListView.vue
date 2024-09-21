<script setup>
  import { ref, onMounted } from "vue";
  import { useToast } from "primevue/usetoast";
  import { FilterMatchMode } from "primevue/api";
  import Toolbar from "primevue/toolbar";
  import DataTable from "primevue/datatable";
  import Column from "primevue/column";
  import Tag from "primevue/tag";
  import Loading from "../../components/Loading/Loading.vue";
  import useStudentStore from "../../stores/student.js";
  import Header from "../../components/Header/Header.vue";
  import { errorNoti, successNoti } from "../../utils/showNotification.js";

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
  const studentStore = useStudentStore();
  const typeAction = ref("");

  const callAPI = async () => {
    try {
      loading.value = true;
      students.value = await studentStore.getStudentsHandle();
    } catch (error) {
      students.value = [];
      errorNoti(toast, "Xảy ra lỗi khi lấy dữ liệu. Vui lòng thử lại sau!");
    }
    loading.value = false;
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
              students.value = await studentStore.signupHandle(student.value);

              successNoti(toast, "Đã thêm sinh viên mới!");
            } catch (error) {
              successNoti(toast, "Thêm sinh viên mới không thành công!");
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
              students.value = await studentStore.updateHandle(student.value);

              successNoti(toast, "Sửa thông tin sinh viên thành công!");
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
    try {
      students.value = await studentStore.deleteStudentsHandle(code);

      deleteStudentDialog.value = false;
      successNoti(toast, "Đã xóa sinh viên thành công!");
    } catch (error) {
      errorNoti(toast, "Xóa sinh viên thất bại!");
    }
  };

  const confirmDeleteSelected = () => {
    deleteStudentsDialog.value = true;
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

  const getStatusLabel = (
    status,
    successMessage = "Đã phỏng vấn",
    errMessage = "Chưa phỏng vấn"
  ) => {
    return status === 1 ? successMessage : errMessage;
  };

  const getStatusSeverity = (status) => {
    return status === 1 ? "success" : "warning";
  };

  onMounted(async () => {
    await callAPI();
  });
</script>

<template>
  <Header></Header>

  <Loading v-if="loading"></Loading>
  <div class="card px-[2rem]">
    <!-- ! ACTIONS -->
    <Toolbar class="mt-4">
      <template #start>
        <p class="pl-[20px] text-2xl font-semibold text-center uppercase">
          Tài khoản sinh viên
        </p>
      </template>
      <template #end>
        <div class="flex flex-wrap justify-end w-full gap-2 align-center">
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
      :rows="5"
      :filters="filters"
      paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
      :rowsPerPageOptions="[5, 10, 25]"
      currentPageReportTemplate="{first} - {last} / {totalRecords} sinh viên"
    >
      <!-- ! HEADER DATA TABLE -->
      <template #header> </template>

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
      <!-- <Column
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
      </Column> -->
      <Column
        field="status"
        header="Bài test"
        sortable
        style="min-width: 12rem"
      >
        <template #body="slotProps">
          <Tag
            :value="
              getStatusLabel(slotProps.data.isTested, `Đã làm`, `Chưa làm`)
            "
            :severity="getStatusSeverity(slotProps.data.isTested)"
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
            :value="getStatusLabel(slotProps.data.isInterviewed)"
            :severity="getStatusSeverity(slotProps.data.isInterviewed)"
          />
        </template>
      </Column>

      <!-- Action -->
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
