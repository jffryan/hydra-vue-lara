<template>
  <nav v-if="AuthStore.isLoggedIn">
    <ul>
      <li class="mb-2">
        <router-link :to="{ name: 'projects.index' }">Projects</router-link>
      </li>
      <li class="mb-2">
        <router-link :to="{ name: 'projects.create' }" class="flex items-center"
          ><PlusIcon class="mr-2" /> New Project</router-link
        >
      </li>
      <li
        v-for="project in projectsList"
        :key="project.project_id"
        class="mb-2 ml-4"
      >
        <router-link
          :to="{ name: 'projects.show', params: { id: project.project_id } }"
          >{{ project.name }}</router-link
        >
      </li>
    </ul>
  </nav>
</template>

<script>
import { useAuthStore, useProjectsStore } from "@/stores";

import PlusIcon from "@/components/svgs/PlusIcon.vue";

export default {
  name: "SidebarNav",
  components: {
    PlusIcon,
  },
  setup() {
    const AuthStore = useAuthStore();
    const ProjectsStore = useProjectsStore();
    return {
      AuthStore,
      ProjectsStore,
    };
  },
  computed: {
    projectsList() {
      return this.ProjectsStore.allProjects;
    },
    isLoggedIn() {
      return this.AuthStore.isLoggedIn;
    },
  },
  watch: {
    isLoggedIn: {
      immediate: true,
      handler() {
        if (this.isLoggedIn && this.projectsList.length === 0) {
          this.ProjectsStore.fetchAllProjects();
        }
      },
    },
  },
};
</script>
