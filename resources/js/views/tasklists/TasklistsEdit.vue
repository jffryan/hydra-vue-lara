<template>
  <main>
    <div v-if="isLoading">
      <div class="skeleton-loader bg-hydra-cinder-400"></div>
    </div>
    <!-- End skeleton loader -->
    <div v-else-if="currentTasklist">
      <h5 class="font-bold text-lg mb-4">
        <router-link
          :to="{
            name: 'projects.tasks.index',
            params: { id: currentProject.project_id },
          }"
          >{{ currentProject.name }}</router-link
        >
      </h5>
      <div class="flex gap-x-10">
        <div class="w-2/3">
          <form @submit.prevent="submitTasklistForm" class="mb-7">
            <div class="mb-6">
              <label for="title" class="block mb-2 font-bold text-zinc-300 mr-6"
                >Name</label
              >
              <input
                class="text-4xl bg-hydra-cinder-600 border-b border-zinc-400 p-2 w-full mb-2"
                type="text"
                id="name"
                name="name"
                v-model="tasklistForm.name"
              />
              <p v-if="!isValid.name" class="p-2 text-red-300">
                Enter a name for this task.
              </p>
            </div>
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
            <div>
              <button class="btn btn-primary">Submit</button>
            </div>
          </form>
        </div>
        <div class="w-1/3">
          <div class="flex justify-end">
            <button @click="initateDeleteTasklist" class="btn btn-danger mr-4">
              Delete
            </button>
            <router-link
              :to="{
                name: 'tasklists.show',
                params: { id: currentTasklist.tasklist_id },
              }"
              class="btn btn-secondary"
              >Cancel</router-link
            >
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import { every } from "lodash";

import { usePopupStore, useProjectsStore, useTasklistsStore } from "@/stores";

import validators from "@/utils/validators";

export default {
  name: "TasklistsEdit",
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
  data() {
    return {
      tasklistForm: this.initializeForm(),
      isLoading: true,
      isValid: {
        name: true,
      },
    };
  },
  computed: {
    currentProject() {
      return this.ProjectsStore.currentProject;
    },
    currentTasklist() {
      return this.TasklistsStore.currentTasklist;
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
    submitTasklistForm() {
      if (this.isTasklistValid) {
        this.TasklistsStore.updateTasklist(this.tasklistForm);
        this.$router.push({
          name: "tasklists.show",
          params: { id: this.currentTasklist.tasklist_id },
        });
      }
    },
    validateTasklist() {
      this.isValid.name = validators.validateString(this.tasklistForm.name);
    },
    initateDeleteTasklist() {
      this.PopupStore.setActivePopup(
        "DeleteTasklistConfirmation",
        this.currentTasklist
      );
    },
  },
  async mounted() {
    const currentTasklist = await this.TasklistsStore.fetchCurrentTasklist(
      this.$route.params.id
    );

    if (!this.ProjectsStore.currentProject) {
      this.ProjectsStore.setCurrentProject(currentTasklist.project);
    }

    this.tasklistForm = currentTasklist;

    this.isLoading = false;
  },
};
</script>
