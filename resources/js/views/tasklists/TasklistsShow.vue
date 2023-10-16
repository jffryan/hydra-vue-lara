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
            <IndexTable
              title="Pinned"
              :tableData="pinnedTasks"
              dataType="task"
              class="mb-12"
            />
            <IndexTable
              title="Other"
              :tableData="otherTasks"
              dataType="task"
              class="mb-12"
            />
            <IndexTable
              v-if="completedTasks.length > 0"
              title="Completed"
              :tableData="completedTasks"
              dataType="task"
            />
          </div>
        </div>
        <div class="w-1/3">
          <div class="mb-6 flex justify-end">
            <button
              @click="toggleAddTask"
              :class="[
                'btn mr-4',
                isAddingTask ? ' bg-hydra-cinder-800 ' : 'btn-primary ',
              ]"
            >
              {{ isAddingTask ? "Cancel" : "Add Task" }}
            </button>
            <router-link
              v-if="!isAddingTask"
              :to="{
                name: 'tasklists.edit',
                params: { id: currentTasklist.tasklist_id },
              }"
              class="btn btn-tertiary"
            >
              Edit
            </router-link>
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
import IndexTable from "@/components/tables/IndexTable.vue";

export default {
  name: "TasklistsShow",
  components: {
    BlankTask,
    IndexTable,
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
    tasklistTasks() {
      return this.currentTasklist.tasks;
    },
    partitionedTasks() {
      const pinned = [];
      const others = [];
      const completed = [];

      this.tasklistTasks.forEach((task) => {
        if (task.status_id === 3) {
          completed.push(task);
        } else if (task.is_priority || task.status_id === 2) {
          pinned.push(task);
        } else {
          others.push(task);
        }
      });

      return { pinned, others, completed };
    },
    pinnedTasks() {
      return this.partitionedTasks.pinned;
    },
    otherTasks() {
      return this.partitionedTasks.others;
    },
    completedTasks() {
      return this.partitionedTasks.completed;
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
