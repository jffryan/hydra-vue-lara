import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("@/views/HomeView.vue"),
    },
    {
      path: "/about",
      name: "about",
      component: () => import("@/views/HomeView.vue"),
    },
    {
      path: "/projects",
      name: "projects.index",
      component: () => import("@/views/projects/ProjectsIndex.vue"),
    },
    {
      path: "/projects/:id",
      name: "projects.show",
      component: () => import("@/views/projects/ProjectsShow.vue"),
    },
    {
      path: "/projects/new",
      name: "projects.create",
      component: () => import("@/views/projects/ProjectsCreate.vue"),
    },
    {
      path: "/tasklists/:id",
      name: "tasklists.show",
      component: () => import("@/views/tasklists/TasklistsShow.vue"),
    },
    {
      path: "/tasks/:id",
      name: "tasks.show",
      component: () => import("@/views/tasks/TasksShow.vue"),
    },
  ],
});

export default router;
