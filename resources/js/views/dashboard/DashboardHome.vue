<template>
  <main>
    <div v-if="isLoaded">
      <div class="mb-12">
        <h1 v-if="user">{{ greetingMessage }}</h1>
      </div>
      <div v-if="TasksStore.allCurrentTasks.length">
        <h2 class="mb-4">Active tasks</h2>
        <div class="flex flex-wrap -mx-2">
          <div
            v-for="task in TasksStore.allCurrentTasks"
            :key="task.task_id"
            class="w-full md:w-1/2 lg:w-1/3 px-2 mb-4"
          >
            <TaskCard :task="task" />
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import { useAuthStore, useTasksStore } from "@/stores";

import TaskCard from "@/components/tasks/TaskCard.vue";

export default {
  name: "DashboardHome",
  components: {
    TaskCard,
  },
  setup() {
    const AuthStore = useAuthStore();
    const TasksStore = useTasksStore();
    return { AuthStore, TasksStore };
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
  },
  methods: {
    async prepareDashboardTasks() {
      const {
        allTasks,
        fetchAllTasks,
        filterPriorityTasks,
        setAllCurrentTasks,
      } = this.TasksStore;

      const tasksToFilter = allTasks.length ? allTasks : await fetchAllTasks();

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
