<template>
  <div>
    <div class="mb-8">
      <h5 class="font-bold text-lg mb-4">
        There was an error deleting this task:
      </h5>
      <p>{{ errorMessage }}</p>
    </div>
    <div>
      <button @click="navigateToTasklist" class="btn btn-primary mr-4">
        Return to tasklist
      </button>
      <button @click="closePopup" class="btn btn-secondary">
        Return to task
      </button>
    </div>
  </div>
</template>

<script>
import { usePopupStore, useTasklistsStore } from "@/stores";

export default {
  name: "DeleteTaskError",
  props: {
    componentData: {
      type: Object,
      required: true,
    },
  },
  setup() {
    const PopupStore = usePopupStore();
    const TasklistsStore = useTasklistsStore();
    return {
      PopupStore,
      TasklistsStore,
    };
  },
  computed: {
    errorMessage() {
      return this.componentData.message;
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
    closePopup() {
      this.PopupStore.closePopup();
    },
  },
};
</script>
