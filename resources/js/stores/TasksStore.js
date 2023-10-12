import { defineStore } from "pinia";

const useTasksStore = defineStore("tasks", {
  state: () => ({
    tasks: [],
    task: {},
    subtasks: [],
    subtask: {},
  }),
  actions: {
    setTasks(tasks) {
      this.tasks = tasks;
    },
    setTask(task) {
      this.task = task;
    },
    setSubtasks(subtasks) {
      this.subtasks = subtasks;
    },
    setSubtask(subtask) {
      this.subtask = subtask;
    },
  },
});

export default useTasksStore;
