<template>
  <router-link
    :to="{ name: 'tasks.show', params: { id: task.task_id } }"
    class="block h-full w-full cursor-pointer"
  >
    <h3>{{ task.name }}</h3>
    <h5 class="mb-2">Project: {{ taskProject.name }}</h5>
    <p v-if="tasklist" class="mb-2">Tasklist: {{ tasklist.name }}</p>
  </router-link>
</template>

<script>
export default {
  name: "TaskCard",
  props: {
    task: {
      type: Object,
      required: true,
    },
  },
  computed: {
    taskProject() {
      return this.task.project;
    },
    tasklist() {
      return this.task.tasklist;
    },
  },
};
</script>
