import { defineStore } from "pinia";
import { getAllTasklists, getOneTasklist } from "@/api/TasklistController";

const useTasklistsStore = defineStore("TasklistsStore", {
  state: () => ({
    allTasklists: [],
    currentTasklist: {},
  }),
  actions: {
    async fetchAllTasklists() {
      try {
        const res = await getAllTasklists();
        this.setAllTasklists(res.data);
      } catch (error) {
        console.error("Failed to fetch tasklists: ", error.message);
      }
    },
    async fetchCurrentTasklist(tasklist_id) {
      let currentTasklist = this.allTasklists.find(
        (tasklist) => tasklist.tasklist_id === tasklist_id
      );
      if (!currentTasklist) {
        const res = await getOneTasklist(tasklist_id);
        currentTasklist = res.data;
      }
      this.setCurrentTasklist(currentTasklist);
      return currentTasklist;
    },
    setAllTasklists(tasklists) {
      this.allTasklists = tasklists;
    },
    setCurrentTasklist(tasklist) {
      this.currentTasklist = tasklist;
    },
    filterPinnedTasklists(tasklists) {
      return tasklists.filter((tasklist) => tasklist.is_pinned === 1);
    },
  },
});

export default useTasklistsStore;
