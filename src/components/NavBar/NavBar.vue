<script setup>
  import { computed, ref } from "vue";
  import useUIStore from "../../stores/ui";
  import useAuthStore from "../../stores/auth";
  import PanelMenu from "primevue/panelmenu";
  import router from "../../routes";

  const UIStore = useUIStore();
  const authStore = useAuthStore();

  let header = ref("Welcome to IT Supporter");

  const userItemArray = [
    {
      label: "IT SUPPORTER",
      icon: "pi pi-home",
      command: () => {
        UIStore.visibleLeft = false;
        router.push("/introduction");
      },
    },
    {
      label: "Bài kiểm tra",
      icon: "pi pi-pencil",
      command: () => {
        UIStore.visibleLeft = false;
        router.push("/start-test");
      },
    },

    {
      label: "Tra cứu kết quả",
      icon: "pi pi-search",
      command: () => {
        UIStore.visibleLeft = false;
        router.push("/find-result");
      },
    },
    {
      label: "Đăng xuất",
      icon: "pi pi-sign-out",
      command: () => {
        authStore.logout();
        UIStore.visibleLeft = false;
        setTimeout(() => {
          router.push("/introduction");
        }, 100);
      },
    },
  ];

  const guestItemArray = [
    {
      label: "IT SUPPORTER",
      icon: "pi pi-home",
      command: () => {
        UIStore.visibleLeft = false;
        router.push("/introduction");
      },
    },
    {
      label: "Đăng ký CTV",
      icon: "pi pi-send",
      command: () => {
        UIStore.visibleLeft = false;
        router.push("/previous-registration");
      },
    },
    {
      label: "Tra cứu kết quả",
      icon: "pi pi-search",
      command: () => {
        UIStore.visibleLeft = false;
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
        UIStore.visibleLeft = false;
        router.push("/introduction");
      },
    },
    {
      label: "Bảng xếp hạng",
      icon: "pi pi-chart-bar",
      command: () => {
        UIStore.visibleLeft = false;
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
          command: () => {
            UIStore.visibleLeft = false;
            router.push("/students");
          },
        },
        {
          label: "Phỏng vấn",
          icon: "pi pi-user-edit",
          command: () => {
            UIStore.visibleLeft = false;
            router.push("/interviewers");
          },
        },
        {
          label: "Authenticator",
          icon: "pi pi-qrcode",
          command: () => {
            UIStore.visibleLeft = false;
            router.push("/Authenticator");
          },
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
          command: () => {
            UIStore.visibleLeft = false;
            router.push("/questions");
          },
        },
        {
          label: "Thêm câu hỏi",
          icon: "pi pi-plus",
          command: () => {
            UIStore.visibleLeft = false;
            router.push("/import-questions");
          },
        },
      ],
    },
    {
      label: "Phỏng vấn",
      icon: "pi pi-file-edit",
      command: () => {
        UIStore.visibleLeft = false;
        router.push("/interview");
      },
    },

    {
      label: "Sau phỏng vấn",
      icon: "pi pi-hourglass",
      items: [
        {
          label: "Duyệt CTV",
          icon: "pi pi-envelope",
          command: () => {
            UIStore.visibleLeft = false;
            router.push("/review");
          },
        },
      ],
    },
    {
      label: "Danh sách thống kê",
      icon: "pi pi-sort",
      command: () => {
        UIStore.visibleLeft = false;
        router.push("/stat");
      },
    },
    {
      label: "Đăng xuất",
      icon: "pi pi-sign-out",
      command: () => {
        authStore.logout();
        setTimeout(() => {
          UIStore.visibleLeft = false;
          router.push("/introduction");
        }, 100);
      },
    },
  ];
  const interviewerArray = [
    {
      label: "IT SUPPORTER",
      icon: "pi pi-home",
      command: () => {
        UIStore.visibleLeft = false;
        router.push("/introduction");
      },
    },
    {
      label: "Bảng xếp hạng",
      icon: "pi pi-chart-bar",
      command: () => {
        UIStore.visibleLeft = false;
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
          command: () => {
            UIStore.visibleLeft = false;
            router.push("/students");
          },
        },
        {
          label: "Phỏng vấn",
          icon: "pi pi-user-edit",
          command: () => {
            UIStore.visibleLeft = false;
            router.push("/interviewers");
          },
        },
        {
          label: "Authenticator",
          icon: "pi pi-qrcode",
          command: () => {
            UIStore.visibleLeft = false;
            router.push("/Authenticator");
          },
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
          command: () => {
            UIStore.visibleLeft = false;
            router.push("/questions");
          },
        },
        {
          label: "Thêm câu hỏi",
          icon: "pi pi-plus",
          command: () => {
            UIStore.visibleLeft = false;
            router.push("/import-questions");
          },
        },
      ],
    },
    {
      label: "Phỏng vấn",
      icon: "pi pi-file-edit",
      command: () => {
        UIStore.visibleLeft = false;
        router.push("/interview");
      },
    },
    {
      label: "Đăng xuất",
      icon: "pi pi-sign-out",
      command: () => {
        authStore.logout();
        setTimeout(() => {
          UIStore.visibleLeft = false;
          router.push("/introduction");
        }, 100);
      },
    },
  ];

  const items = computed(() => {
    header.value = authStore.isLoggedIn
      ? `Welcome, ${authStore.getStudentName}`
      : "Welcome to IT Supporter";

    if (authStore.getRole === "admin") {
      return adminItemArray;
    } else if (authStore.getRole === "interviewer") {
      return interviewerArray;
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
