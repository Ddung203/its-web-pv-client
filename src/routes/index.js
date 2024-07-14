import { createWebHistory, createRouter } from "vue-router";

import LoginView from "../views/Auth/LoginView.vue";
import NotFoundView from "../views/NotFound/NotFoundView.vue";
import HomeView from "../views/Home/HomeView.vue";
import ImportQuestionView from "../views/Question/ImportQuestionView.vue";
import QuestionListView from "../views/Question/QuestionListView.vue";

const routes = [
  { path: "/", name: "home", component: HomeView },
  { path: "/login", name: "login", component: LoginView },
  { path: "/import", name: "question", component: ImportQuestionView },
  { path: "/questions", name: "questionList", component: QuestionListView },
  { path: "/:catchAll(.*)", component: NotFoundView },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
