import { defineStore } from "pinia";
import { getOneTask } from "@/api/TaskController";

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
  },
});

export default useTasksStore;
