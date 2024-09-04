import { createWebHistory, createRouter } from "vue-router";
import LoginView from "../views/Auth/LoginView.vue";
import NotFoundView from "../views/NotFound/NotFoundView.vue";
import ImportQuestionView from "../views/Question/ImportQuestionView.vue";
import QuestionListView from "../views/Question/QuestionListView.vue";
import IntroductionView from "../views/Introduction/IntroductionView.vue";
import LeaderboardView from "../views/Leaderboard/LeaderboardView.vue";
import InterviewView from "../views/Interview/InterviewView.vue";
import TestView from "../views/Exam/TestView.vue";
import StudentListView from "../views/Student/StudentListView.vue";
import InterviewerListView from "../views/Student/InterviewerListView.vue";
import useAuthStore from "../stores/auth";
import SendMailView from "../views/Mail/SendMailView.vue";
import FindResultView from "../views/FindResult/FindResultView.vue";
import PreviousRegistrationView from "../views/PreviousRegistration/PreviousRegistrationView.vue";
import StartTestView from "../views/Exam/StartTestView.vue";
import EndTestView from "../views/Exam/EndTestView.vue";
import usePlayStore from "../stores/play";

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
    component: LoginView,
    meta: {
      requiredAuth: false,
      requiredRole: ["admin", "interviewer", "user", "guest"],
      layout: true,
    },
  },
  {
    path: "/import-questions",
    name: "importQuestions",
    component: ImportQuestionView,
    meta: {
      requiredAuth: true,
      requiredRole: ["admin", "interviewer"],
      layout: true,
    },
  },
  {
    path: "/questions",
    name: "questions",
    component: QuestionListView,
    meta: {
      requiredAuth: true,
      requiredRole: ["admin", "interviewer"],
      layout: true,
    },
  },
  {
    path: "/introduction",
    name: "introduction",
    component: IntroductionView,
    meta: {
      requiredAuth: false,
      requiredRole: ["admin", "interviewer", "user", "guest"],
      layout: true,
    },
  },
  {
    path: "/leaderboard",
    name: "leaderboard",
    component: LeaderboardView,
    meta: {
      requiredAuth: true,
      requiredRole: ["admin", "interviewer"],
      layout: true,
    },
  },
  {
    path: "/interview",
    name: "interview",
    component: InterviewView,
    meta: {
      requiredAuth: true,
      requiredRole: ["admin", "interviewer"],
      layout: true,
    },
  },
  {
    path: "/students",
    name: "students",
    component: StudentListView,
    meta: {
      requiredAuth: true,
      requiredRole: ["admin", "interviewer"],
      layout: true,
    },
  },
  {
    path: "/interviewers",
    name: "interviewers",
    component: InterviewerListView,
    meta: {
      requiredAuth: true,
      requiredRole: ["admin", "interviewer"],
      layout: true,
    },
  },
  {
    path: "/mail",
    name: "mail",
    component: SendMailView,
    meta: {
      requiredAuth: true,
      requiredRole: ["admin"],
      layout: true,
    },
  },
  {
    path: "/find-result",
    name: "find-result",
    component: FindResultView,
    meta: {
      requiredAuth: false,
      requiredRole: ["admin", "interviewer", "user", "guest"],
      layout: true,
    },
  },
  {
    path: "/previous-registration",
    name: "previous-registration",
    component: PreviousRegistrationView,
    meta: {
      requiredAuth: false,
      requiredRole: ["admin", "interviewer", "user", "guest"],
      layout: true,
    },
  },
  {
    path: "/start-test",
    name: "start-test",
    component: StartTestView,
    meta: {
      requiredAuth: false,
      requiredRole: ["user"],
      layout: true,
    },
  },
  {
    path: "/test",
    name: "test",
    component: TestView,
    meta: {
      requiredAuth: true,
      requiredRole: ["user"],
      layout: true,
    },
  },
  {
    path: "/finish-test",
    name: "finish-test",
    component: EndTestView,
    meta: {
      requiredAuth: false,
      requiredRole: ["user"],
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
