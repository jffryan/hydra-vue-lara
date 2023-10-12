<template>
  <form @submit.prevent="submitTaskForm" class="mb-7 py-6 px-4 rounded-xl">
    <h2>Create Task</h2>
    <div>
      <p>Project: {{ currentProjectName }}</p>
      <p>Tasklist: {{ currentTasklistName }}</p>
    </div>
    <div class="mb-6">
      <label for="title" class="block mb-2 font-bold text-zinc-300 mr-6"
        >Name</label
      >
      <input
        class="bg-hydra-cinder-600 border-b border-zinc-400 p-2 w-full mb-2"
        type="text"
        id="name"
        name="name"
        v-model="taskForm.name"
      />
      <p v-if="!isValid.name" class="p-2 text-red-300">
        Enter a name for this task.
      </p>
    </div>
    <!-- End name -->
    <div class="mb-12">
      <label for="description" class="block mb-2 font-bold text-zinc-300 mr-6"
        >Description</label
      >
      <textarea
        name="description"
        rows="4"
        class="block p-2.5 w-full bg-hydra-cinder-600 border-b border-zinc-400 mb-2"
        v-model="taskForm.description"
      ></textarea>
    </div>
    <!-- End description -->
    <div class="flex justify-between items-center mb-6">
      <div>
        <label class="font-bold text-zinc-300 mr-6 inline-block">Status</label>
        <select
          class="appearance-none py-3 px-5 rounded-md text-center bg-hydra-cinder-500"
          v-model="taskForm.status_id"
        >
          <option value="" disabled class="text-white bg-pastel-purple-700">
            Set status
          </option>
          <option value="1">Backlog</option>
          <option value="2">In Progress</option>
          <option value="3">Complete</option>
        </select>
        <p v-if="!isValid.status" class="p-2 text-red-300">
          Select a status for this task.
        </p>
      </div>

      <div class="mb-6">
        <label class="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            v-model="taskForm.is_priority"
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
    </div>
    <!-- End status -->
    <div class="mb-6">
      <label class="font-bold text-zinc-300 mb-2 mr-6 inline-block"
        >Subtasks</label
      >
      <div>
        <div
          v-for="(subtask, idx) in taskForm.subtasks"
          :key="subtask.subtask_id"
          class="flex items-center mb-6"
        >
          <input
            class="bg-hydra-cinder-600 border-b border-zinc-400 p-2 w-full mb-2"
            type="text"
            id="title"
            name="title"
            v-model="subtask.text"
          />
          <button
            @click.prevent="deleteCurrentSubtask(subtask?.subtask_id, idx)"
          >
            <DeleteIcon class="fill-white ml-2" />
          </button>
        </div>
        <button
          class="mr-2 py-2 px-3 rounded-md bg-hydra-cinder-500 hover:bg-hydra-cinder-600"
          @click.prevent="addSubtask"
        >
          Add subtask
        </button>
      </div>
    </div>
    <!-- END SUBTASKS -->
    <div class="flex justify-end w-full">
      <button class="btn btn-tertiary">Submit</button>
    </div>
  </form>
</template>

<script>
import { every } from "lodash";

import { createTask, deleteSubtask } from "@/api/TaskController";
import { useTasklistsStore } from "@/stores";
import validators from "@/utils/validators";

import DeleteIcon from "@/components/svgs/DeleteIcon.vue";

export default {
  name: "BlankTask",
  setup() {
    const TasklistsStore = useTasklistsStore();
    return { TasklistsStore };
  },
  components: {
    DeleteIcon,
  },
  data() {
    return {
      taskForm: this.initializeForm(),
      isValid: {
        name: true,
        status: true,
      },
    };
  },
  computed: {
    currentProjectName() {
      return this.TasklistsStore.currentTasklist.project.name;
    },
    currentProjectId() {
      return this.TasklistsStore.currentTasklist.project.project_id;
    },
    currentTasklistName() {
      return this.TasklistsStore.currentTasklist.name;
    },
    currentTasklistId() {
      return this.TasklistsStore.currentTasklist.tasklist_id;
    },
    isTaskValid() {
      return every(this.isValid);
    },
  },
  methods: {
    initializeForm() {
      return {
        title: "",
        status_id: "",
        task_id: "",
        is_priority: false,
        description: "",
        subtasks: [],
        task_list_id: this.TasklistsStore.currentTasklist.tasklist_id,
      };
    },
    addSubtask() {
      const { subtasks } = this.taskForm;
      if (!subtasks.length || subtasks[subtasks.length - 1].text !== "") {
        this.taskForm.subtasks.push({ text: "" });
      }
    },
    // This deletes even if you don't save the form...
    async deleteCurrentSubtask(subtask_id, index) {
      if (!subtask_id) {
        this.taskForm.subtasks.splice(index, 1);
      } else {
        await deleteSubtask(subtask_id);
        this.taskForm.subtasks.splice(index, 1);
      }
    },
    validateTask() {
      this.isValid.name = validators.validateString(this.taskForm.name);
      this.isValid.status = validators.validateString(
        this.taskForm.status_id.toString()
      );

      // Remove any empty subtasks
      this.taskForm.subtasks = this.taskForm.subtasks.filter(
        (subtask) => subtask.text !== ""
      );
    },
    resetTaskForm() {
      this.taskForm = this.initializeForm();
    },
    async submitTaskForm() {
      // validate before anything else
      this.validateTask();

      // If task is not valid, exit
      if (!this.isTaskValid) return;

      await this.createNewTask();
    },
    async createNewTask() {
      const taskForm = {
        ...this.taskForm,
        tasklist_id: this.currentTasklistId,
      };
      // Submit via the API
      const res = await createTask(taskForm);
      this.TasklistsStore.currentTasklist.tasks.push(res.data);
      // Reset UI
      this.resetTaskForm();
    },
  },
};
</script>
