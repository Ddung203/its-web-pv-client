<script setup>
  import ConfirmPopup from "primevue/confirmpopup";
  import { useToast } from "primevue/usetoast";
  import { useConfirm } from "primevue/useconfirm";

  const props = defineProps({
    idObject: {
      type: String,
      required: true,
    },
  });

  const toast = useToast();
  const confirm = useConfirm();

  const emit = defineEmits(["delete"]);

  function deleteQuestion() {
    emit("delete", props.idObject);
  }

  const confirm2 = (event) => {
    confirm.require({
      target: event.currentTarget,
      message: "Do you want to delete this record?",
      icon: "pi pi-info-circle",
      rejectClass: "p-button-secondary p-button-outlined p-button-sm",
      acceptClass: "p-button-danger p-button-sm",
      rejectLabel: "Cancel",
      acceptLabel: "Delete",
      accept: async () => {
        deleteQuestion();
        toast.add({
          severity: "info",
          summary: "Confirmed",
          detail: "Record deleted",
          life: 1500,
        });
      },
      reject: () => {},
    });
  };
</script>

<template>
  <Toast />
  <ConfirmPopup></ConfirmPopup>
  <div class="flex flex-wrap gap-2 card justify-content-center">
    <Button
      @click="confirm2($event)"
      label="Xóa"
      severity="danger"
      outlined
    ></Button>
  </div>
</template>

<style scoped>
  /*  */
</style>
