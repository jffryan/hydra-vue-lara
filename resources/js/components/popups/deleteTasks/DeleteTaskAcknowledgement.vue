<template>
  <div>
    <div class="mb-8">
      <h5 class="font-bold text-lg mb-4">
        {{ currentTask.name }} has been deleted successfully.
      </h5>
    </div>
    <div>
      <button @click="navigateToTasklist" class="btn btn-primary mr-4">
        Return to tasklist
      </button>
      <button
        @click="navigateToProject"
        class="btn bg-hydra-cinder-400 hover:bg-hydra-cinder-500"
      >
        Return to project
      </button>
    </div>
  </div>
</template>

<script>
import { usePopupStore, useProjectsStore, useTasklistsStore } from "@/stores";

export default {
  name: "DeleteTaskAcknowledgement",
  setup() {
    const PopupStore = usePopupStore();
    const ProjectsStore = useProjectsStore();
    const TasklistsStore = useTasklistsStore();
    return {
      PopupStore,
      ProjectsStore,
      TasklistsStore,
    };
  },
  computed: {
    currentTask() {
      return this.PopupStore.componentData;
    },
  },
  methods: {
    navigateToTasklist() {
      this.PopupStore.closePopup();
      if (
        this.TasklistsStore.currentTasklist &&
        this.TasklistsStore.currentTasklist.tasklist_id
      ) {
        this.$router.push({
          name: "tasklists.show",
          params: {
            id: this.TasklistsStore.currentTasklist.tasklist_id,
          },
        });
      } else {
        this.$router.push({ name: "tasklists.index" });
      }
    },
    navigateToProject() {
      this.PopupStore.closePopup();
      if (
        this.ProjectsStore.currentProject &&
        this.ProjectsStore.currentProject.project_id
      ) {
        this.$router.push({
          name: "projects.tasks.index",
          params: {
            id: this.ProjectsStore.currentProject.project_id,
          },
        });
      } else {
        this.$router.push({ name: "projects.index" });
      }
    },
  },
};
</script>
