<template>
  <main>
    <div v-if="isLoaded">
      <div class="mb-12">
        <h1 v-if="user">{{ greetingMessage }}</h1>
      </div>
      <div
        v-if="userProjects"
        class="bg-hydra-navy-850 px-8 py-8 rounded-lg border border-hydra-cinder-500 mb-12"
      >
        <h2 class="mb-8">Your Projects</h2>
        <div class="grid grid-cols-3 gap-x-4 gap-y-4">
          <div
            v-for="project in userProjects"
            :key="project.project_id"
            class="w-full"
          >
            <ProjectCard
              :project="project"
              class="h-full p-4 mb-2 rounded-md bg-hydra-cinder-700 hover:bg-hydra-cinder-600"
            />
          </div>
        </div>
      </div>
      <!-- Extract this out to TaskWidget -->
      <div
        v-if="TasksStore.allCurrentTasks"
        class="bg-hydra-navy-850 px-8 py-8 rounded-lg border border-hydra-cinder-500"
      >
        <h2 class="mb-8">Active tasks</h2>
        <div class="grid grid-cols-3 gap-x-4 gap-y-4">
          <div
            v-for="task in TasksStore.allCurrentTasks"
            :key="task.task_id"
            class="w-full"
          >
            <TaskCard
              :task="task"
              :class="
                task.status_id === 2
                  ? ' bg-hydra-navy-700 hover:bg-hydra-navy-700'
                  : 'bg-hydra-cinder-700 hover:bg-hydra-cinder-600'
              "
              class="h-full p-4 mb-2 rounded-md"
            />
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import { useAuthStore, useProjectsStore, useTasksStore } from "@/stores";

import ProjectCard from "@/components/projects/ProjectCard.vue";
import TaskCard from "@/components/tasks/TaskCard.vue";

export default {
  name: "DashboardHome",
  components: {
    ProjectCard,
    TaskCard,
  },
  setup() {
    const AuthStore = useAuthStore();
    const ProjectsStore = useProjectsStore();
    const TasksStore = useTasksStore();
    return { AuthStore, ProjectsStore, TasksStore };
  },
  data() {
    return {
      isLoaded: false,
      currentHours: null,
    };
  },
  computed: {
    user() {
      return this.AuthStore.user;
    },
    // ---This can be extracted into something more universal---
    isMorning() {
      return this.currentHours >= 5 && this.currentHours < 12;
    },
    isAfternoon() {
      return this.currentHours >= 12 && this.currentHours < 17;
    },
    isEvening() {
      return this.currentHours >= 17 && this.currentHours < 21;
    },
    isNight() {
      return this.currentHours >= 21 || this.currentHours < 5;
    },
    // ---End extraction---
    greetingMessage() {
      if (this.isMorning) return "Good morning, sunshine";
      if (this.isAfternoon) return `Good afternoon, ${this.user.name}`;
      if (this.isEvening) return `Good evening, ${this.user.name}`;
      if (this.isNight) return `Pulling a late night, eh ${this.user.name}?`;
      return "Hello";
    },
    // Technically this is widget related
    userProjects() {
      return this.ProjectsStore.allProjects;
    },
  },
  methods: {
    async prepareDashboardTasks() {
      const { fetchAllTasks, filterPriorityTasks, setAllCurrentTasks } =
        this.TasksStore;

      const tasksToFilter = await fetchAllTasks();

      const filteredTasks = filterPriorityTasks(tasksToFilter);
      setAllCurrentTasks(filteredTasks);
    },
  },
  mounted() {
    // ---This can be extracted into something more universal---
    const currentTime = new Date();
    const currentHours = currentTime.getHours();
    this.currentHours = currentHours;
    // ---End extraction---
    this.prepareDashboardTasks();
    this.isLoaded = true;
  },
};
</script>
