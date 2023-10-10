<template>
  <nav>
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
        v-for="project in pinnedProjects"
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
import { useProjectsStore } from "@/stores";

import PlusIcon from "@/components/svgs/PlusIcon.vue";

export default {
  name: "SidebarNav",
  components: {
    PlusIcon,
  },
  setup() {
    const ProjectsStore = useProjectsStore();
    return {
      ProjectsStore,
    };
  },
  computed: {
    projectsList() {
      return this.ProjectsStore.allProjects;
    },
    pinnedProjects() {
      return this.ProjectsStore.filterPinnedProjects(this.projectsList);
    },
  },
};
</script>
