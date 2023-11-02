<template>
  <main>
    <div v-if="isLoading">
      <div class="skeleton-loader bg-hydra-cinder-400"></div>
    </div>
    <!-- End skeleton loader -->
    <div
      v-else-if="currentTask"
      class="bg-hydra-navy-850 px-8 py-8 rounded-lg border border-hydra-cinder-500 mb-12"
    >
      <div class="flex items-start mb-2">
        <h5 class="font-bold text-lg">
          <router-link
            :to="{
              name: 'projects.tasks.index',
              params: { id: currentProject.project_id },
            }"
            >{{ currentProject.name }}</router-link
          >
        </h5>
      </div>

      <div class="flex gap-x-10">
        <div class="w-2/3">
          <div class="mb-8">
            <h1 class="mb-4">{{ currentTask.name }}</h1>
            <p v-if="currentTask.description" class="mb-8">
              {{ currentTask.description }}
            </p>
            <div class="flex justify-start items-start mb-4">
              <div class="inline-block btn bg-hydra-cinder-500 mr-8">
                {{ currentTask.status.name }}
              </div>
              <div
                v-if="currentTask.is_priority"
                class="inline-block btn bg-hydra-cinder-400"
              >
                Priority
              </div>
            </div>
          </div>
          <div>
            <h2>Subtasks</h2>
            <ul v-if="currentTask.subtasks?.length > 0">
              <li
                v-for="subtask in currentTask.subtasks"
                :key="subtask.subtask_id"
              >
                <input
                  disabled
                  type="checkbox"
                  v-model="subtask.is_complete"
                  :true-value="1"
                  :false-value="0"
                  class="w-4 h-4 text-blue-600 rounded focus:ring-blue-600 ring-offset-gray-800 focus:ring-2 bg-gray-700 border-gray-600"
                />
                <label
                  :class="[
                    'ml-2 font-medium',
                    subtask.is_complete === 1 ? 'line-through' : '',
                  ]"
                >
                  {{ subtask.text }}</label
                >
              </li>
            </ul>
            <p v-else>No subtasks</p>
          </div>
        </div>
        <div class="w-1/3">
          <div class="mb-6 flex justify-end">
            <router-link
              :to="{ name: 'tasks.edit', params: { id: currentTask.task_id } }"
              class="btn btn-primary"
              >Edit</router-link
            >
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import { useProjectsStore, useTasklistsStore, useTasksStore } from "@/stores";

export default {
  name: "TasksShow",
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
    currentTask() {
      return this.TasksStore.currentTask;
    },
  },
  async mounted() {
    const currentTask = await this.TasksStore.fetchCurrentTask(
      this.$route.params.id
    );

    if (!this.ProjectsStore.currentProject) {
      this.ProjectsStore.setCurrentProject(currentTask.project);
    }

    this.isLoading = false;
  },
};
</script>
