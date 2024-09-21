import { createWebHistory, createRouter } from "vue-router";
import useAuthStore from "../stores/auth";

const routes = [
  {
    path: "/",
    name: "home",
    redirect: "/introduction",
    meta: {
      requiredAuth: false,
      requiredRole: ["admin", "interviewer", "user", "guest"],
      layout: true,
    },
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../views/Login/LoginView.vue"),
    meta: {
      requiredAuth: false,
      requiredRole: ["admin", "interviewer", "user", "guest"],
      layout: true,
    },
  },
  {
    path: "/import-questions",
    name: "importQuestions",
    component: () => import("../views/Question/ImportQuestionView.vue"),
    meta: {
      requiredAuth: true,
      requiredRole: ["admin", "interviewer"],
      layout: true,
    },
  },
  {
    path: "/questions",
    name: "questions",
    component: () => import("../views/Question/QuestionListView.vue"),
    meta: {
      requiredAuth: true,
      requiredRole: ["admin", "interviewer"],
      layout: true,
    },
  },
  {
    path: "/introduction",
    name: "introduction",
    component: () => import("../views/Introduction/IntroductionView.vue"),
    meta: {
      requiredAuth: false,
      requiredRole: ["admin", "interviewer", "user", "guest"],
      layout: true,
    },
  },
  {
    path: "/leaderboard",
    name: "leaderboard",
    component: () => import("../views/Leaderboard/LeaderboardView.vue"),
    meta: {
      requiredAuth: true,
      requiredRole: ["admin", "interviewer"],
      layout: true,
    },
  },
  {
    path: "/interview",
    name: "interview",
    component: () => import("../views/Interview/InterviewView.vue"),
    meta: {
      requiredAuth: true,
      requiredRole: ["admin", "interviewer"],
      layout: true,
    },
  },
  {
    path: "/students",
    name: "students",
    component: () => import("../views/Student/StudentListView.vue"),
    meta: {
      requiredAuth: true,
      requiredRole: ["admin", "interviewer"],
      layout: true,
    },
  },
  {
    path: "/interviewers",
    name: "interviewers",
    component: () => import("../views/Student/InterviewerListView.vue"),
    meta: {
      requiredAuth: true,
      requiredRole: ["admin", "interviewer"],
      layout: true,
    },
  },
  {
    path: "/review",
    name: "review",
    component: () => import("../views/Review/ReviewView.vue"),
    meta: {
      requiredAuth: true,
      requiredRole: ["admin"],
      layout: true,
    },
  },
  {
    path: "/stat",
    name: "stat",
    component: () => import("../views/Stat/StatView.vue"),
    meta: {
      requiredAuth: true,
      requiredRole: ["admin"],
      layout: true,
    },
  },
  {
    path: "/find-result",
    name: "find-result",
    component: () => import("../views/FindResult/FindResultView.vue"),
    meta: {
      requiredAuth: false,
      requiredRole: ["admin", "interviewer", "user", "guest"],
      layout: true,
    },
  },
  {
    path: "/previous-registration",
    name: "previous-registration",
    component: () =>
      import("../views/PreviousRegistration/PreviousRegistrationView.vue"),
    meta: {
      requiredAuth: false,
      requiredRole: ["admin", "interviewer", "user", "guest"],
      layout: true,
    },
  },
  {
    path: "/start-test",
    name: "start-test",
    component: () => import("../views/Exam/StartTestView.vue"),
    meta: {
      requiredAuth: false,
      requiredRole: ["user"],
      layout: true,
    },
  },
  {
    path: "/test",
    name: "test",
    component: () => import("../views/Exam/TestView.vue"),
    meta: {
      requiredAuth: true,
      requiredRole: ["user"],
      layout: true,
    },
  },
  {
    path: "/finish-test",
    name: "finish-test",
    component: () => import("../views/Exam/EndTestView.vue"),
    meta: {
      requiredAuth: false,
      requiredRole: ["user"],
      layout: true,
    },
  },

  {
    path: "/authenticator",
    name: "authenticator",
    component: () => import("../views/AuthApp/AuthAppView.vue"),
    meta: {
      requiredAuth: true,
      requiredRole: ["admin", "interviewer"],
      layout: true,
    },
  },

  {
    path: "/:catchAll(.*)",
    component: () => import("../views/NotFound/NotFoundView.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();

  if (to.name === "login" && authStore.getIsLoggedIn) {
    next({ name: "introduction" });
    return;
  }

  if (to.name === "test" && authStore.getIsTested) {
    next({ name: "introduction" });
    return;
  }

  if (to.meta.requiredAuth && !authStore.getIsLoggedIn) {
    next({ name: "introduction" });
    return;
  }

  if (
    to.meta.requiredRole &&
    !to.meta.requiredRole.includes(authStore.getRole)
  ) {
    next({ name: "introduction" });
    return;
  }

  if (to.meta.requiredAuth && !authStore.getIsLoggedIn) {
    next({ name: "login" });
  } else if (
    to.meta.requiredRole &&
    !to.meta.requiredRole.includes(authStore.getRole)
  ) {
    next({ name: "login" });
  } else {
    next();
  }
});

export default router;
