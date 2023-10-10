<template>
  <main>
    <h1>Projects</h1>
    <div class="flex">
      <div class="w-2/3">
        <div v-for="project in projectsList" :key="project.project_id">
          <router-link
            :to="{ name: 'projects.show', params: { id: project.project_id } }"
          >
            {{ project.name }}
          </router-link>
        </div>
      </div>
      <div class="w-1/3"></div>
    </div>
  </main>
</template>

<script>
import { useProjectsStore } from "@/stores";

export default {
  name: "ProjectsIndex",
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
  },
  mounted() {
    this.ProjectsStore.fetchAllProjects();
  },
};
</script>
