<template>
  <main>
    <div v-if="isLoading">
      <div class="skeleton-loader bg-hydra-cinder-400"></div>
    </div>
    <!-- End skeleton loader -->
    <div v-else-if="currentTask">
      <div class="flex items-start mb-4">
        <h5 class="font-bold text-lg mr-8">
          <router-link
            :to="{
              name: 'projects.show',
              params: { id: currentProject.project_id },
            }"
            >{{ currentProject.name }}</router-link
          >
        </h5>
        <span class="mr-8">&nbsp;|&nbsp;</span>
        <h5>
          <router-link
            :to="{
              name: 'tasklists.show',
              params: { id: currentTasklist.tasklist_id },
            }"
          >
            {{ currentTasklist.name }}
          </router-link>
        </h5>
      </div>
      <div class="flex gap-x-10">
        <div class="w-2/3">
          <EditTask />
        </div>
        <div class="w-1/3">
          <div class="mb-6 flex justify-end">
            <router-link
              :to="{ name: 'tasks.show', params: { id: currentTask.task_id } }"
              class="btn btn-primary mr-4"
              >Cancel</router-link
            >
            <button @click="initateDeleteTask" class="btn btn-danger">
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import { useProjectsStore, useTasklistsStore, useTasksStore } from "@/stores";

import EditTask from "@/components/tasks/EditTask.vue";

export default {
  name: "TasksEdit",
  components: {
    EditTask,
  },
  setup() {
    const ProjectsStore = useProjectsStore();
    const TasklistsStore = useTasklistsStore();
    const TasksStore = useTasksStore();
    return {
      ProjectsStore,
      TasklistsStore,
      TasksStore,
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
    currentTasklist() {
      return this.TasklistsStore.currentTasklist;
    },
    currentTask() {
      return this.TasksStore.currentTask;
    },
  },
  async mounted() {
    const currentTask = await this.TasksStore.fetchCurrentTask(
      this.$route.params.id
    );

    if (!this.TasklistsStore.currentTasklist) {
      this.TasklistsStore.setCurrentTasklist(currentTask.tasklist);
    }

    if (!this.ProjectsStore.currentProject) {
      this.ProjectsStore.setCurrentProject(currentTask.tasklist.project);
    }

    this.isLoading = false;
  },
};
</script>
