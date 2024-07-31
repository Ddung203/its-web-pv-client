<script setup>
  import { ref, watch } from "vue";
  import useUIStore from "../../stores/ui";
  import useAuthStore from "../../stores/auth";
  import PanelMenu from "primevue/panelmenu";
  import router from "../../routes";
  import { useToast } from "primevue/usetoast";
  import { storeToRefs } from "pinia";

  const toast = useToast();
  const UIStore = useUIStore();
  const authStore = useAuthStore();
  const { user } = storeToRefs(authStore);

  let header = authStore.isLoggedIn
    ? `Welcome, ${authStore.getStudentName}`
    : "Welcome to IT Supporter";

  const userItemArray = [
    {
      label: "IT SUPPORTER",
      icon: "pi pi-home",
      command: () => {
        router.push("/introduction");
      },
    },
    {
      label: "Bài kiểm tra",
      icon: "pi pi-pencil",
      command: () => {
        router.push("/test");
      },
    },

    {
      label: "Đăng xuất",
      icon: "pi pi-sign-out",
      command: () => {
        toast.add({
          severity: "info",
          summary: "Thông báo",
          detail: "Tạm biệt!",
          life: 1000,
        });
        setTimeout(() => {
          authStore.logout();
          router.push("/introduction");
        }, 1000);
      },
    },
  ];

  const guestItemArray = [
    {
      label: "IT SUPPORTER",
      icon: "pi pi-home",
      command: () => {
        router.push("/introduction");
      },
    },
    {
      label: "Đăng nhập",
      icon: "pi pi-pencil",
      command: () => {
        router.push("/login");
      },
    },
  ];

  const items = ref([
    {
      label: "IT SUPPORTER",
      icon: "pi pi-home",
      command: () => {
        router.push("/introduction");
      },
    },
    {
      label: "Bài kiểm tra",
      icon: "pi pi-pencil",
      command: () => {
        router.push("/test");
      },
    },
    {
      label: "Bảng xếp hạng",
      icon: "pi pi-chart-bar",
      command: () => {
        router.push("/leaderboard");
      },
    },
    {
      label: "Tài khoản",
      icon: "pi pi-users",
      items: [
        {
          label: "Sinh viên",
          icon: "pi pi-user",
          route: "/students",
        },
        {
          label: "Người phỏng vấn",
          icon: "pi pi-user-edit",
          route: "/interviewers",
        },
      ],
    },

    {
      label: "Câu hỏi",
      icon: "pi pi-question-circle",
      items: [
        {
          label: "Danh sách câu hỏi",
          icon: "pi pi-list",
          route: "/questions",
        },
        {
          label: "Thêm câu hỏi",
          icon: "pi pi-plus",
          route: "/import-questions",
        },
      ],
    },
    {
      label: "Phỏng vấn",
      icon: "pi pi-file-edit",
      command: () => {
        router.push("/interview");
      },
    },
    {
      label: "Đăng xuất",
      icon: "pi pi-sign-out",
      command: () => {
        toast.add({
          severity: "info",
          summary: "Thông báo",
          detail: "Tạm biệt!",
          life: 1000,
        });
        setTimeout(() => {
          authStore.logout();
          router.push("/introduction");
        }, 1000);
      },
    },
  ]);

  watch(
    user,
    () => {
      if (authStore.getRole === "user") {
        items.value = userItemArray;
      }
      if (authStore.getRole === "guest") {
        items.value = guestItemArray;
      }

      header = authStore.isLoggedIn
        ? `Welcome, ${authStore.getStudentName}`
        : "Welcome to IT Supporter";
    },
    { immediate: true }
  );
</script>

<template>
  <Toast />

  <div class="card">
    <Sidebar
      v-model:visible="UIStore.visibleLeft"
      :header="header"
    >
      <!-- MENU HERE -->
      <div>
        <div class="flex justify-center card">
          <PanelMenu
            :model="items"
            class="w-full md:w-80"
          >
            <template #item="{ item }">
              <router-link
                v-if="item.route"
                v-slot="{ href, navigate }"
                :to="item.route"
                custom
              >
                <a
                  v-ripple
                  class="flex items-center px-4 py-2 cursor-pointer text-surface-700 dark:text-surface-0"
                  :href="href"
                  @click="navigate"
                >
                  <span :class="item.icon" />
                  <span class="ml-2">{{ item.label }}</span>
                </a>
              </router-link>
              <a
                v-else
                v-ripple
                class="flex items-center px-4 py-2 cursor-pointer text-surface-700 dark:text-surface-0"
                :href="item.url"
                :target="item.target"
              >
                <span :class="item.icon" />
                <span class="ml-2">{{ item.label }}</span>
                <span
                  v-if="item.items"
                  class="ml-auto pi pi-angle-down text-primary"
                />
              </a>
            </template>
          </PanelMenu>
        </div>
      </div>
    </Sidebar>
  </div>
</template>
