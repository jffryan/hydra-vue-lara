<template>
  <main>
    <div v-if="isLoading">
      <div class="skeleton-loader bg-hydra-cinder-400"></div>
    </div>
    <!-- End skeleton loader -->
    <div v-else-if="currentProject">
      <div class="flex justify-between">
        <h1>{{ currentProject.name }}</h1>
        <div class="mb-6 flex justify-end">
          <button
            :class="viewFormat === 'list' ? 'underline font-bold' : ''"
            class="mr-4 hover:underline"
          >
            List view
          </button>
          <button
            :class="viewFormat === 'app' ? 'underline font-bold' : ''"
            class="hover:underline"
          >
            App view
          </button>
        </div>
      </div>
      <ProjectListLayout />
    </div>
  </main>
</template>

<script>
import { useProjectsStore, useTasklistsStore } from "@/stores";

import ProjectListLayout from "@/components/projects/ProjectListLayout.vue";

export default {
  name: "ProjectsShow",
  components: {
    ProjectListLayout,
  },
  setup() {
    const ProjectsStore = useProjectsStore();
    const TasklistsStore = useTasklistsStore();
    return {
      ProjectsStore,
      TasklistsStore,
    };
  },
  data() {
    return {
      isLoading: true,
    };
  },
  computed: {
    currentProject() {
      return this.ProjectsStore.currentProject;
    },
    viewFormat() {
      return this.ProjectsStore.viewFormat;
    },
  },
  watch: {
    "$route.params.id": {
      immediate: true,
      handler: "fetchCurrentProjectFromRoute",
    },
    currentProject: {
      immediate: false,
      handler: "setProjectTasklists",
    },
  },
  methods: {
    fetchCurrentProjectFromRoute() {
      this.ProjectsStore.fetchCurrentProject(this.$route.params.id);
      this.isLoading = false;
    },
    setProjectTasklists() {
      this.TasklistsStore.setProjectTasklists(this.currentProject.tasklists);
    },
  },
};
</script>

<style>
.skeleton-loader {
  width: 70%; /* Adjust based on your design */
  height: 30px; /* Adjust based on your font-size */
  border-radius: 4px;
  animation: shimmer 1.5s infinite;
}

@keyframes shimmer {
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
}
</style>
