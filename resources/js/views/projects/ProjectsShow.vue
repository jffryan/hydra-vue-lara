<template>
  <main>
    <div v-if="isLoading">
      <div class="skeleton-loader bg-hydra-cinder-400"></div>
    </div>
    <!-- End skeleton loader -->
    <div v-else-if="currentProject">
      <h1>{{ currentProject.name }}</h1>
      <div class="flex gap-x-10">
        <div class="w-2/3">
          <div class="mb-8">
            <p class="text-lg italic">{{ currentProject.description }}</p>
          </div>
          <div v-if="currentProject.tasklists.length > 0">
            <IndexTable
              title="Pinned"
              :tableData="pinnedTasklists"
              dataType="tasklist"
              class="mb-12"
            />
            <IndexTable
              title="Other"
              :tableData="otherTasklists"
              dataType="tasklist"
            />
          </div>
        </div>
        <div class="w-1/3">
          <div class="mb-6 flex justify-end">
            <button
              @click="toggleAddTasklist"
              :class="[
                'btn mr-4',
                isAddingTasklist ? ' bg-hydra-cinder-800 ' : 'btn-primary',
              ]"
            >
              {{ isAddingTasklist ? "Cancel" : "Add Tasklist" }}
            </button>
            <router-link
              v-if="!isAddingTasklist"
              :to="{
                name: 'projects.edit',
                params: { id: currentProject.project_id },
              }"
              class="btn btn-tertiary"
            >
              Edit
            </router-link>
          </div>
          <BlankTasklist v-if="isAddingTasklist" class="bg-hydra-cinder-400" />
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import { useProjectsStore, useTasklistsStore } from "@/stores";

import BlankTasklist from "@/components/tasklists/BlankTasklist.vue";
import IndexTable from "@/components/tables/IndexTable.vue";

export default {
  name: "ProjectsShow",
  components: {
    BlankTasklist,
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
      isAddingTasklist: false,
    };
  },
  computed: {
    currentProject() {
      return this.ProjectsStore.currentProject;
    },
    projectTasklists() {
      return this.currentProject.tasklists;
    },
    partitionedProjects() {
      const pinned = [];
      const others = [];

      this.projectTasklists.forEach((tasklist) => {
        if (tasklist.is_pinned === 1) {
          pinned.push(tasklist);
        } else {
          others.push(tasklist);
        }
      });

      return { pinned, others };
    },
    pinnedTasklists() {
      return this.partitionedProjects.pinned;
    },
    otherTasklists() {
      return this.partitionedProjects.others;
    },
  },
  methods: {
    toggleAddTasklist() {
      this.isAddingTasklist = !this.isAddingTasklist;
    },
  },
  async mounted() {
    await this.ProjectsStore.fetchCurrentProject(this.$route.params.id);
    this.isLoading = false;
  },
};
</script>

<style>
.skeleton-loader {
  width: 70%; /* Adjust based on your design */
  height: 30px; /* Adjust based on your font-size */
  border-radius: 4px;
  animation: shimmer 1.5s infinite;
}

@keyframes shimmer {
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
}
</style>
