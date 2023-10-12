<template>
  <main>
    <div v-if="isLoading">
      <div class="skeleton-loader bg-hydra-cinder-400"></div>
    </div>
    <!-- End skeleton loader -->
    <div v-else-if="currentTasklist">
      <h5 class="font-bold text-lg mb-4">
        <router-link
          :to="{
            name: 'projects.show',
            params: { id: currentProject.project_id },
          }"
          >{{ currentProject.name }}</router-link
        >
      </h5>
      <h1>{{ currentTasklist.name }}</h1>
      <div class="flex gap-x-10">
        <div class="w-2/3">
          <div v-if="currentTasklist?.tasks.length > 0">
            <router-link
              v-for="task in currentTasklist.tasks"
              :key="task.task_id"
              :to="{
                name: 'tasks.show',
                params: { id: task.task_id },
              }"
              class="block mb-4 p-4 bg-hydra-cinder-400 rounded"
            >
              {{ task.name }}
            </router-link>
          </div>
        </div>
        <div class="w-1/3">
          <div class="mb-6 flex justify-end">
            <button v-if="!isAddingTask" class="btn btn-primary mr-4">
              Edit
            </button>
            <button
              @click="toggleAddTask"
              :class="[
                'btn',
                isAddingTask ? ' bg-hydra-cinder-800 ' : 'btn-tertiary',
              ]"
            >
              {{ isAddingTask ? "Cancel" : "Add Task" }}
            </button>
          </div>
          <BlankTask v-if="isAddingTask" class="bg-hydra-cinder-400" />
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import { useProjectsStore, useTasklistsStore } from "@/stores";

import BlankTask from "@/components/tasks/BlankTask.vue";

export default {
  name: "TasklistsShow",
  components: {
    BlankTask,
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
      isAddingTask: false,
    };
  },
  computed: {
    currentProject() {
      return this.ProjectsStore.currentProject;
    },
    currentTasklist() {
      return this.TasklistsStore.currentTasklist;
    },
  },
  methods: {
    toggleAddTask() {
      this.isAddingTask = !this.isAddingTask;
    },
  },
  async mounted() {
    const currentTasklist = await this.TasklistsStore.fetchCurrentTasklist(
      this.$route.params.id
    );

    if (!this.ProjectsStore.currentProject) {
      this.ProjectsStore.setCurrentProject(currentTasklist.project);
    }

    this.isLoading = false;
  },
};
</script>
