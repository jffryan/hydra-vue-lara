<template>
  <div>
    <div class="mb-8">
      <h5 class="font-bold text-lg mb-4">
        {{ currentTasklist.name }} has been deleted successfully.
      </h5>
    </div>
    <div>
      <button @click="navigateToProject" class="btn btn-primary">
        Return to project
      </button>
    </div>
  </div>
</template>

<script>
import { usePopupStore, useProjectsStore, useTasklistsStore } from "@/stores";

export default {
  name: "DeleteTasklistAcknowledgement",
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
    currentTasklist() {
      return this.PopupStore.componentData;
    },
  },
  methods: {
    navigateToProject() {
      this.PopupStore.closePopup();
      if (
        this.ProjectsStore.currentProject &&
        this.ProjectsStore.currentProject.project_id
      ) {
        this.$router.push({
          name: "projects.show",
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
