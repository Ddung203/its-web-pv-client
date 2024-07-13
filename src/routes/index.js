import { createWebHistory, createRouter } from "vue-router";

import HomeView from "../views/HomeView.vue";
import ImportQuestionView from "../views/ImportQuestionView.vue";
import LoginView from "../views/auth/LoginView.vue";
import NotFoundView from "../views/NotFoundView.vue";

const routes = [
  { path: "/", name: "home", component: HomeView },
  { path: "/login", name: "login", component: LoginView },
  { path: "/import", name: "question", component: ImportQuestionView },
  { path: "/:catchAll(.*)", component: NotFoundView },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
