<template>
  <router-link
    :to="{ name: 'tasks.show', params: { id: task.task_id } }"
    class="block w-full cursor-pointer h-full px-4 py-2 mb-2 rounded-md bg-hydra-cinder-700 hover:bg-hydra-cinder-600"
  >
    <div class="flex w-full h-full items-center justify-between">
      <h4 class="text-lg mb-0">{{ task.name }}</h4>
      <span>{{ mapStatus(task.status_id) }}</span>
    </div>
  </router-link>
</template>

<script>
export default {
  name: "TaskBubbleRow",
  props: {
    task: {
      type: Object,
      required: true,
    },
  },
  methods: {
    mapStatus(status_id) {
      switch (status_id) {
        case 1:
          return "Backlog";
        case 2:
          return "In Progress";
        case 3:
          return "Completed";
        default:
          return "Unknown";
      }
    },
  },
};
</script>
