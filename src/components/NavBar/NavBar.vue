<script setup>
  import { computed, ref } from "vue";
  import useUIStore from "../../stores/ui";
  import useAuthStore from "../../stores/auth";
  import PanelMenu from "primevue/panelmenu";
  import router from "../../routes";
  import { useToast } from "primevue/usetoast";

  const toast = useToast();
  const UIStore = useUIStore();
  const authStore = useAuthStore();

  let header = ref("Welcome to IT Supporter");

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
        router.push("/start-test");
      },
    },

    {
      label: "Tra cứu kết quả",
      icon: "pi pi-search",
      command: () => {
        router.push("/find-result");
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
        authStore.logout();
        setTimeout(() => {
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
      label: "Đăng ký sớm",
      icon: "pi pi-send",
      command: () => {
        router.push("/previous-registration");
      },
    },
    {
      label: "Tra cứu kết quả",
      icon: "pi pi-search",
      command: () => {
        router.push("/find-result");
      },
    },
    {
      label: "Đăng nhập",
      icon: "pi pi-pencil",
      command: () => {
        UIStore.visibleLeft = false;

        router.push("/login");
      },
    },
  ];

  const adminItemArray = [
    {
      label: "IT SUPPORTER",
      icon: "pi pi-home",
      command: () => {
        router.push("/introduction");
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
          label: "Phỏng vấn",
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
      label: "Upcoming",
      icon: "pi pi-hourglass",
      items: [
        {
          label: "Gửi mail kết quả",
          icon: "pi pi-envelope",
          route: "/mail",
        },
      ],
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
        authStore.logout();
        setTimeout(() => {
          router.push("/introduction");
        }, 1000);
      },
    },
  ];

  const items = computed(() => {
    header.value = authStore.isLoggedIn
      ? `Welcome, ${authStore.getStudentName}`
      : "Welcome to IT Supporter";

    if (authStore.getRole === "admin" || authStore.getRole === "interviewer") {
      return adminItemArray;
    } else if (authStore.getRole === "user") {
      return userItemArray;
    } else if (authStore.getRole === "guest") {
      return guestItemArray;
    } else {
      return guestItemArray;
    }
  });
</script>

<template>
  <Toast />
  <div class="menu">
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
