<template>
  <main>
    <div v-if="isLoading">
      <div class="skeleton-loader bg-hydra-cinder-400"></div>
    </div>
    <!-- End skeleton loader -->
    <div v-else-if="currentProject">
      <h1>{{ currentProject.name }}</h1>
      <div class="flex">
        <div class="w-2/3">
          <div v-if="currentProject.tasklists.length > 0">
            <p
              v-for="tasklist in currentProject.tasklists"
              :key="tasklist.tasklist_id"
            >
              {{ tasklist.name }}
            </p>
          </div>
        </div>
        <div class="w-1/3">
          <div class="mb-6 flex justify-end">
            <button v-if="!isAddingTasklist" class="btn btn-primary mr-4">
              Edit
            </button>
            <button
              @click="toggleAddTasklist"
              :class="[
                'btn',
                isAddingTasklist ? ' bg-hydra-cinder-800 ' : 'btn-tertiary',
              ]"
            >
              {{ isAddingTasklist ? "Cancel" : "Add Tasklist" }}
            </button>
          </div>
          <BlankTasklist v-if="isAddingTasklist" class="bg-hydra-cinder-400" />
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import { useProjectsStore } from "@/stores";

import BlankTasklist from "@/components/tasklists/BlankTasklist.vue";

export default {
  name: "ProjectsShow",
  components: {
    BlankTasklist,
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
      isAddingTasklist: false,
    };
  },
  computed: {
    currentProject() {
      return this.ProjectsStore.currentProject;
    },
  },
  methods: {
    toggleAddTasklist() {
      this.isAddingTasklist = !this.isAddingTasklist;
    },
  },
  async mounted() {
    await this.ProjectsStore.fetchCurrentProject(this.$route.params.id);
    this.isLoading = false;
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
