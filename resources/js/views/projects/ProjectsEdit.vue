<template>
  <main>
    <div v-if="isLoading">
      <div class="skeleton-loader bg-hydra-cinder-400"></div>
    </div>
    <div v-else-if="currentProject">
      <div class="flex gap-x-10">
        <div class="w-2/3">
          <EditProject />
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import EditProject from "@/components/projects/EditProject.vue";
import { useProjectsStore } from "@/stores";

export default {
  name: "ProjectsEdit",
  components: {
    EditProject,
  },
  setup() {
    const ProjectsStore = useProjectsStore();
    return {
      ProjectsStore,
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
  },
  mounted() {
    if (!this.currentProject) {
      this.ProjectsStore.fetchCurrentProject(this.$route.params.id);
    }
    this.isLoading = false;
  },
};
</script>
