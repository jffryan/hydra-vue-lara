<template>
  <div>
    <div class="mb-6 flex justify-end">
      <button
        @click="toggleAddTask"
        :class="[
          'btn mr-4',
          isAddingTask ? ' bg-hydra-cinder-800 ' : 'btn-primary ',
        ]"
      >
        {{ isAddingTask ? "Cancel" : "Add Task" }}
      </button>
      <router-link
        v-if="!isAddingTask"
        :to="{
          name: 'projects.edit',
          params: { id: currentProject.project_id },
        }"
        class="btn btn-tertiary"
      >
        Edit
      </router-link>
    </div>
    <BlankTask v-if="isAddingTask" class="bg-hydra-cinder-400" />
  </div>
</template>

<script>
import BlankTask from "@/components/tasks/BlankTask.vue";

export default {
  name: "PanelAddTask",
  props: {
    currentProject: {
      type: Object,
      required: true,
    },
  },
  components: {
    BlankTask,
  },
  data() {
    return {
      isAddingTask: false,
    };
  },
  methods: {
    toggleAddTask() {
      this.isAddingTask = !this.isAddingTask;
    },
  },
};
</script>
