<template>
  <div>
    <div class="mb-8">
      <h5 class="font-bold text-lg mb-4">
        There was an error deleting this tasklist:
      </h5>
      <p>{{ errorMessage }}</p>
    </div>
    <div>
      <button @click="navigateToProject" class="btn btn-primary mr-4">
        Return to project
      </button>
      <button @click="closePopup" class="btn btn-secondary">
        Return to tasklist
      </button>
    </div>
  </div>
</template>

<script>
import { usePopupStore, useProjectsStore } from "@/stores";

export default {
  name: "DeleteTasklistError",
  props: {
    componentData: {
      type: Object,
      required: true,
    },
  },
  setup() {
    const PopupStore = usePopupStore();
    const ProjectsStore = useProjectsStore();
    return {
      PopupStore,
      ProjectsStore,
    };
  },
  computed: {
    errorMessage() {
      return this.componentData.message;
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
    closePopup() {
      this.PopupStore.closePopup();
    },
  },
};
</script>
