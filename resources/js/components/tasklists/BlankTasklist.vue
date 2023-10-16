<template>
  <form @submit.prevent="submitTasklistForm" class="mb-7 py-6 px-4 rounded-xl">
    <h2>Add tasklist</h2>
    <div>
      <p>Project: {{ currentProjectName }}</p>
    </div>
    <div class="mb-6">
      <label for="description" class="block mb-2 font-bold text-zinc-300 mr-6"
        >Name</label
      >
      <input
        class="bg-hydra-cinder-600 border-b border-zinc-400 p-2 w-full mb-2"
        type="text"
        id="name"
        name="name"
        v-model="tasklistForm.name"
      />
      <p v-if="!isValid.name" class="p-2 text-red-300">
        Enter a name for this tasklist.
      </p>
    </div>
    <!-- End name -->
    <div class="mb-6">
      <label class="relative inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          v-model="tasklistForm.is_pinned"
          :true-value="1"
          :false-value="0"
          class="sr-only peer"
        />
        <div
          class="w-11 h-6 rounded-full peer bg-hydra-cinder-500 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-hydra-green-500"
        ></div>
        <span class="ml-3 font-medium">Pinned</span>
      </label>
    </div>
    <!-- End pinned -->

    <div class="flex justify-end w-full">
      <button class="btn btn-primary">Submit</button>
    </div>
  </form>
</template>

<script>
import { every } from "lodash";

import { useProjectsStore } from "@/stores";
import { createTasklist } from "@/api/TasklistController";
import validators from "@/utils/validators";

export default {
  name: "BlankTasklist",
  setup() {
    const ProjectsStore = useProjectsStore();

    return { ProjectsStore };
  },
  data() {
    return {
      tasklistForm: this.initializeForm(),
      isValid: {
        name: true,
      },
    };
  },
  computed: {
    currentProjectName() {
      return this.ProjectsStore.currentProject.name;
    },
    currentProjectId() {
      return this.ProjectsStore.currentProject.project_id;
    },
    isTasklistValid() {
      return every(this.isValid);
    },
  },
  methods: {
    initializeForm() {
      return {
        name: "",
        is_pinned: 0,
      };
    },
    async submitTasklistForm() {
      // validate before anything else
      this.validateTasklist();
      // If tasklist is not valid, exit
      if (!this.isTasklistValid) return;
      await this.createNewTasklist();
    },
    async createNewTasklist() {
      const tasklistForm = {
        ...this.tasklistForm,
        project_id: this.currentProjectId,
      };
      try {
        const res = await createTasklist(tasklistForm);
        // Push new project from DB
        const newTaskList = {
          ...res.data,
          tasks: [],
        };
        // update UI
        // no need to server call yet!
        this.ProjectsStore.currentProject.tasklists.push(newTaskList);

        this.tasklistForm = this.initializeForm();
      } catch (error) {
        console.error(error.message);
      }
    },
    validateTasklist() {
      this.isValid.name = validators.validateString(this.tasklistForm.name);
    },
  },
};
</script>
