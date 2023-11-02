<template>
  <main>
    <div v-if="isLoading">
      <div class="skeleton-loader bg-hydra-cinder-400"></div>
    </div>
    <div v-else-if="currentProject">
      <h1>Project: {{ currentProject.name }}</h1>
      <div class="mb-8">
        <p class="text-lg italic">{{ currentProject.description }}</p>
      </div>
      <div class="flex gap-x-10">
        <div class="w-2/3">
          <PanelSearchTasks
            v-if="2 + 2 === 5"
            class="bg-hydra-navy-850 p-8 rounded-lg border border-hydra-cinder-500 mb-8"
          />
          <div
            v-if="paginatedTasks.length"
            class="flex justify-end items-end mb-4"
          >
            <button
              @click="previousPage"
              :disabled="currentPage <= 1"
              class="mr-4"
            >
              Previous
            </button>
            <span class="mr-4">Page {{ currentPage }} of {{ totalPages }}</span>
            <button @click="nextPage" :disabled="currentPage >= totalPages">
              Next
            </button>
          </div>
          <div>
            <TaskBubbleRow
              v-for="task in paginatedTasks"
              :key="task.task_id"
              :task="task"
            />
          </div>
        </div>
        <div class="w-1/3">
          <PanelAddTask :current-project="currentProject" />
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import { useProjectsStore, useTasklistsStore } from "@/stores";

import PanelAddTask from "@/components/panels/PanelAddTask.vue";
import PanelSearchTasks from "@/components/panels/PanelSearchTasks.vue";
import TaskBubbleRow from "@/components/tasks/TaskBubbleRow.vue";

export default {
  name: "ProjectsTasksIndex",
  components: {
    PanelAddTask,
    PanelSearchTasks,
    TaskBubbleRow,
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
      currentPage: 1,
      itemsPerPage: 15,
      isAddingTask: false,
    };
  },
  computed: {
    currentProject() {
      return this.ProjectsStore.currentProject;
    },
    projectTasks() {
      const conditionsToRemove = {
        status_id: [3],
      };

      return this.ProjectsStore.currentProject.tasks.filter((task) => {
        return Object.keys(conditionsToRemove).every((prop) => {
          return !conditionsToRemove[prop].includes(task[prop]);
        });
      });
    },
    sortedProjectTasks() {
      return [...this.projectTasks].sort((a, b) => {
        if (a.status_id === b.status_id) {
          return b.is_priority - a.is_priority;
        }
        if (a.status_id === 2) return -1;
        if (b.status_id === 2) return 1;

        return 0;
      });
    },
    paginatedTasks() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = this.currentPage * this.itemsPerPage;
      return this.sortedProjectTasks.slice(start, end);
    },
    totalPages() {
      return Math.ceil(this.projectTasks.length / this.itemsPerPage);
    },
  },
  watch: {
    "$route.params.id": {
      immediate: true,
      handler: "fetchCurrentProjectFromRoute",
    },
  },
  methods: {
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage += 1;
      }
    },
    previousPage() {
      if (this.currentPage > 1) {
        this.currentPage -= 1;
      }
    },
    toggleAddTask() {
      this.isAddingTask = !this.isAddingTask;
    },
    async fetchCurrentProjectFromRoute() {
      await this.ProjectsStore.fetchCurrentProject(this.$route.params.id);
      this.isLoading = false;
    },
  },
  mounted() {
    this.TasklistsStore.setCurrentTasklist(null);
  },
};
</script>
