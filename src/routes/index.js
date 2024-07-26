import { createWebHistory, createRouter } from "vue-router";
import LoginView from "../views/Auth/LoginView.vue";
import NotFoundView from "../views/NotFound/NotFoundView.vue";
import HomeView from "../views/Home/HomeView.vue";
import ImportQuestionView from "../views/Question/ImportQuestionView.vue";
import QuestionListView from "../views/Question/QuestionListView.vue";
import IntroductionView from "../views/Introduction/IntroductionView.vue";
import LeaderboardView from "../views/Leaderboard/LeaderboardView.vue";
import InterviewView from "../views/Interview/InterviewView.vue";
import TestView from "../views/Test/TestView.vue";
import StudentListView from "../views/Student/StudentListView.vue";
import SocketView from "../views/Socket/SocketView.vue";
import useAuthStore from "../stores/auth";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
    meta: {
      requiredAuth: false,
      layout: true,
    },
  },
  {
    path: "/login",
    name: "login",
    component: LoginView,
    meta: {
      requiredAuth: false,
      layout: true,
    },
  },
  {
    path: "/import-questions",
    name: "importQuestions",
    component: ImportQuestionView,
    meta: {
      requiredAuth: true,
      layout: true,
    },
  },
  {
    path: "/questions",
    name: "questions",
    component: QuestionListView,
    meta: {
      requiredAuth: true,
      layout: true,
    },
  },
  {
    path: "/introduction",
    name: "introduction",
    component: IntroductionView,
    meta: {
      requiredAuth: false,
      layout: true,
    },
  },
  {
    path: "/leaderboard",
    name: "leaderboard",
    component: LeaderboardView,
    meta: {
      requiredAuth: true,
      layout: true,
    },
  },
  {
    path: "/interview",
    name: "interview",
    component: InterviewView,
    meta: {
      requiredAuth: true,
      layout: true,
    },
  },
  {
    path: "/test",
    name: "test",
    component: TestView,
    meta: {
      requiredAuth: true,
      layout: true,
    },
  },
  {
    path: "/students",
    name: "students",
    component: StudentListView,
    meta: {
      requiredAuth: true,
      layout: true,
    },
  },
  {
    path: "/import-students",
    name: "import-students",
    component: StudentListView,
    meta: {
      requiredAuth: true,
      layout: true,
    },
  },
  {
    path: "/socket",
    name: "socket",
    component: SocketView,
    meta: {
      requiredAuth: false,
      layout: true,
    },
  },
  { path: "/:catchAll(.*)", component: NotFoundView },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();

  if (to.name == "login" && authStore.getIsLoggedIn) {
    next({ name: "introduction" });
  } else if (to.meta.requiredAuth && !authStore.getIsLoggedIn) {
    next({ name: "introduction" });
  } else {
    next();
  }
});

export default router;
