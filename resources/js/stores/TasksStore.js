import { defineStore } from "pinia";
import { getOneTask, deleteTask } from "@/api/TaskController";

const useTasksStore = defineStore("TasksStore", {
  state: () => ({
    allTasks: [],
    allCurrentTasks: [],
    currentTask: null,
  }),
  actions: {
    setTasks(tasks) {
      this.tasks = tasks;
    },
    setTask(task) {
      this.task = task;
    },
    async fetchCurrentTask(task_id) {
      let currentTask = this.allCurrentTasks.find(
        (task) => task.task_id === task_id
      );
      if (!currentTask) {
        const res = await getOneTask(task_id);
        currentTask = res.data;
      }
      this.setCurrentTask(currentTask);
      return currentTask;
    },
    setCurrentTask(task) {
      this.currentTask = task;
    },
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
  },
});

export default useTasksStore;
