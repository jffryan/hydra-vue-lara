import { defineStore } from "pinia";
import { getAllTasks, getOneTask, deleteTask } from "@/api/TaskController";

const useTasksStore = defineStore("TasksStore", {
  state: () => ({
    allTasks: [],
    allCurrentTasks: [],
    currentTask: null,
  }),
  actions: {
    // Set internal
    setAllTasks(tasks) {
      this.allTasks = tasks;
    },
    setAllCurrentTasks(tasks) {
      this.allCurrentTasks = tasks;
    },
    setCurrentTask(task) {
      this.currentTask = task;
    },
    // Fetch external
    async fetchAllTasks() {
      const res = await getAllTasks();
      this.setAllTasks(res.data);
      return res.data;
    },
    async fetchCurrentTask(task_id) {
      let currentTask = this.allTasks.find((task) => task.task_id === task_id);
      if (!currentTask) {
        const res = await getOneTask(task_id);
        currentTask = res.data;
      }
      this.setCurrentTask(currentTask);
      return currentTask;
    },
    // Delete
    async deleteCurrentTask(task_id) {
      try {
        await deleteTask(task_id);
        return {
          success: true,
        };
      } catch (err) {
        return {
          success: false,
          message: `Error deleting task: ${err.message}`,
        };
      }
    },
    clearTaskFromState(task_id) {
      // Remove from allTasks
      this.allTasks = this.allTasks.filter((task) => task.task_id !== task_id);
      // and allCurrentTasks
      this.allCurrentTasks = this.allCurrentTasks.filter(
        (task) => task.task_id !== task_id
      );
      // If current task matches, clear that as well
      if (this.currentTask && this.currentTask.task_id === task_id) {
        this.currentTask = null;
      }
    },
    // Utility
    filterPriorityTasks(allTasks) {
      return allTasks.filter(
        (task) => task.status_id === 2 || task.is_priority === 1
      );
    },
  },
});

export default useTasksStore;
