<template>
  <form @submit.prevent="submitProjectForm" class="mb-7">
    <div class="mb-6">
      <label for="description" class="block mb-2 font-bold text-zinc-300 mr-6"
        >Name</label
      >
      <input
        class="bg-hydra-cinder-600 border-b border-zinc-400 p-2 w-full mb-2"
        type="text"
        id="name"
        name="name"
        v-model="projectForm.name"
      />
      <p v-if="!isValid.name" class="p-2 text-red-300">
        Enter a name for this project.
      </p>
    </div>
    <!-- End name -->
    <div class="mb-6">
      <label class="relative inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          v-model="projectForm.is_pinned"
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
      <button type="submit" class="btn btn-primary mr-4">Create Project</button>
      <button @click.prevent="addTasklistToProject" class="btn btn-tertiary">
        Add tasklist
      </button>
    </div>
  </form>
</template>

<script>
import { every } from "lodash";

import { useProjectsStore } from "@/stores";
import { createProject } from "@/api/ProjectController";
import validators from "@/utils/validators";

export default {
  name: "BlankProject",
  setup() {
    const ProjectsStore = useProjectsStore();

    return { ProjectsStore };
  },
  data() {
    return {
      projectForm: this.initializeForm(),
      isValid: {
        name: true,
      },
    };
  },
  computed: {
    isProjectValid() {
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
    addTasklistToProject() {
      console.log("Click from addTaskListToProject");
    },
    async submitProjectForm() {
      // validate before anything else
      this.validateProject();
      // If project is not valid, exit
      if (!this.isProjectValid) return;
      await this.createNewProject();
    },
    async createNewProject() {
      const res = await createProject(this.projectForm);
      // Push new project from DB
      const newProject = res.data;
      this.ProjectsStore.allProjects.push(newProject);

      this.projectForm = this.initializeForm();
    },
    validateProject() {
      this.isValid.name = validators.validateString(this.projectForm.name);
    },
  },
};
</script>
