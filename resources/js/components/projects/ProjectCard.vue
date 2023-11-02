<template>
  <router-link
    :to="{ name: 'projects.tasks.index', params: { id: project.project_id } }"
    class="block h-full w-full cursor-pointer"
  >
    <h3>{{ project.name }}</h3>
    <!-- <h5 class="mb-2">Project: {{ taskProject.name }}</h5>
    <p class="mb-2">Tasklist: {{ tasklist.name }}</p> -->
    <!-- <p class="mb-2 font-bold">Task due in 2 days</p> -->
  </router-link>
</template>

<script>
export default {
  name: "ProjectCard",
  props: {
    project: {
      type: Object,
      required: true,
    },
  },
};
</script>
