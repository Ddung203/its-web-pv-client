import { createWebHistory, createRouter } from "vue-router";

import LoginView from "../views/Auth/LoginView.vue";
import NotFoundView from "../views/NotFound/NotFoundView.vue";
import HomeView from "../views/Home/HomeView.vue";
import ImportQuestionView from "../views/Question/ImportQuestionView.vue";
import QuestionListView from "../views/Question/QuestionListView.vue";
import IntroductionView from "../views/Introduction/IntroductionView.vue";
import LeaderboardView from "../views/Leaderboard/LeaderboardView.vue";
import InterviewView from "../views/Interview/InterviewView.vue";

const routes = [
  { path: "/", name: "home", component: HomeView },
  { path: "/login", name: "login", component: LoginView },
  {
    path: "/import-questions",
    name: "importQuestions",
    component: ImportQuestionView,
  },
  { path: "/questions", name: "questions", component: QuestionListView },
  { path: "/introduction", name: "introduction", component: IntroductionView },
  {
    path: "/leaderboard",
    name: "leaderboard",
    component: LeaderboardView,
  },
  {
    path: "/interview",
    name: "interview",
    component: InterviewView,
  },
  { path: "/:catchAll(.*)", component: NotFoundView },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
