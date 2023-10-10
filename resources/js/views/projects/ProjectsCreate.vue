<template>
  <main>
    <h1>New Project</h1>
    <div class="w-2/3">
      <BlankProject />
    </div>
  </main>
</template>

<script>
import BlankProject from "@/components/projects/BlankProject.vue";

export default {
  name: "ProjectsCreate",
  components: {
    BlankProject,
  },
};
</script>
