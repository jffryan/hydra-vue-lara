<template>
  <main>
    <h1>Projects</h1>
    <div class="flex">
      <div class="w-2/3">
        <IndexTable
          title="Pinned"
          :tableData="pinnedProjects"
          dataType="project"
          class="mb-12"
        />
        <IndexTable
          title="Other"
          :tableData="otherProjects"
          dataType="project"
        />
      </div>
      <div class="w-1/3"></div>
    </div>
  </main>
</template>

<script>
import { useProjectsStore } from "@/stores";

import IndexTable from "@/components/tables/IndexTable.vue";

export default {
  name: "ProjectsIndex",
  components: {
    IndexTable,
  },
  setup() {
    const ProjectsStore = useProjectsStore();
    return {
      ProjectsStore,
    };
  },
  computed: {
    projectsList() {
      return this.ProjectsStore.allProjects;
    },
    partitionedProjects() {
      const pinned = [];
      const others = [];

      this.projectsList.forEach((project) => {
        if (project.is_pinned === 1) {
          pinned.push(project);
        } else {
          others.push(project);
        }
      });

      return { pinned, others };
    },
    pinnedProjects() {
      return this.partitionedProjects.pinned;
    },
    otherProjects() {
      return this.partitionedProjects.others;
    },
  },
  mounted() {
    this.ProjectsStore.fetchAllProjects();
  },
};
</script>
