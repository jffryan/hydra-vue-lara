<template>
  <div>
    <div class="mb-8">
      <h5 class="font-bold text-lg mb-4">
        {{ currentProject.name }} has been deleted successfully.
      </h5>
    </div>
    <div>
      <button @click="navigateToProjectIndex" class="btn btn-primary">
        Return to index
      </button>
    </div>
  </div>
</template>

<script>
import { usePopupStore, useProjectsStore } from "@/stores";

export default {
  name: "DeleteProjectAcknowledgement",
  setup() {
    const PopupStore = usePopupStore();
    const ProjectsStore = useProjectsStore();
    return {
      PopupStore,
      ProjectsStore,
    };
  },
  computed: {
    currentProject() {
      return this.PopupStore.componentData;
    },
  },
  methods: {
    navigateToProjectIndex() {
      this.PopupStore.closePopup();
      this.$router.push({ name: "projects.index" });
    },
  },
};
</script>
